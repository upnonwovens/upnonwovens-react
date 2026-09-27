// src/tabs/AdminPortal.jsx
import React, { useState } from 'react';
import axios from 'axios';

const AdminPortal = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  // Tally Sync States
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncFeedback, setSyncFeedback] = useState({ text: '', type: '' });

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (!password.trim()) {
      setError('Please enter the admin key.');
      return;
    }
    setError('');
    setIsAuthenticated(true);
  };

  const handleSendBatch = async () => {
    setLoading(true);
    setError('');
    setResults(null);

    try {
      const response = await axios.get(`/api/send-reminder?secret=${encodeURIComponent(password)}`);
      setResults(response.data);
    } catch (err) {
      const serverErr = err.response?.data?.error;
      const displayMsg = typeof serverErr === 'object'
        ? JSON.stringify(serverErr)
        : (serverErr || 'Failed to dispatch reminders. Check your secret key.');
      setError(displayMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setSyncFeedback({ text: '', type: '' });
    }
  };

  const handleTallyUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert('Please choose an exported Tally Excel file first.');
      return;
    }

    setIsSyncing(true);
    setSyncFeedback({ text: 'Parsing FIFO invoices & syncing Google Sheet...', type: 'info' });

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await axios.post(`/api/sync-tally?secret=${encodeURIComponent(password)}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setSyncFeedback({
          text: `✓ Success: ${response.data.message || 'Synced successfully!'}`,
          type: 'success',
        });
        setSelectedFile(null);
      } else {
        setSyncFeedback({
          text: `Sync failed: ${response.data.error || 'Server error occurred.'}`,
          type: 'error',
        });
      }
    } catch (err) {
      const serverErr = err.response?.data?.error;
      const displayMsg = typeof serverErr === 'object'
        ? JSON.stringify(serverErr)
        : (serverErr || err.message);

      setSyncFeedback({
        text: `Sync error: ${displayMsg}`,
        type: 'error',
      });
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div style={{ maxWidth: '650px', margin: '40px auto', padding: '35px 25px', background: '#ffffff', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
      <h2 style={{ margin: '0 0 10px 0', color: '#0f172a', fontSize: '24px', fontWeight: '700' }}>
        KSF Payment Reminder Portal
      </h2>
      <p style={{ color: '#64748b', fontSize: '14px', margin: '0 0 25px 0' }}>
        Secure interface for triggering WhatsApp payment reminders to overdue accounts.
      </p>

      {!isAuthenticated ? (
        <form onSubmit={handlePasswordSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px', color: '#334155' }}>
              Administrator Secret Key
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter CRON_SECRET"
              autoFocus
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '15px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {error && <div style={{ color: '#dc2626', fontSize: '13px', fontWeight: '500' }}>{error}</div>}

          <button
            type="submit"
            style={{
              padding: '12px',
              backgroundColor: '#0f172a',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '700',
              cursor: 'pointer',
              fontSize: '15px'
            }}
          >
            Authenticate
          </button>
        </form>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ padding: '12px 16px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', color: '#166534', fontSize: '14px', fontWeight: '500' }}>
            ✓ Authenticated successfully.
          </div>

          {/* Section 1: Tally FIFO Ledger Sync */}
          <div style={{ padding: '20px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
            <h3 style={{ margin: '0 0 6px 0', color: '#0f172a', fontSize: '16px', fontWeight: '700' }}>
              1. Sync Tally Ledger (FIFO Distribution)
            </h3>
            <p style={{ margin: '0 0 14px 0', fontSize: '13px', color: '#64748b' }}>
              Upload your raw Tally Excel export (.xlsx). This parses FIFO settlements, refreshes <code>Pending_Invoices_FIFO</code>, and updates <code>Payment Reminders</code> while preserving previously set frequency days and last sent timestamps.
            </p>

            <form onSubmit={handleTallyUpload} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileChange}
                style={{
                  fontSize: '13px',
                  color: '#334155',
                  padding: '8px',
                  background: '#ffffff',
                  border: '1px dashed #cbd5e1',
                  borderRadius: '6px'
                }}
              />

              <button
                type="submit"
                disabled={isSyncing || !selectedFile}
                style={{
                  padding: '12px',
                  backgroundColor: isSyncing || !selectedFile ? '#94a3b8' : '#059669',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '700',
                  cursor: isSyncing || !selectedFile ? 'not-allowed' : 'pointer',
                  fontSize: '14px'
                }}
              >
                {isSyncing ? 'Processing FIFO Calculations...' : 'Upload & Sync with Google Sheets'}
              </button>

              <div style={{ textAlign: 'center', marginTop: '4px' }}>
                <a
                  href="https://docs.google.com/spreadsheets/d/15OfKs2bW6PXI7R_g5au0W0ZtYiTrIzyt9d1-KQCLif0/edit?gid=881065382#gid=881065382"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#2563eb',
                    fontSize: '13px',
                    fontWeight: '600',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                  onMouseOver={(e) => (e.target.style.textDecoration = 'underline')}
                  onMouseOut={(e) => (e.target.style.textDecoration = 'none')}
                >
                  Open KSF Payment Reminders Google Sheet ↗
                </a>
              </div>
            </form>

            {syncFeedback.text && (
              <div style={{
                marginTop: '12px',
                padding: '10px 14px',
                borderRadius: '6px',
                fontSize: '13px',
                background: syncFeedback.type === 'success' ? '#f0fdf4' : (syncFeedback.type === 'error' ? '#fef2f2' : '#eff6ff'),
                color: syncFeedback.type === 'success' ? '#166534' : (syncFeedback.type === 'error' ? '#dc2626' : '#2563eb'),
                border: `1px solid ${syncFeedback.type === 'success' ? '#bbf7d0' : (syncFeedback.type === 'error' ? '#fecaca' : '#bfdbfe')}`
              }}>
                {syncFeedback.text}
              </div>
            )}
          </div>

          {/* Section 2: Dispatch WhatsApp Batch Reminders */}
          <div style={{ padding: '20px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
            <h3 style={{ margin: '0 0 6px 0', color: '#0f172a', fontSize: '16px', fontWeight: '700' }}>
              2. Manual WhatsApp Batch Dispatch
            </h3>
            <p style={{ margin: '0 0 14px 0', fontSize: '13px', color: '#64748b' }}>
              Dispatches WhatsApp templates to all eligible overdue accounts whose frequency cooldown has expired.
            </p>

            <button
              onClick={handleSendBatch}
              disabled={loading}
              style={{
                width: '100%',
                padding: '14px',
                backgroundColor: loading ? '#94a3b8' : '#2563eb',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '700',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '15px'
              }}
            >
              {loading ? 'Dispatching WhatsApp Reminders...' : 'Send Overdue Reminders Now'}
            </button>
          </div>

          {error && (
            <div style={{ padding: '12px', background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', borderRadius: '8px', fontSize: '14px' }}>
              {error}
            </div>
          )}

          {results && (
            <div style={{ padding: '16px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#0f172a' }}>Execution Summary</h4>
              <p style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#475569' }}>
                <strong>Total Unpaid Identified:</strong> {results.totalUnpaid}
              </p>
              <div style={{ maxHeight: '250px', overflowY: 'auto' }}>
                {results.processed?.length === 0 ? (
                  <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>No eligible records found to send.</p>
                ) : (
                  results.processed?.map((item, idx) => {
                    const isSuccess = item.status === 'SENT';
                    const errorDetails = item.error 
                      ? (item.error.error?.message || item.error.message || JSON.stringify(item.error))
                      : '';

                    return (
                      <div key={idx} style={{ fontSize: '13px', color: isSuccess ? '#16a34a' : '#dc2626', marginBottom: '8px' }}>
                        • {item.customer ? `${item.customer} ` : ''}({item.phone}): <strong>{item.status}</strong>
                        {!isSuccess && errorDetails && (
                          <div style={{ fontSize: '12px', color: '#b91c1c', marginLeft: '12px', marginTop: '2px', wordBreak: 'break-word' }}>
                            Reason: {errorDetails}
                          </div>
                        )}
                        {!isSuccess && item.reason && (
                          <div style={{ fontSize: '12px', color: '#64748b', marginLeft: '12px', marginTop: '2px' }}>
                            {item.reason}
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminPortal;