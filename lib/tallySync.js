// lib/tallySync.js
const XLSX = require('xlsx');
const { google } = require('googleapis');

// Comprehensive exclusion list: internal accounts, taxes, machinery, utilities, vehicles, real estate, and staff
const EXCLUDE_KEYWORDS = [
  // Accounting internals, P&L, summary groups, capital
  "profit & loss", "profit and loss", "p&l", "suspense", "others debtors", 
  "sundry debtors", "sundry creditors", "capital a/c", "drawing a/c", 
  "round off", "depreciation", "interest", "bank", "cash", "reservs", 
  "reserve", "discrepancy", "audit", "commission", "charges",

  // Taxes, duties, penalties, cess
  "custom duty", "customs duty", "duty", "penalty", "panelty", "gst", 
  "cgst", "sgst", "igst", "input igst", "input cgst", "input sgst", 
  "output igst", "output cgst", "output sgst", "igst@", "cgst@", "sgst@", 
  "tds", "tcs", "cess", "challan", "income tax", "tax",

  // Factory machinery, equipment, tools
  "machine", "machinery", "lamination", "sealing machi", "handle sealing", 
  "making machine", "printing machine", "extruder", "chiller", "compressor", 
  "welder", "plant", "equipment", "accessories", "machine set",

  // Power, electrical, utilities, DG sets
  "transformer", "stabilzer", "stabilizer", "dg set", "generator", 
  "ups system", "inverter", "battery", "distribution panel", "panel", 
  "cable", "electricity", "solar power", "power dg",

  // Vehicles and logistics assets
  "truck", "tata truck", "car tata", "tata punch", "tractor", 
  "vehicle", "motor", "scooter", "bike",

  // Real estate, building, infrastructure
  "shed & building", "shed", "building", "civil", "construction", 
  "land", "renovation",

  // Office hardware, maintenance, expenses
  "air conditioner", "computer", "laptop", "cctv", "camera", "software", 
  "tally", "office exp", "rep. & maint", "furniture", "fixture",

  // Staff, employees, wages, drivers, plant labor
  "helper", "operator", "wages", "staff", "peon", "labour", "driver", 
  "contractor", "kh-staff", "advance salary", "salary", "telephone", 
  "tea & tiffin", "repair", "travelling", "freight"
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
  const cleanStr = str.replace(/[^\d.]/g, "");
  return parseFloat(cleanStr) || 0;
}

function parseDateValue(val) {
  if (!val && val !== 0) return "";
  
  if (val instanceof Date && !isNaN(val.getTime())) {
    return val.toISOString().split("T")[0];
  }

  if (typeof val === 'number' || (!isNaN(val) && !String(val).includes('-') && !String(val).includes('/'))) {
    const serial = parseFloat(val);
    if (serial > 1000) {
      const utcDays = Math.floor(serial - 25569);
      const dateInfo = new Date(utcDays * 86400 * 1000);
      if (!isNaN(dateInfo.getTime())) {
        return dateInfo.toISOString().split("T")[0];
      }
    }
  }

  const str = String(val).trim();
  if (!str) return "";

  if (/^\d{4}-\d{2}-\d{2}/.test(str)) {
    return str.substring(0, 10);
  }

  const parts = str.split(/[-/]/);
  if (parts.length === 3) {
    if (parts[2].length === 4) {
      return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
    }
    if (parts[0].length === 4) {
      return `${parts[0]}-${parts[1].padStart(2, '0')}-${parts[2].padStart(2, '0')}`;
    }
  }

  const parsed = new Date(str);
  if (!isNaN(parsed.getTime())) {
    return parsed.toISOString().split("T")[0];
  }

  return "";
}

