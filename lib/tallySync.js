// lib/tallySync.js
const XLSX = require('xlsx');
const { google } = require('googleapis');

// System and internal non-trade accounts to ignore
const EXCLUDE_KEYWORDS = [
  "input igst", "input cgst", "input sgst", "output igst", "output cgst",
  "output sgst", "igst@", "cgst@", "sgst@", "stock", "electricity",
  "depreciation", "tds", "bank", "cash", "reservs", "reserve",
  "round off", "solar power", "salary", "machine set", "land", "plant",
  "accessories", "credit card", "interest", "discrepancy", "charges",
  "commission", "audit", "freight"
];

function extractPhoneNumber(text) {
  if (!text) return "";
  const str = String(text).trim();
  const match = str.match(/(?:mob|mobile|ph|phone|contact|m)?[:.\-\s]*([6-9]\d{9})/i);
  if (match) return match[1];
  const allMatches = str.match(/\b[6-9]\d{9}\b/g);
  return allMatches ? allMatches[0] : "";
}

function cleanCurrency(val) {
  if (val === undefined || val === null) return 0;
  const str = String(val).trim();
  if (!str || ["nan", "none", "-", ""].includes(str.toLowerCase())) return 0;
  const isCredit = str.toLowerCase().includes("cr");
  const cleanStr = str.replace(/[^\d.]/g, "");
  const num = parseFloat(cleanStr) || 0;
  return isCredit ? -num : num;
}

function parseDateValue(val) {
  if (!val) return "";
  if (val instanceof Date) return val.toISOString().split("T")[0];
  const str = String(val).trim();
  if (/^\d{4}-\d{2}-\d{2}/.test(str)) return str.substring(0, 10);
  const parts = str.split(/[-/]/);
  if (parts.length === 3) {
    if (parts[0].length === 2 && parts[2].length === 4) {
      return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
    }
  }
  return str.substring(0, 10);
}

