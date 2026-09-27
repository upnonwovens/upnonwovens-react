// api/send-reminder.js
const { google } = require('googleapis');
const axios = require('axios');

function normalizeKey(str) {
  if (!str) return '';
  return String(str)
    .toLowerCase()
    .replace(/^customer:\s*/i, '')
    .replace(/\(\d+\)/g, '') // remove (919756237449)
    .replace(/[^a-z0-9]/g, '') // keep alphanumeric only
    .trim();
}

function formatInvoicesSummary(invoices) {
  if (!invoices || invoices.length === 0) {
    return '1. Ledger Dues • Amount Pending';
  }
  // Up to 10 invoices formatted with clean single line breaks
  return invoices.slice(0, 10).map((inv, idx) => {
    const bDate = String(inv.date || '').substring(0, 10);
    const bNo = String(inv.invoiceNo || 'N/A').trim();
    const amt = inv.amount || '0';
    const days = inv.dueDays || '0';
    return `${idx + 1}. Inv #${bNo} (${bDate}) • ₹${amt} • ${days}d overdue`;
  }).join('\n');
}

function shouldSendReminder(lastSentDateStr, frequencyDaysStr) {
  const frequencyDays = parseInt(frequencyDaysStr, 10) || 1;
  if (!lastSentDateStr || String(lastSentDateStr).trim() === '') {
    return true;
  }

  const lastSent = new Date(lastSentDateStr);
  if (isNaN(lastSent.getTime())) {
    return true;
  }

  const today = new Date();
  const diffTime = today - lastSent;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  return diffDays >= frequencyDays;
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

function parseFifoInvoices(fifoRows) {
  const customerInvoices = {};
  let currentKey = '';

  for (const row of fifoRows) {
    const col0 = String(row[0] || '').trim();

    if (col0.toLowerCase().startsWith('customer:')) {
      currentKey = normalizeKey(col0);
      if (currentKey && !customerInvoices[currentKey]) {
        customerInvoices[currentKey] = [];
      }
      continue;
    }

    if (col0.toLowerCase().startsWith('total due') || !col0) {
      continue;
    }

    // Row layout: [Inv. Date, Invoice No., Amount (Rs.), Due Date, Date (As on), Due Days, Party / Phone, Status]
    if (currentKey && row[1]) {
      customerInvoices[currentKey].push({
        date: col0,
        invoiceNo: String(row[1] || '').trim(),
        amount: String(row[2] || '0').trim(),
        dueDays: String(row[5] || '0').trim(),
      });
    }
  }

  return customerInvoices;
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  const authHeader = req.headers.authorization;
  const querySecret = req.query.secret;

  if (process.env.CRON_SECRET) {
    const isValidCron = authHeader === `Bearer ${process.env.CRON_SECRET}`;
    const isValidQuery = querySecret === process.env.CRON_SECRET;

    if (!isValidCron && !isValidQuery) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized trigger.'
      });
    }
  }

  const META_ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;
  const PHONE_NUMBER_ID = '1228998570301220';
  const COMPANY_UPI_ID = '6306078257.1@hdfc';
  const SUPPORT_LINK = 'www.upnonwovens.in';
  const STATIC_QR_IMAGE_URL = 'https://upnonwovens.in/upi_qr.jpg';

  let rawId = process.env.GOOGLE_SPREADSHEET_ID || '';
  const urlMatch = rawId.match(/\/d\/([a-zA-Z0-9-_]+)/);
  const spreadsheetId = (urlMatch ? urlMatch[1] : rawId).trim().replace(/['"]/g, '');

  if (!META_ACCESS_TOKEN || !spreadsheetId || !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL) {
    return res.status(500).json({
      success: false,
      error: 'Missing META_ACCESS_TOKEN, GOOGLE_SPREADSHEET_ID, or GOOGLE_SERVICE_ACCOUNT_EMAIL.'
    });
  }

  try {
    const sheets = await getSheetsClient();

    const [remindersRes, fifoRes] = await Promise.all([
      sheets.spreadsheets.values.get({
        spreadsheetId,
        range: "'Payment Reminders'!A:G",
      }),
      sheets.spreadsheets.values.get({
        spreadsheetId,
        range: "'Pending_Invoices_FIFO'!A:H",
      })
    ]);

    const rows = remindersRes.data.values || [];
    const fifoRows = fifoRes.data.values || [];

    if (rows.length < 2) {
      return res.status(200).json({ success: true, message: 'No customer records in Payment Reminders.' });
    }

    const fifoMap = parseFifoInvoices(fifoRows);
    const todayStr = new Date().toISOString().split('T')[0];
    const results = [];
    const updateCells = [];

    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      const rawPhone = String(row[0] || '').replace(/\D/g, '');
      const customerName = row[1] ? String(row[1]).trim() : 'Valued Customer';
      const rawDue = row[2] ? String(row[2]).trim() : '0';
      const overdueDays = row[3] ? String(row[3]).trim() : '0';
      const templateToUse = row[4] ? String(row[4]).trim() : '';
      const frequencyDays = row[5] ? String(row[5]).trim() : '1';
      const lastSentDate = row[6] ? String(row[6]).trim() : '';

      if (!rawPhone || !templateToUse) {
        continue;
      }

      const formattedPhone = rawPhone.length === 10 ? `91${rawPhone}` : rawPhone;
      const numericDue = parseFloat(rawDue.replace(/,/g, '')) || 0;
      const formattedTotalDue = numericDue.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

      const isDueForMessage = shouldSendReminder(lastSentDate, frequencyDays);
      if (!isDueForMessage) {
        results.push({
          phone: formattedPhone,
          customer: customerName,
          status: 'SKIPPED_COOLDOWN',
          reason: `Frequency cooldown active (${frequencyDays} day gap). Last sent: ${lastSentDate}`
        });
        continue;
      }

      // Exact normalized name lookup
      const lookupKey = normalizeKey(customerName);
      const openInvoices = fifoMap[lookupKey] || [];
      const invoiceSummary = formatInvoicesSummary(openInvoices);

      let templatePayload;

      if (templateToUse === 'customer_statement_dispatch' || templateToUse === 'ksf_statement_v2') {
        templatePayload = {
          name: templateToUse,
          language: { code: 'en_US' },
          components: [
            {
              type: 'body',
              parameters: [
                { type: 'text', text: customerName },
                { type: 'text', text: invoiceSummary },
                { type: 'text', text: formattedTotalDue },
                { type: 'text', text: SUPPORT_LINK },
                { type: 'text', text: COMPANY_UPI_ID }
              ]
            }
          ]
        };
      } else if (templateToUse === 'payment_due_notice') {
        const oldestDays = openInvoices.reduce((max, inv) => Math.max(max, parseInt(inv.dueDays, 10) || 0), parseInt(overdueDays, 10) || 0);
        templatePayload = {
          name: 'payment_due_notice',
          language: { code: 'en_US' },
          components: [
            {
              type: 'body',
              parameters: [
                { type: 'text', text: customerName },
                { type: 'text', text: 'KSF Non-Woven Fabric' },
                { type: 'text', text: formattedTotalDue },
                { type: 'text', text: String(oldestDays) },
                { type: 'text', text: SUPPORT_LINK },
                { type: 'text', text: COMPANY_UPI_ID }
              ]
            }
          ]
        };
      } else {
        // Fallback for legacy 4-variable template
        templatePayload = {
          name: templateToUse,
          language: { code: 'en_US' },
          components: [
            {
              type: 'header',
              parameters: [{ type: 'image', image: { link: STATIC_QR_IMAGE_URL } }]
            },
            {
              type: 'body',
              parameters: [
                { type: 'text', text: customerName },
                { type: 'text', text: formattedTotalDue },
                { type: 'text', text: String(overdueDays) },
                { type: 'text', text: COMPANY_UPI_ID }
              ]
            }
          ]
        };
      }

      try {
        const metaResponse = await axios.post(
          `https://graph.facebook.com/v21.0/${PHONE_NUMBER_ID}/messages`,
          {
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: formattedPhone,
            type: 'template',
            template: templatePayload
          },
          {
            headers: {
              Authorization: `Bearer ${META_ACCESS_TOKEN}`,
              'Content-Type': 'application/json'
            }
          }
        );

        const rowNumber = i + 1;
        updateCells.push({
          range: `'Payment Reminders'!G${rowNumber}`,
          values: [[todayStr]]
        });

        results.push({
          phone: formattedPhone,
          customer: customerName,
          template: templateToUse,
          status: 'SENT',
          sheetUpdated: true,
          messageId: metaResponse.data.messages?.[0]?.id || ''
        });
      } catch (sendError) {
        const errorData = sendError.response ? sendError.response.data : { message: sendError.message };
        console.error(`Failed to send reminder to ${formattedPhone}:`, errorData);
        results.push({
          phone: formattedPhone,
          customer: customerName,
          template: templateToUse,
          status: 'FAILED',
          error: errorData
        });
      }
    }

    if (updateCells.length > 0) {
      try {
        await sheets.spreadsheets.values.batchUpdate({
          spreadsheetId,
          requestBody: {
            valueInputOption: 'USER_ENTERED',
            data: updateCells
          }
        });
      } catch (sheetErr) {
        console.error('Failed to update LastSentDate in sheet:', sheetErr.message);
      }
    }

    return res.status(200).json({
      success: true,
      totalUnpaid: results.length,
      processed: results
    });
  } catch (error) {
    console.error('Batch Execution Error:', error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};