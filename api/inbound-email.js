// api/inbound-email.js

function cleanEmailBody(text) {
  if (!text) return '';
  // Strip off standard email reply quotes (Gmail, Apple Mail, Outlook)
  const lines = text.split(/\r?\n/);
  const cleanLines = [];

  for (const line of lines) {
    if (
      line.trim().startsWith('On ') && line.includes('wrote:') ||
      line.trim().startsWith('>') ||
      line.trim().startsWith('---') ||
      line.trim().startsWith('Sent from my iPhone')
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
    const payload = req.body;

    // Resend sends email metadata and content in the webhook payload
    const recipientEmail = payload.to ? (Array.isArray(payload.to) ? payload.to[0] : payload.to) : '';
    const rawText = payload.text || payload.html || '';

    // Extract destination phone number from reply+<PHONE>@upnonwovens.in
    const match = recipientEmail.match(/reply\+(\d+)@/);
    if (!match) {
      console.log('No valid phone number found in recipient:', recipientEmail);
      return res.status(200).send('IGNORED_NOT_A_REPLY');
    }

    const destinationPhone = match[1];
    const replyMessage = cleanEmailBody(rawText);

    if (!replyMessage) {
      return res.status(200).send('EMPTY_REPLY');
    }

    const META_ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;
    const PHONE_NUMBER_ID = '1228998570301220';

    // Dispatch standard text message via WhatsApp Cloud API within the 24-hour service window
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
      console.error('Meta Send Error:', JSON.stringify(metaData));
      return res.status(500).json({ error: 'Meta dispatch failed', details: metaData });
    }

    return res.status(200).json({ success: true, to: destinationPhone, metaData });
  } catch (error) {
    console.error('Inbound Email Webhook Error:', error.message);
    return res.status(500).json({ error: error.message });
  }
};