function parseTallyOutstandingsBuffer(buffer, creditPeriodDays = 30) {
  const workbook = XLSX.read(buffer, { type: 'buffer' });
  const sheetName = workbook.SheetNames[0];
  const rawData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1, defval: "" });

  const totalRows = rawData.length;
  const customerBlocks = [];
  const now = new Date();
  const asOfDateStr = now.toISOString().split("T")[0];

  let i = 0;
  while (i < totalRows) {
    const row = rawData[i];
    const col0 = String(row[0] || "").trim();
    const col1 = String(row[1] || "").trim();

    if (col0.toLowerCase().startsWith("ledger:")) {
      const partyName = col1;
      let phone = "";

      // Check row i+1 for contact details
      if (i + 1 < totalRows) {
        const nextRow = rawData[i + 1];
        const nextC0 = String(nextRow[0] || "").trim();
        const nextC1 = String(nextRow[1] || "").trim();
        if (!nextC0.toLowerCase().startsWith("date") && !nextC0.toLowerCase().startsWith("ledger:")) {
          phone = extractPhoneNumber(nextC1);
        }
      }

      let j = i + 1;
      let hasSales = false;
      let hasReceipt = false;
      const vchTypes = new Set();
      const invoices = [];
      let receiptsPool = 0;
      let closingBalance = 0;
      let cbType = "";

      while (j < totalRows) {
        const curRow = rawData[j];
        const rC0 = String(curRow[0] || "").trim();
        if (rC0.toLowerCase().startsWith("ledger:")) break;

        const rowVals = curRow.map(x => String(x || "").trim());
        const rowStr = rowVals.join(" ").toLowerCase();

        // Extract Closing Balance
        if (rowStr.includes("closing balance")) {
          const isDr = rowVals.some(x => x.toLowerCase() === "dr");
          const isCr = rowVals.some(x => x.toLowerCase() === "cr");
          for (const val of rowVals) {
            const clean = val.replace(/[^\d.]/g, "");
            if (clean && !["closing", "balance", "dr", "cr"].includes(val.toLowerCase())) {
              const num = parseFloat(clean);
              if (num > 0) {
                closingBalance = num;
                cbType = isDr ? "Dr" : (isCr ? "Cr" : "");
                break;
              }
            }
          }
          j++;
          continue;
        }

        const vchType = String(curRow[3] || "").trim();
        if (!vchType || vchType.toLowerCase() === "vch type") {
          j++;
          continue;
        }

        vchTypes.add(vchType.toLowerCase());
        const vchNo = String(curRow[4] || "N/A").trim();
        const dateStr = parseDateValue(curRow[0]);
        const dVal = cleanCurrency(curRow[5]);
        const cVal = cleanCurrency(curRow[6]);

        // Opening Balance
        if (rowStr.includes("opening balance")) {
          if (rowVals.some(x => x.toLowerCase() === "dr") && (dVal > 0 || cVal > 0)) {
            const opAmt = dVal > 0 ? dVal : cVal;
            invoices.push({
              bill_no: "Opening Balance",
              bill_date: dateStr || "2026-04-01",
              original_amount: opAmt,
              unsettled_amount: opAmt,
            });
          } else if (rowVals.some(x => x.toLowerCase() === "cr")) {
            receiptsPool += (cVal > 0 ? cVal : dVal);
          }
        } else if (vchType.toLowerCase() === "sales") {
          hasSales = true;
          invoices.push({
            bill_no: vchNo,
            bill_date: dateStr,
            original_amount: dVal,
            unsettled_amount: dVal,
          });
        } else if (["receipt", "credit note"].includes(vchType.toLowerCase())) {
          hasReceipt = true;
          receiptsPool += (cVal > 0 ? cVal : dVal);
        }

        j++;
      }

      // Filter internal accounts and vendor-only records
      const isInternal = EXCLUDE_KEYWORDS.some(k => partyName.toLowerCase().includes(k));
      const isVendorOnly = vchTypes.has("purchase") && !hasSales;
      const isCustomer = (hasSales || (hasReceipt && !isVendorOnly)) && !isInternal;

      if (isCustomer && closingBalance > 0 && cbType === "Dr") {
        // First-In-First-Out (FIFO) invoice settlement
        let remPool = receiptsPool;
        for (const inv of invoices) {
          if (remPool <= 0) break;
          if (remPool >= inv.unsettled_amount) {
            remPool -= inv.unsettled_amount;
            inv.unsettled_amount = 0;
          } else {
            inv.unsettled_amount -= remPool;
            remPool = 0;
          }
        }

        const openInvoices = invoices.filter(inv => inv.unsettled_amount > 0.01);
        if (openInvoices.length === 0 && closingBalance > 0) {
          openInvoices.push({
            bill_no: "Opening / Ledger Dues",
            bill_date: "2026-04-01",
            original_amount: closingBalance,
            unsettled_amount: closingBalance,
          });
        }

        const parsedInvoices = openInvoices.map(inv => {
          let overdueDays = 0;
          let dueDateStr = "";
          if (inv.bill_date) {
            const dt = new Date(inv.bill_date);
            if (!isNaN(dt.getTime())) {
              overdueDays = Math.max(0, Math.floor((now - dt) / (1000 * 60 * 60 * 24)));
              const dueDt = new Date(dt.getTime() + creditPeriodDays * 24 * 60 * 60 * 1000);
              dueDateStr = dueDt.toISOString().split("T")[0];
            }
          }
          return {
            bill_date: inv.bill_date,
            bill_no: inv.bill_no,
            original_amount: inv.original_amount,
            pending_amount: Math.round(inv.unsettled_amount * 100) / 100,
            due_date: dueDateStr,
            as_of_date: asOfDateStr,
            overdue_days: overdueDays,
          };
        });

        customerBlocks.push({
          party_name: partyName,
          phone_number: phone,
          closing_balance: closingBalance,
          invoices: parsedInvoices,
        });
      }
      i = j;
    } else {
      i++;
    }
  }

  return customerBlocks;
}

