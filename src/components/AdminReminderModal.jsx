// src/components/AdminReminderModal.jsx
import React, { useState } from 'react';
import axios from 'axios';

const AdminReminderModal = ({ isOpen, onClose }) => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password.trim() === '') {
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

  const handleClose = () => {
    setPassword('');
    setIsAuthenticated(false);
    setResults(null);
    setError('');
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.65)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999
    }}>
      <div style={{
        background: '#ffffff',
        borderRadius: '8px',
        padding: '25px 30px',
        maxWidth: '520px',
        width: '90%',
        boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
        position: 'relative'
      }}>
        {/* Close Button */}
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '12px',
            right: '15px',
            background: 'transparent',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer',
            color: '#666'
          }}
        >
          &times;
        </button>

        <h3 style={{ marginTop: 0, marginBottom: '15px', color: '#111' }}>
          Payment Reminder Portal
        </h3>

        {!isAuthenticated ? (
          /* Password Authentication Gate */
          <form onSubmit={handlePasswordSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#555' }}>
              Enter the administrator secret key to manage overdue notices:
            </p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin Password / Secret"
              autoFocus
              style={{
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            />
            {error && <div style={{ color: '#d32f2f', fontSize: '13px' }}>{error}</div>}
            <button
              type="submit"
              style={{
                padding: '10px',
                backgroundColor: '#111',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Verify Key
            </button>
          </form>
        ) : (
          /* Execution & Results Screen */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <p style={{ margin: 0, fontSize: '14px', color: '#444' }}>
              Authenticated. Click below to fetch the Google Sheet and send out WhatsApp reminders.
            </p>

            <button
              onClick={handleSendBatch}
              disabled={loading}
              style={{
                padding: '12px',
                backgroundColor: loading ? '#999' : '#0070f3',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                fontWeight: 'bold',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Dispatching Messages...' : 'Send Overdue Reminders Now'}
            </button>

            {error && (
              <div style={{ padding: '10px', backgroundColor: '#ffebee', color: '#c62828', borderRadius: '4px', fontSize: '13px' }}>
                {error}
              </div>
            )}

            {results && (
              <div style={{ padding: '12px', background: '#f8f9fa', border: '1px solid #e9ecef', borderRadius: '4px', fontSize: '13px' }}>
                <p style={{ margin: '0 0 8px 0', fontWeight: 'bold' }}>
                  Total Overdue Processed: {results.totalUnpaid}
                </p>
                <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
                  {results.processed?.length === 0 ? (
                    <p style={{ margin: 0, color: '#666' }}>No unpaid records found to send.</p>
                  ) : (
                    results.processed?.map((item, idx) => (
                      <div key={idx} style={{ color: item.status === 'SENT' ? '#2e7d32' : '#c62828', marginBottom: '4px' }}>
                        • {item.invoice} ({item.phone}): <strong>{item.status}</strong>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminReminderModal;