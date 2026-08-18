// api/send-reminder.js
const axios = require('axios');

function parseCSVLine(text) {
  const result = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim().replace(/^"|"$/g, ''));
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim().replace(/^"|"$/g, ''));
  return result;
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
        error: 'Unauthorized trigger. Pass ?secret=YOUR_SECRET in browser or let Vercel Cron run.'
      });
    }
  }

  const META_ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;
  const PHONE_NUMBER_ID = '1228998570301220';
  const SHEET_CSV_URL = process.env.GOOGLE_SHEET_CSV_URL;
  const COMPANY_UPI_ID = '6306078257.1@hdfc';

  if (!META_ACCESS_TOKEN || !SHEET_CSV_URL) {
    return res.status(500).json({
      success: false,
      error: 'Missing META_ACCESS_TOKEN or GOOGLE_SHEET_CSV_URL environment variable'
    });
  }

  try {
    const sheetResponse = await axios.get(SHEET_CSV_URL);
    const rawRows = sheetResponse.data.split(/\r?\n/).filter(line => line.trim() !== '');

    if (rawRows.length < 2) {
      return res.status(200).json({ success: true, message: 'Google Sheet is empty or missing data rows.' });
    }

    const headers = parseCSVLine(rawRows[0]);

    const records = rawRows.slice(1).map(row => {
      const values = parseCSVLine(row);
      const entry = {};
      headers.forEach((header, index) => {
        entry[header] = values[index] ? values[index].trim() : '';
      });
      return entry;
    });

    const unpaidList = records.filter(
      r => r.Status && r.Status.toLowerCase() === 'unpaid' && r.CustomerPhone
    );

    const results = [];

    for (const customer of unpaidList) {
      const customerName = customer.CustomerName || 'Valued Customer';
      const totalDue = customer.TotalDue || customer.Amount || '0';
      const overdueDays = customer.OverdueDays || customer.DueDays || '0';

      try {
        const metaResponse = await axios.post(
          `https://graph.facebook.com/v21.0/${PHONE_NUMBER_ID}/messages`,
          {
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: customer.CustomerPhone,
            type: 'template',
            template: {
              name: 'outstanding_balance_reminder', // Ensure this matches the exact name in your Template Library
              language: { code: 'en_US' },
              components: [
                {
                  type: 'body',
                  parameters: [
                    { type: 'text', text: customerName },
                    { type: 'text', text: String(totalDue) },
                    { type: 'text', text: String(overdueDays) },
                    { type: 'text', text: COMPANY_UPI_ID }
                  ]
                }
              ]
            }
          },
          {
            headers: {
              Authorization: `Bearer ${META_ACCESS_TOKEN}`,
              'Content-Type': 'application/json'
            }
          }
        );

        results.push({
          phone: customer.CustomerPhone,
          customer: customerName,
          totalDue: totalDue,
          status: 'SENT',
          messageId: metaResponse.data.messages[0].id
        });
      } catch (sendError) {
        const errorDetails = sendError.response ? sendError.response.data : { message: sendError.message };
        console.error(`Meta API Error for ${customer.CustomerPhone}:`, JSON.stringify(errorDetails));
        results.push({
          phone: customer.CustomerPhone,
          customer: customerName,
          status: 'FAILED',
          error: errorDetails
        });
      }
    }

    return res.status(200).json({
      success: true,
      totalUnpaid: unpaidList.length,
      processed: results
    });
  } catch (error) {
    console.error('Batch Execution Error:', error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};