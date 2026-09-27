// api/sync-tally.js
const { parseTallyOutstandingsBuffer, syncTallyDataToSheets } = require('../lib/tallySync');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const chunks = [];
    for await (const chunk of req) {
      chunks.push(chunk);
    }
    const rawBuffer = Buffer.concat(chunks);

    if (rawBuffer.length === 0) {
      return res.status(400).json({ error: 'No file uploaded or file is empty' });
    }

    // Extract the raw file buffer from the multipart/form-data payload
    let fileBuffer = rawBuffer;
    const boundaryHeader = req.headers['content-type'];
    if (boundaryHeader && boundaryHeader.includes('boundary=')) {
      const boundary = boundaryHeader.split('boundary=')[1].trim();
      const delimiter = Buffer.from(`--${boundary}`);
      const parts = [];
      let start = 0;

      while (start < rawBuffer.length) {
        const idx = rawBuffer.indexOf(delimiter, start);
        if (idx === -1) break;
        if (start > 0) parts.push(rawBuffer.slice(start, idx));
        start = idx + delimiter.length;
      }

      for (const part of parts) {
        const headerEnd = part.indexOf(Buffer.from('\r\n\r\n'));
        if (headerEnd !== -1) {
          const headerStr = part.slice(0, headerEnd).toString('utf-8');
          if (headerStr.includes('filename=')) {
            // Strip trailing CRLF
            let dataSlice = part.slice(headerEnd + 4);
            if (dataSlice.slice(-2).toString() === '\r\n') {
              dataSlice = dataSlice.slice(0, -2);
            }
            fileBuffer = dataSlice;
            break;
          }
        }
      }
    }

    const customerBlocks = parseTallyOutstandingsBuffer(fileBuffer);
    const syncResult = await syncTallyDataToSheets(customerBlocks);

    return res.status(200).json({
      success: true,
      message: `Parsed ${syncResult.totalCustomers} customers. Updated ${syncResult.activeReminders} accounts in Payment Reminders.`,
      ...syncResult
    });
  } catch (error) {
    console.error('Tally Sync Error:', error);
    return res.status(500).json({ error: error.message || 'Failed to process Tally file' });
  }
};