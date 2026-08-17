// src/tabs/AdminPortal.jsx
import React, { useState } from 'react';
import axios from 'axios';

const AdminPortal = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

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
      setError(err.response?.data?.error || 'Failed to dispatch reminders. Check your secret key.');
    } finally {
      setLoading(false);
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

          <button
            onClick={handleSendBatch}
            disabled={loading}
            style={{
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
              <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {results.processed?.length === 0 ? (
                  <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>No unpaid records found to send.</p>
                ) : (
                  results.processed?.map((item, idx) => (
                    <div key={idx} style={{ fontSize: '13px', color: item.status === 'SENT' ? '#16a34a' : '#dc2626', marginBottom: '6px' }}>
                      • Invoice #{item.invoice} ({item.phone}): <strong>{item.status}</strong>
                    </div>
                  ))
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