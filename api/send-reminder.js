// api/send-reminder.js
const { google } = require('googleapis');
const axios = require('axios');

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
  const STATIC_QR_IMAGE_URL = 'https://upnonwovens.in/upi_qr.jpg';

  let rawId = process.env.GOOGLE_SPREADSHEET_ID || '';
  const urlMatch = rawId.match(/\/d\/([a-zA-Z0-9-_]+)/);
  const spreadsheetId = (urlMatch ? urlMatch[1] : rawId).trim().replace(/['"]/g, '');

  if (!META_ACCESS_TOKEN || !spreadsheetId || !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL) {
    return res.status(500).json({
      success: false,
      error: 'Missing META_ACCESS_TOKEN, GOOGLE_SPREADSHEET_ID, or GOOGLE_SERVICE_ACCOUNT_EMAIL in environment variables.'
    });
  }

  try {
    const sheets = await getSheetsClient();

    // Read range A:G from 'Payment Reminders'
    // Row 0: CustomerPhone, CustomerName, TotalDue, OverdueDays, TemplateName, FrequencyDays, LastSentDate
    const sheetResponse = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "'Payment Reminders'!A:G",
    });

    const rows = sheetResponse.data.values || [];
    if (rows.length < 2) {
      return res.status(200).json({ success: true, message: 'No customer data found in Payment Reminders.' });
    }

    const todayStr = new Date().toISOString().split('T')[0];
    const results = [];
    const updateCells = [];

    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      const rawPhone = String(row[0] || '').replace(/\D/g, '');
      const customerName = row[1] ? String(row[1]).trim() : 'Valued Customer';
      const totalDue = row[2] ? String(row[2]).trim() : '0';
      const overdueDays = row[3] ? String(row[3]).trim() : '0';
      const templateToUse = row[4] ? String(row[4]).trim() : '';
      const frequencyDays = row[5] ? String(row[5]).trim() : '1';
      const lastSentDate = row[6] ? String(row[6]).trim() : '';

      // Skip rows without a phone number or template name
      if (!rawPhone || !templateToUse) {
        continue;
      }

      // Ensure 91 prefix for WhatsApp API
      const formattedPhone = rawPhone.length === 10 ? `91${rawPhone}` : rawPhone;

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

      try {
        const metaResponse = await axios.post(
          `https://graph.facebook.com/v21.0/${PHONE_NUMBER_ID}/messages`,
          {
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: formattedPhone,
            type: 'template',
            template: {
              name: templateToUse,
              language: { code: 'en_US' },
              components: [
                {
                  type: 'header',
                  parameters: [
                    {
                      type: 'image',
                      image: {
                        link: STATIC_QR_IMAGE_URL
                      }
                    }
                  ]
                },
                {
                  type: 'body',
                  parameters: [
                    { type: 'text', text: customerName },
                    { type: 'text', text: totalDue },
                    { type: 'text', text: overdueDays },
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

    // Direct write to update LastSentDate for all sent reminders
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
        console.error('Failed to update LastSentDate via Sheets API:', sheetErr.message);
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