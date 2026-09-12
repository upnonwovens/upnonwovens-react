// api/whatsapp-webhook.js
const VERIFY_TOKEN = process.env.META_WEBHOOK_VERIFY_TOKEN || 'ksf_webhook_secret_2026';

module.exports = async function handler(req, res) {
  // 1. Meta Webhook Verification Handshake (GET)
  if (req.method === 'GET') {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      res.setHeader('Content-Type', 'text/plain');
      return res.status(200).send(challenge);
    }
    return res.status(403).send('Verification token mismatch');
  }

  // 2. Inbound Events Receiver (POST)
  if (req.method === 'POST') {
    try {
      const body = req.body;
      const changeValue = body?.entry?.[0]?.changes?.[0]?.value;

      // -------------------------------------------------------------
      // A. Handle Meta Delivery Status Callbacks (sent, delivered, failed)
      // -------------------------------------------------------------
      if (changeValue?.statuses && changeValue.statuses.length > 0) {
        const statusItem = changeValue.statuses[0];
        const recipient = statusItem.recipient_id;
        const statusType = statusItem.status;

        console.log(`[WhatsApp Status] Recipient: +${recipient} | Status: ${statusType}`);

        if (statusItem.errors && statusItem.errors.length > 0) {
          console.error(
            `[WhatsApp Delivery Error for +${recipient}]:`,
            JSON.stringify(statusItem.errors, null, 2)
          );
        }

        return res.status(200).send('EVENT_RECEIVED');
      }

      // -------------------------------------------------------------
      // B. Handle Inbound Customer Replies
      // -------------------------------------------------------------
      if (changeValue?.messages && changeValue.messages.length > 0) {
        const messageObj = changeValue.messages[0];
        const contactObj = changeValue.contacts ? changeValue.contacts[0] : null;

        const senderPhone = messageObj.from || 'Unknown Number';
        const senderName = contactObj?.profile?.name || 'Customer';

        let messageContent = '';
        if (messageObj.type === 'text') {
          messageContent = messageObj.text.body;
        } else if (messageObj.type === 'button') {
          messageContent = `Button Clicked: "${messageObj.button.text}"`;
        } else if (messageObj.type === 'image') {
          messageContent = '[Customer sent an Image / Payment Slip Attachment]';
        } else {
          messageContent = `[Sent a ${messageObj.type} message]`;
        }

        console.log(`[Incoming Message] From: ${senderName} (+${senderPhone}) | Text: ${messageContent}`);

        const RESEND_API_KEY = process.env.RESEND_API_KEY;
        if (RESEND_API_KEY) {
          // Format unique reply-to address containing the customer's phone number
          const dynamicReplyTo = `reply+${senderPhone}@upnonwovens.in`;

          await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${RESEND_API_KEY}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              from: 'KSF WhatsApp Alerts <alerts@upnonwovens.in>',
              to: ['upnonwovens@gmail.com'],
              reply_to: dynamicReplyTo,
              subject: `New WhatsApp Reply from ${senderName} (+${senderPhone})`,
              html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; color: #1e293b;">
                  <h2 style="color: #0f172a; margin-bottom: 5px;">New WhatsApp Customer Message</h2>
                  <p style="font-size: 14px; color: #64748b; margin-top: 0;">Krishna Solar Farms WhatsApp Notification System</p>
                  <p style="font-size: 13px; color: #2563eb; background: #eff6ff; padding: 8px 12px; border-radius: 6px; display: inline-block;">
                    💡 <strong>Tip:</strong> You can reply directly to this email from Gmail to send a WhatsApp message to this customer.
                  </p>
                  <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 15px 0;" />
                  <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                    <tr>
                      <td style="padding: 6px 0; font-weight: bold; width: 140px;">Customer Name:</td>
                      <td>${senderName}</td>
                    </tr>
                    <tr>
                      <td style="padding: 6px 0; font-weight: bold;">Phone Number:</td>
                      <td>+${senderPhone}</td>
                    </tr>
                    <tr>
                      <td style="padding: 6px 0; font-weight: bold;">Received At:</td>
                      <td>${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} (IST)</td>
                    </tr>
                  </table>
                  <div style="margin-top: 15px; padding: 14px; background-color: #f8fafc; border-left: 4px solid #2563eb; border-radius: 4px;">
                    <strong style="display: block; margin-bottom: 5px; color: #0f172a;">Message:</strong>
                    <p style="margin: 0; font-size: 15px; white-space: pre-wrap;">${messageContent}</p>
                  </div>
                </div>
              `
            })
          });
        }
      }

      return res.status(200).send('EVENT_RECEIVED');
    } catch (err) {
      console.error('Webhook processing error:', err.message);
      return res.status(200).send('EVENT_RECEIVED');
    }
  }

  return res.status(405).send('Method Not Allowed');
};