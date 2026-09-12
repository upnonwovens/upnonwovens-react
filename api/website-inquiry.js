// api/website-inquiry.js

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, phone, email, message } = req.body || {};

    if (!phone || !message) {
      return res.status(400).json({ error: 'Phone and message are required' });
    }

    // Standardize phone number format (default to India +91 if 10 digits)
    let cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length === 10) {
      cleanPhone = `91${cleanPhone}`;
    }

    const guestName = (name && name.trim()) ? name.trim() : 'Website Guest';
    const guestEmail = (email && email.trim()) ? email.trim() : 'Not provided';
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const dynamicReplyTo = `reply+${cleanPhone}@upnonwovens.in`;

    // 1. Dispatch Email Notification to upnonwovens@gmail.com
    if (RESEND_API_KEY) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'KSF Website Lead <alerts@upnonwovens.in>',
          to: ['upnonwovens@gmail.com'],
          reply_to: dynamicReplyTo,
          subject: `Website WhatsApp Inquiry from ${guestName} (+${cleanPhone})`,
          html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; color: #1e293b;">
              <h2 style="color: #0f172a; margin-bottom: 5px;">New Website Guest Inquiry</h2>
              <p style="font-size: 14px; color: #64748b; margin-top: 0;">upnonwovens.in Lead Capture Desk</p>
              <p style="font-size: 13px; color: #2563eb; background: #eff6ff; padding: 8px 12px; border-radius: 6px; display: inline-block;">
                💡 <strong>Tip:</strong> Hit <strong>Reply</strong> to this email to send a WhatsApp message straight to this visitor.
              </p>
              <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 15px 0;" />
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; width: 140px;">Guest Name:</td>
                  <td>${guestName}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold;">WhatsApp Number:</td>
                  <td>+${cleanPhone}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold;">Email:</td>
                  <td>${guestEmail}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold;">Submitted At:</td>
                  <td>${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} (IST)</td>
                </tr>
              </table>
              <div style="margin-top: 15px; padding: 14px; background-color: #f8fafc; border-left: 4px solid #16a34a; border-radius: 4px;">
                <strong style="display: block; margin-bottom: 5px; color: #0f172a;">Inquiry Details:</strong>
                <p style="margin: 0; font-size: 15px; white-space: pre-wrap;">${message}</p>
              </div>
            </div>
          `
        })
      });
    }

    // 2. Dispatch Confirmation WhatsApp Message to Guest
    const META_ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;
    const PHONE_NUMBER_ID = '1228998570301220';

    if (META_ACCESS_TOKEN) {
      await fetch(`https://graph.facebook.com/v21.0/${PHONE_NUMBER_ID}/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${META_ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          recipient_type: 'individual',
          to: cleanPhone,
          type: 'text',
          text: {
            preview_url: false,
            body: `Hello ${guestName}, thank you for reaching out to Krishna Solar Farms / UP Nonwovens. We have received your inquiry: "${message}". Our executive will reply to you shortly here on WhatsApp!`
          }
        })
      });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Website inquiry error:', error.message);
    return res.status(500).json({ error: error.message });
  }
};