function parseTallyOutstandingsBuffer(buffer, creditPeriodDays = 30) {
  const workbook = XLSX.read(buffer, { type: 'buffer', cellDates: false });
  
  // Locate the actual ledger vouchers worksheet
  let targetSheetName = workbook.SheetNames[0];
  for (const name of workbook.SheetNames) {
    if (name.toLowerCase().includes("ledger") || name.toLowerCase().includes("voucher")) {
      targetSheetName = name;
      break;
    }
  }

  let rawData = XLSX.utils.sheet_to_json(workbook.Sheets[targetSheetName], { header: 1, defval: "" });
  const hasLedgers = rawData.some(r => String(r[0] || "").toLowerCase().startsWith("ledger:"));
  if (!hasLedgers) {
    for (const name of workbook.SheetNames) {
      const candidateData = XLSX.utils.sheet_to_json(workbook.Sheets[name], { header: 1, defval: "" });
      if (candidateData.some(r => String(r[0] || "").toLowerCase().startsWith("ledger:"))) {
        rawData = candidateData;
        break;
      }
    }
  }

  const totalRows = rawData.length;
  const activeCustomers = [];
  const dormantCustomers = [];
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

      if (i + 1 < totalRows) {
        const nextRow = rawData[i + 1];
        const nextText = nextRow.map(x => String(x || "")).join(" ");
        phone = extractPhoneNumber(nextText);
      }

      let j = i + 1;
      let vchTypeCol = -1;
      let vchNoCol = -1;
      let debitCol = -1;
      let creditCol = -1;

      while (j < totalRows && j < i + 5) {
        const rVals = rawData[j].map(x => String(x || "").trim().toLowerCase());
        if (rVals.includes("vch type") || rVals.includes("debit")) {
          rVals.forEach((h, idx) => {
            if (h === "vch type") vchTypeCol = idx;
            else if (h === "vch no." || h === "vch no") vchNoCol = idx;
            else if (h === "debit") debitCol = idx;
            else if (h === "credit") creditCol = idx;
          });
          j++;
          break;
        }
        j++;
      }

      if (vchTypeCol === -1) vchTypeCol = 3;
      if (vchNoCol === -1) vchNoCol = 4;
      if (debitCol === -1) debitCol = 5;
      if (creditCol === -1) creditCol = 6;

      let hasSales = false;
      let hasPurchase = false;
      let hasPayment = false;
      let openingDebit = 0;
      let openingDate = "2026-04-01";
      const invoices = [];
      let creditsPool = 0;
      let closingBalance = 0;
      let isNetDebit = false;

      while (j < totalRows) {
        const curRow = rawData[j];
        const rC0 = String(curRow[0] || "").trim();
        if (rC0.toLowerCase().startsWith("ledger:")) break;

        const rowVals = curRow.map(x => String(x || "").trim());
        const rowStr = rowVals.join(" ").toLowerCase();

        // 1. Detect Closing Balance and Net Debit indicator
        if (rowStr.includes("closing balance")) {
          const drDetected = rowVals.slice(0, 4).some(x => x.toLowerCase() === "dr");
          const crDetected = rowVals.slice(0, 4).some(x => x.toLowerCase() === "cr");

          for (let c = rowVals.length - 1; c >= 0; c--) {
            const rawVal = rowVals[c];
            const clean = rawVal.replace(/[^\d.]/g, "");
            if (clean && !["closing", "balance", "dr", "cr"].includes(rawVal.toLowerCase())) {
              const num = parseFloat(clean);
              if (num > 0) {
                closingBalance = num;
                isNetDebit = drDetected && !crDetected;
                break;
              }
            }
          }
          j++;
          continue;
        }

        const vchType = String(curRow[vchTypeCol] || "").trim().toLowerCase();
        if (vchType === "vch type") {
          j++;
          continue;
        }

        const vchNo = String(curRow[vchNoCol] || "N/A").trim();
        const dateStr = parseDateValue(curRow[0]);
        const dVal = cleanCurrency(curRow[debitCol]);
        const cVal = cleanCurrency(curRow[creditCol]);

        // 2. Opening Balance
        if (rowStr.includes("opening balance")) {
          if (dVal > 0) {
            openingDebit = dVal;
            openingDate = dateStr || "2026-04-01";
            invoices.push({
              bill_no: "Opening Balance",
              bill_date: openingDate,
              original_amount: dVal,
              unsettled_amount: dVal,
            });
          } else if (cVal > 0) {
            creditsPool += cVal;
          }
        }
        // 3. Sales Vouchers: Strictly debits under sales
        else if (vchType === "sales" && !vchType.includes("credit note") && dVal > 0) {
          hasSales = true;
          invoices.push({
            bill_no: vchNo !== "N/A" && vchNo ? vchNo : `Inv-${invoices.length + 1}`,
            bill_date: dateStr || "2026-04-01",
            original_amount: dVal,
            unsettled_amount: dVal,
          });
        }
        // 4. Journal Vouchers: Check Debit vs Credit column
        else if (vchType === "journal") {
          if (dVal > 0) {
            invoices.push({
              bill_no: vchNo !== "N/A" && vchNo ? `Jnl-${vchNo}` : `Jnl-${invoices.length + 1}`,
              bill_date: dateStr || "2026-04-01",
              original_amount: dVal,
              unsettled_amount: dVal,
            });
          } else if (cVal > 0) {
            creditsPool += cVal;
          }
        }
        // 5. Track Purchases and Payments for non-customer categorization
        else if (vchType === "purchase") {
          hasPurchase = true;
          creditsPool += (cVal > 0 ? cVal : dVal);
        } else if (vchType === "payment") {
          hasPayment = true;
        } else if (["receipt", "expenses voucher", "credit note"].includes(vchType) || cVal > 0) {
          creditsPool += (cVal > 0 ? cVal : dVal);
        }

        j++;
      }

      // Check whether this account matches internal, asset, tax, or machinery keywords
      const partyLower = partyName.toLowerCase().trim();
      const isInternal = EXCLUDE_KEYWORDS.some(k => partyLower.includes(k));
      const isTooShort = partyLower.length <= 2; // Drops single-letter test ledgers like "A"

      // CASE A: Active Customers (Current FY Sales + Net Debit Closing Balance)
      if (hasSales && !isInternal && !isTooShort && closingBalance > 0 && isNetDebit) {
        let remPool = creditsPool;
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

        let openInvoices = invoices.filter(inv => inv.unsettled_amount > 0.01);
        const totalOpen = openInvoices.reduce((sum, inv) => sum + inv.unsettled_amount, 0);

        if (openInvoices.length === 0 || Math.abs(totalOpen - closingBalance) > 5) {
          let target = closingBalance;
          const reverseAllocated = [];

          for (let k = invoices.length - 1; k >= 0; k--) {
            if (target <= 0) break;
            const inv = invoices[k];
            const alloc = Math.min(target, inv.original_amount);
            reverseAllocated.unshift({
              ...inv,
              unsettled_amount: alloc,
            });
            target -= alloc;
          }

          if (target > 0) {
            reverseAllocated.unshift({
              bill_no: "Opening / Ledger Dues",
              bill_date: "2026-04-01",
              original_amount: target,
              unsettled_amount: target,
            });
          }
          openInvoices = reverseAllocated;
        }

        const parsedInvoices = openInvoices.map(inv => {
          let overdueDays = 0;
          let dueDateStr = "";
          const effectiveDateStr = inv.bill_date || "2026-04-01";
          
          const dt = new Date(`${effectiveDateStr}T00:00:00`);
          if (!isNaN(dt.getTime())) {
            overdueDays = Math.max(0, Math.floor((now - dt) / (1000 * 60 * 60 * 24)));
            const dueDt = new Date(dt.getTime() + creditPeriodDays * 24 * 60 * 60 * 1000);
            dueDateStr = dueDt.toISOString().split("T")[0];
          }

          return {
            bill_date: effectiveDateStr,
            bill_no: inv.bill_no,
            original_amount: inv.original_amount,
            pending_amount: Math.round(inv.unsettled_amount * 100) / 100,
            due_date: dueDateStr,
            as_of_date: asOfDateStr,
            overdue_days: overdueDays,
          };
        });

        activeCustomers.push({
          party_name: partyName,
          phone_number: phone,
          closing_balance: closingBalance,
          invoices: parsedInvoices,
        });
      }
      // CASE B: True Dormant Customer Overdue Accounts (No current sales, Debit opening, Net Debit closing)
      else if (
        !hasSales &&
        !hasPurchase &&
        !hasPayment &&
        !isInternal &&
        !isTooShort &&
        openingDebit > 0 &&
        closingBalance > 0 &&
        isNetDebit
      ) {
        const dt = new Date(`${openingDate}T00:00:00`);
        const overdueDays = !isNaN(dt.getTime())
          ? Math.max(0, Math.floor((now - dt) / (1000 * 60 * 60 * 24)))
          : 180;
        const dueDate = new Date(dt.getTime() + creditPeriodDays * 24 * 60 * 60 * 1000);

        dormantCustomers.push({
          party_name: partyName,
          phone_number: phone,
          closing_balance: closingBalance,
          invoices: [
            {
              bill_date: openingDate,
              bill_no: "Prior Year Balance",
              original_amount: openingDebit,
              pending_amount: closingBalance,
              due_date: dueDate.toISOString().split("T")[0],
              as_of_date: asOfDateStr,
              overdue_days: overdueDays,
            }
          ]
        });
      }

      i = j;
    } else {
      i++;
    }
  }

  return { activeCustomers, dormantCustomers };
}

