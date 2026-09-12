// api/inbound-email.js

function cleanEmailBody(text) {
  if (!text) return '';
  const lines = text.split(/\r?\n/);
  const cleanLines = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (
      (trimmed.startsWith('On ') && trimmed.includes('wrote:')) ||
      trimmed.startsWith('>') ||
      trimmed.startsWith('---') ||
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

    // Resend webhook events often nest information inside 'data'
    const emailData = body.data || body;

    // 1. Extract recipient field from various possible formats
    let recipientStr = '';
    if (Array.isArray(emailData.to)) {
      recipientStr = emailData.to.map(item => (typeof item === 'string' ? item : item.email || '')).join(' ');
    } else if (typeof emailData.to === 'string') {
      recipientStr = emailData.to;
    }

    // Fallback: If not found in emailData.to, search raw stringified body
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

    // 2. Extract message body across text or html
    let rawBody = emailData.text || '';
    if (!rawBody && emailData.html) {
      rawBody = emailData.html.replace(/<[^>]+>/g, ' ');
    }

    const replyMessage = cleanEmailBody(rawBody);

    if (!replyMessage) {
      console.warn('Extracted email body was empty.');
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