async function getSheetsClient() {
  const privateKey = (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n');
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: privateKey,
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  return google.sheets({ version: 'v4', auth });
}

async function syncTallyDataToSheets(customerBlocks) {
  const sheets = await getSheetsClient();
  let rawId = process.env.GOOGLE_SPREADSHEET_ID || '';

  // Extract ID if a full Google Sheets URL was pasted
  const urlMatch = rawId.match(/\/d\/([a-zA-Z0-9-_]+)/);
  const spreadsheetId = (urlMatch ? urlMatch[1] : rawId).trim().replace(/['"]/g, '');

  console.log(`[TallySync] Target Spreadsheet ID: "${spreadsheetId}"`);

  if (!spreadsheetId) {
    throw new Error("GOOGLE_SPREADSHEET_ID is missing from environment variables.");
  }

  // 1. Inspect existing tabs in the spreadsheet
  const metaRes = await sheets.spreadsheets.get({ spreadsheetId });
  const existingSheets = metaRes.data.sheets || [];
  const existingTitles = existingSheets.map(s => s.properties.title);

  // 2. Automatically create tabs if they do not exist
  const targetTabs = ['Payment Reminders', 'Pending_Invoices_FIFO'];
  const addRequests = [];

  for (const tab of targetTabs) {
    if (!existingTitles.includes(tab)) {
      addRequests.push({
        addSheet: {
          properties: {
            title: tab,
            gridProperties: { rowCount: 2000, columnCount: 15 }
          }
        }
      });
    }
  }

  if (addRequests.length > 0) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: { requests: addRequests }
    });
  }

  // 3. Preserve existing FrequencyDays and LastSentDate configurations
  const existingConfigs = {};
  try {
    const existingRes = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "'Payment Reminders'!A:G",
    });
    const rows = existingRes.data.values || [];
    if (rows.length > 1) {
      for (let r = 1; r < rows.length; r++) {
        const phone = String(rows[r][0] || "").replace(/\D/g, "");
        if (phone) {
          existingConfigs[phone] = {
            frequency: rows[r][5] || 3,
            lastSent: rows[r][6] || "",
            template: rows[r][4] || "outstanding_balance_reminder"
          };
        }
      }
    }
  } catch (err) {
    console.warn("Notice: No existing Payment Reminders config found:", err.message);
  }

  // 4. Formulate rows for Pending_Invoices_FIFO
  const fifoRows = [
    ["Inv. Date", "Invoice No.", "Amount (Rs.)", "Due Date", "Date (As on)", "Due Days", "Party / Phone", "Status"]
  ];

  // 5. Formulate rows for Payment Reminders
  const reminderRows = [
    ["CustomerPhone", "CustomerName", "TotalDue", "OverdueDays", "TemplateName", "FrequencyDays", "LastSentDate"]
  ];

  for (const cust of customerBlocks) {
    let cleanPhone = String(cust.phone_number || "").replace(/\D/g, "");
    if (cleanPhone.length === 10) cleanPhone = `91${cleanPhone}`;

    const totalDue = Math.round(cust.invoices.reduce((sum, inv) => sum + inv.pending_amount, 0));
    const maxDays = cust.invoices.reduce((max, inv) => Math.max(max, inv.overdue_days), 0);
    const contactLabel = cleanPhone ? `${cust.party_name} (${cleanPhone})` : cust.party_name;

    // Detailed FIFO Block
    fifoRows.push([`Customer: ${contactLabel}`, "", "", "", "", "", "", ""]);
    for (const inv of cust.invoices) {
      fifoRows.push([
        inv.bill_date,
        inv.bill_no,
        inv.pending_amount.toLocaleString('en-IN', { minimumFractionDigits: 2 }),
        inv.due_date,
        inv.as_of_date,
        inv.overdue_days,
        contactLabel,
        "Unpaid"
      ]);
    }
    fifoRows.push(["Total Due", "", totalDue.toLocaleString('en-IN', { minimumFractionDigits: 2 }), "", "", "", "", "Pending"]);
    fifoRows.push(["", "", "", "", "", "", "", ""]);

    // Active Reminder Row
    if (cleanPhone && totalDue > 0) {
      const prev = existingConfigs[cleanPhone] || {};
      reminderRows.push([
        cleanPhone,
        cust.party_name,
        totalDue,
        maxDays,
        prev.template || "outstanding_balance_reminder",
        prev.frequency || 3,
        prev.lastSent || ""
      ]);
    }
  }

  // 6. Write Pending_Invoices_FIFO
  await sheets.spreadsheets.values.clear({
    spreadsheetId,
    range: "'Pending_Invoices_FIFO'!A:H"
  });
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: "'Pending_Invoices_FIFO'!A1",
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: fifoRows },
  });

  // 7. Write Payment Reminders
  await sheets.spreadsheets.values.clear({
    spreadsheetId,
    range: "'Payment Reminders'!A:G"
  });
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: "'Payment Reminders'!A1",
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: reminderRows },
  });

  return {
    totalCustomers: customerBlocks.length,
    activeReminders: reminderRows.length - 1,
  };
}

module.exports = {
  parseTallyOutstandingsBuffer,
  syncTallyDataToSheets,
};