// api/inbound-email.js

function cleanEmailBody(text) {
  if (!text) return '';
  const lines = text.split(/\r?\n/);
  const cleanLines = [];

  for (const line of lines) {
    const trimmed = line.trim();
    // Strip email thread quotes and signatures
    if (
      (trimmed.startsWith('On ') && trimmed.includes('wrote:')) ||
      trimmed.startsWith('>') ||
      trimmed.startsWith('---') ||
      trimmed.startsWith('--') ||
      trimmed.toLowerCase().startsWith('thanks & regards') ||
      trimmed.toLowerCase().startsWith('thanks and regards') ||
      trimmed.toLowerCase().startsWith('regards,') ||
      trimmed.startsWith('Sent from my iPhone') ||
      trimmed.startsWith('Get Outlook for')
    ) {
      break;
    }
    cleanLines.push(line);
  }
  return cleanLines.join('\n').trim();
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = req.body || {};
    console.log('Incoming Resend Webhook Body:', JSON.stringify(body));

    const emailData = body.data || body;

    // 1. Extract recipient phone number from 'to' or stringified payload
    let recipientStr = '';
    if (Array.isArray(emailData.to)) {
      recipientStr = emailData.to.map(item => (typeof item === 'string' ? item : item.email || '')).join(' ');
    } else if (typeof emailData.to === 'string') {
      recipientStr = emailData.to;
    }

    let match = recipientStr.match(/reply\+(\d+)@/);
    if (!match) {
      const fullPayloadStr = JSON.stringify(body);
      match = fullPayloadStr.match(/reply\+(\d+)@/);
    }

    if (!match) {
      console.warn('No valid phone number found in payload:', JSON.stringify(emailData));
      return res.status(200).json({ status: 'IGNORED_NO_PHONE_IN_RECIPIENT' });
    }

    const destinationPhone = match[1];

    // 2. Fetch full email body from Resend Inbound Receiving endpoint
    let rawBody = emailData.text || '';
    const emailId = emailData.email_id || emailData.id;

    if (!rawBody && emailId) {
      console.log(`Fetching inbound email body for id: ${emailId}`);
      const RESEND_API_KEY = process.env.RESEND_API_KEY;
      if (RESEND_API_KEY) {
        // Inbound emails are retrieved from /emails/receiving/{id}
        const emailRes = await fetch(`https://api.resend.com/emails/receiving/${emailId}`, {
          headers: {
            'Authorization': `Bearer ${RESEND_API_KEY}`
          }
        });

        if (emailRes.ok) {
          const emailFull = await emailRes.json();
          rawBody = emailFull.text || '';
          if (!rawBody && emailFull.html) {
            rawBody = emailFull.html.replace(/<[^>]+>/g, ' ');
          }
        } else {
          // Fallback check to /emails/{id} in case payload was mirrored
          const fallbackRes = await fetch(`https://api.resend.com/emails/${emailId}`, {
            headers: {
              'Authorization': `Bearer ${RESEND_API_KEY}`
            }
          });
          if (fallbackRes.ok) {
            const fallbackData = await fallbackRes.json();
            rawBody = fallbackData.text || '';
            if (!rawBody && fallbackData.html) {
              rawBody = fallbackData.html.replace(/<[^>]+>/g, ' ');
            }
          } else {
            console.error('Failed to fetch email from Resend API (Receiving & Default):', await emailRes.text());
          }
        }
      }
    }

    if (!rawBody && emailData.html) {
      rawBody = emailData.html.replace(/<[^>]+>/g, ' ');
    }

    const replyMessage = cleanEmailBody(rawBody);

    if (!replyMessage) {
      console.warn('Extracted email body was empty after parsing.');
      return res.status(200).json({ status: 'EMPTY_REPLY' });
    }

    console.log(`Dispatching reply to WhatsApp (+${destinationPhone}): "${replyMessage}"`);

    const META_ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;
    const PHONE_NUMBER_ID = '1228998570301220';

    const metaResponse = await fetch(
      `https://graph.facebook.com/v21.0/${PHONE_NUMBER_ID}/messages`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${META_ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          recipient_type: 'individual',
          to: destinationPhone,
          type: 'text',
          text: {
            preview_url: false,
            body: replyMessage
          }
        })
      }
    );

    const metaData = await metaResponse.json();

    if (!metaResponse.ok) {
      console.error('Meta Dispatch Error:', JSON.stringify(metaData));
      return res.status(500).json({ error: 'Meta dispatch failed', details: metaData });
    }

    console.log('Successfully sent to WhatsApp:', metaData);
    return res.status(200).json({ success: true, destinationPhone, metaData });
  } catch (error) {
    console.error('Inbound Email Webhook Error:', error.message);
    return res.status(500).json({ error: error.message });
  }
};