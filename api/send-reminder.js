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

function shouldSendReminder(lastSentDateStr, frequencyDaysStr) {
  const frequencyDays = parseInt(frequencyDaysStr, 10) || 1;
  if (!lastSentDateStr || lastSentDateStr.trim() === '') {
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
  const SHEET_CSV_URL = process.env.GOOGLE_SHEET_CSV_URL;
  const COMPANY_UPI_ID = '6306078257.1@hdfc';
  const STATIC_QR_IMAGE_URL = 'https://upnonwovens.in/upi_qr.jpg';
  const APPS_SCRIPT_URL = process.env.APPS_SCRIPT_WEBAPP_URL;

  if (!META_ACCESS_TOKEN || !SHEET_CSV_URL) {
    return res.status(500).json({
      success: false,
      error: 'Missing META_ACCESS_TOKEN or GOOGLE_SHEET_CSV_URL'
    });
  }

  try {
    const sheetResponse = await axios.get(SHEET_CSV_URL);
    const rawRows = sheetResponse.data.split(/\r?\n/).filter(line => line.trim() !== '');

    if (rawRows.length < 2) {
      return res.status(200).json({ success: true, message: 'Google Sheet is empty.' });
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

      const templateToUse = customer.TemplateName && customer.TemplateName.trim() !== ''
        ? customer.TemplateName.trim()
        : 'outstanding_balance_reminder';

      const isDueForMessage = shouldSendReminder(customer.LastSentDate, customer.FrequencyDays);

      if (!isDueForMessage) {
        results.push({
          phone: customer.CustomerPhone,
          customer: customerName,
          status: 'SKIPPED_COOLDOWN',
          reason: `Frequency cooldown active (${customer.FrequencyDays || 1} day gap). Last sent: ${customer.LastSentDate}`
        });
        continue;
      }

      try {
        const metaResponse = await axios.post(
          `https://graph.facebook.com/v21.0/${PHONE_NUMBER_ID}/messages`,
          {
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: customer.CustomerPhone,
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

        // Update the sheet with today's date via GET call to bypass Google 302 body-stripping
        let sheetUpdated = false;
        let sheetError = null;

        if (APPS_SCRIPT_URL) {
          try {
            const scriptRes = await axios.get(
              `${APPS_SCRIPT_URL}?phone=${encodeURIComponent(customer.CustomerPhone)}`,
              { timeout: 8000 }
            );
            sheetUpdated = scriptRes.data?.updated || false;
            if (!sheetUpdated && scriptRes.data?.error) {
              sheetError = scriptRes.data.error;
            }
          } catch (scriptErr) {
            sheetError = scriptErr.message;
            console.error('Failed to update LastSentDate in sheet:', scriptErr.message);
          }
        }

        results.push({
          phone: customer.CustomerPhone,
          customer: customerName,
          template: templateToUse,
          status: 'SENT',
          sheetUpdated: sheetUpdated,
          sheetError: sheetError,
          messageId: metaResponse.data.messages[0].id
        });
      } catch (sendError) {
        const errorData = sendError.response ? sendError.response.data : { message: sendError.message };
        results.push({
          phone: customer.CustomerPhone,
          customer: customerName,
          template: templateToUse,
          status: 'FAILED',
          error: errorData
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