async function getSheetsClient() {
  const privateKey = (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n');
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: privateKey,
    },
    scopes: [
      'https://www.googleapis.com/auth/spreadsheets',
      'https://www.googleapis.com/auth/drive',
    ],
  });
  return google.sheets({ version: 'v4', auth });
}

async function syncTallyDataToSheets(parsedData) {
  let activeCustomers = [];
  let dormantCustomers = [];

  if (Array.isArray(parsedData)) {
    activeCustomers = parsedData;
  } else if (parsedData && typeof parsedData === 'object') {
    activeCustomers = parsedData.activeCustomers || [];
    dormantCustomers = parsedData.dormantCustomers || [];
  }

  const sheets = await getSheetsClient();
  let rawId = process.env.GOOGLE_SPREADSHEET_ID || '';

  const urlMatch = rawId.match(/\/d\/([a-zA-Z0-9-_]+)/);
  const spreadsheetId = (urlMatch ? urlMatch[1] : rawId).trim().replace(/['"]/g, '');

  if (!spreadsheetId) {
    throw new Error("GOOGLE_SPREADSHEET_ID is missing from environment variables.");
  }

  // 1. Ensure all 4 tabs exist
  const metaRes = await sheets.spreadsheets.get({ spreadsheetId });
  const existingSheets = metaRes.data.sheets || [];
  const existingTitles = existingSheets.map(s => s.properties.title);

  const targetTabs = [
    'Payment Reminders',
    'Pending_Invoices_FIFO',
    'Dormant Payment Reminders',
    'Dormant_Overdue_Debtors'
  ];
  const addRequests = [];

  for (const tab of targetTabs) {
    if (!existingTitles.includes(tab)) {
      addRequests.push({
        addSheet: {
          properties: {
            title: tab,
            gridProperties: { rowCount: 4000, columnCount: 15 }
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

  // 2. Preserve existing configurations and manually entered phone numbers
  const existingConfigs = {};
  const loadTabConfigs = async (tabName) => {
    if (!existingTitles.includes(tabName)) return;
    try {
      const res = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: `'${tabName}'!A:G`,
      });
      const rows = res.data.values || [];
      if (rows.length > 1) {
        for (let r = 1; r < rows.length; r++) {
          const phone = String(rows[r][0] || "").replace(/\D/g, "");
          const name = String(rows[r][1] || "").trim().toLowerCase();
          const conf = {
            phone: phone,
            frequency: rows[r][5],
            lastSent: rows[r][6] || "",
            template: rows[r][4]
          };
          if (phone) existingConfigs[phone] = conf;
          if (name) existingConfigs[name] = conf;
        }
      }
    } catch (err) {
      console.warn(`Notice: No previous data for ${tabName}:`, err.message);
    }
  };

  await loadTabConfigs('Payment Reminders');
  await loadTabConfigs('Dormant Payment Reminders');

  // Helper to compile FIFO rows and Reminder rows
  const buildRows = (customerList, defaultTemplate, defaultFrequency) => {
    const fifoRows = [
      ["Inv. Date", "Invoice No.", "Amount (Rs.)", "Due Date", "Date (As on)", "Due Days", "Party / Phone", "Status"]
    ];
    const reminderRows = [
      ["CustomerPhone", "CustomerName", "TotalDue", "OverdueDays", "TemplateName", "FrequencyDays", "LastSentDate"]
    ];

    for (const cust of customerList) {
      const nameKey = cust.party_name.trim().toLowerCase();
      const prev = existingConfigs[nameKey] || {};

      let cleanPhone = String(cust.phone_number || "").replace(/\D/g, "");
      if (!cleanPhone && prev.phone) {
        cleanPhone = prev.phone;
      }
      if (cleanPhone.length === 10) {
        cleanPhone = `91${cleanPhone}`;
      }

      const totalDue = Math.round(cust.invoices.reduce((sum, inv) => sum + inv.pending_amount, 0));
      const maxDays = cust.invoices.reduce((max, inv) => Math.max(max, inv.overdue_days), 0);
      const contactLabel = cleanPhone ? `${cust.party_name} (${cleanPhone})` : cust.party_name;

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

      if (totalDue > 0) {
        const existingEntry = existingConfigs[cleanPhone] || existingConfigs[nameKey] || {};

        reminderRows.push([
          cleanPhone || "",
          cust.party_name,
          totalDue,
          maxDays,
          existingEntry.template || defaultTemplate,
          existingEntry.frequency || defaultFrequency,
          existingEntry.lastSent || ""
        ]);
      }
    }

    return { fifoRows, reminderRows };
  };

  const activeData = buildRows(activeCustomers, "ksf_statement", 3);
  const dormantData = buildRows(dormantCustomers, "ksf_statement", 7);

  // 3. Update Active Tabs
  await sheets.spreadsheets.values.clear({ spreadsheetId, range: "'Pending_Invoices_FIFO'!A:H" });
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: "'Pending_Invoices_FIFO'!A1",
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: activeData.fifoRows },
  });

  await sheets.spreadsheets.values.clear({ spreadsheetId, range: "'Payment Reminders'!A:G" });
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: "'Payment Reminders'!A1",
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: activeData.reminderRows },
  });

  // 4. Update Dormant Tabs
  await sheets.spreadsheets.values.clear({ spreadsheetId, range: "'Dormant_Overdue_Debtors'!A:H" });
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: "'Dormant_Overdue_Debtors'!A1",
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: dormantData.fifoRows },
  });

  await sheets.spreadsheets.values.clear({ spreadsheetId, range: "'Dormant Payment Reminders'!A:G" });
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: "'Dormant Payment Reminders'!A1",
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: dormantData.reminderRows },
  });

  return {
    activeCustomersCount: activeCustomers.length,
    dormantCustomersCount: dormantCustomers.length,
    activeReminders: activeData.reminderRows.length - 1,
    dormantReminders: dormantData.reminderRows.length - 1,
  };
}

module.exports = {
  parseTallyOutstandingsBuffer,
  syncTallyDataToSheets,
};