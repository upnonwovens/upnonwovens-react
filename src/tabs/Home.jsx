import React from 'react';

const Home = () => {
  const metrics = {
    customers: "2+",
    quality: "99.8%",
    shipments: "99.1%",
    support: "24/7 Operational"
  };

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <section style={{ textAlign: 'center', padding: '60px 0' }}>
        <h1 style={{ fontSize: '42px', color: '#1a1a1a', marginBottom: '20px' }}>Premium Non-Woven Fabric</h1>
        <p style={{ fontSize: '18px', color: '#666', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
          Creating value for our customers through high-quality non-woven products, innovative solutions, and sustainable engineering practices. We prioritize your infrastructure needs with absolute technical precision.
        </p>
      </section>

      {/* Verified Core Performance Statistics Panel */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', margin: '40px 0', textAlign: 'center' }}>
        <div style={{ padding: '30px', background: '#f9f9f9', borderRadius: '8px', border: '1px solid #eee' }}>
          <h3 style={{ fontSize: '16px', color: '#666', margin: '0 0 10px 0' }}>Customers Worldwide</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#e65c00', margin: 0 }}>{metrics.customers}</p>
        </div>
        <div style={{ padding: '30px', background: '#f9f9f9', borderRadius: '8px', border: '1px solid #eee' }}>
          <h3 style={{ fontSize: '16px', color: '#666', margin: '0 0 10px 0' }}>Quality Assurance</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#e65c00', margin: 0 }}>{metrics.quality}</p>
        </div>
        <div style={{ padding: '30px', background: '#f9f9f9', borderRadius: '8px', border: '1px solid #eee' }}>
          <h3 style={{ fontSize: '16px', color: '#666', margin: '0 0 10px 0' }}>On-Time Shipments</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#e65c00', margin: 0 }}>{metrics.shipments}</p>
        </div>
        <div style={{ padding: '30px', background: '#f9f9f9', borderRadius: '8px', border: '1px solid #eee' }}>
          <h3 style={{ fontSize: '16px', color: '#666', margin: '0 0 10px 0' }}>Customer Support</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#e65c00', margin: '8px 0 0 0' }}>{metrics.support}</p>
        </div>
      </section>
    </div>
  );
};

export default Home;