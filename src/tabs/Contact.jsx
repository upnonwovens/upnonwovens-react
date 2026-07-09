import React from 'react';

const Contact = () => {
  return (
    <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#0f172a', marginBottom: '15px' }}>Logistics Intake Route</h1>
        <p style={{ color: '#475569', fontSize: '16px' }}>Coordinate physical batch pickups or route custom specification inquiries directly to our production unit desk.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '40px' }}>
        {/* Operational Routing Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ backgroundColor: '#ffffff', padding: '25px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              {/* SVG Location Icon Map Pin Marker */}
              <svg style={{ width: '24px', height: '24px', color: '#2563eb' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0, color: '#0f172a' }}>Facility Coordinates</h3>
            </div>
            <p style={{ color: '#475569', fontSize: '15px', lineHeight: '1.6', margin: 0 }}>
              Krishna Solar Farms Pvt. Ltd.<br />
              Industrial Manufacturing Sector Unit,<br />
              Regional Logistics Corridor, India
            </p>
          </div>

          <div style={{ backgroundColor: '#ffffff', padding: '25px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              {/* SVG Mail Envelope Icon */}
              <svg style={{ width: '24px', height: '24px', color: '#2563eb' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0, color: '#0f172a' }}>Communications Channels</h3>
            </div>
            <p style={{ color: '#475569', fontSize: '15px', margin: 0 }}>
              <strong>Corporate Portal Desk:</strong> upnonwovens@gmail.com
            </p>
          </div>
        </div>

        {/* Live Interactive Map Box View */}
        <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', height: '350px' }}>
          <iframe
            title="KSF Manufacturing Facility GPS Location Frame"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m4!2s0x0!2s0x0!5m2!1s7substitute_with_actual_coordinates"
            style={{ width: '100%', height: '100%', border: 0, borderRadius: '8px' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;