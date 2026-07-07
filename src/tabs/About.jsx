import React from 'react';

const About = () => {
  return (
    <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <section style={{ marginBottom: '5px', lineHeight: '1.6' }}>
        <h2>Corporate Trajectory & Core Mission</h2>
        <p>
          Established in October 2019, our infrastructure operations have pioneered advancements within the sustainable technical textiles ecosystem. Processing foundational materials using clean engineering pipelines guarantees structural material excellence.
        </p>
      </section>

      <h3 style={{ marginTop: '40px', marginBottom: '20px' }}>Executive Leadership & Strategy</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
        <div style={{ padding: '20px', border: '1px solid #eee', borderRadius: '6px' }}>
          <h4 style={{ margin: '0 0 5px 0' }}>Mr. Naman Gupta</h4>
          <p style={{ color: '#e65c00', fontSize: '14px', margin: '0 0 10px 0' }}>Director</p>
          <p style={{ fontSize: '13px', color: '#666', margin: 0 }}>Mechanical Engineering Graduate, San Diego State University, California, USA.</p>
        </div>
        <div style={{ padding: '20px', border: '1px solid #eee', borderRadius: '6px' }}>
          <h4 style={{ margin: '0 0 5px 0' }}>Ms. Shubhi Gupta</h4>
          <p style={{ color: '#e65c00', fontSize: '14px', margin: '0 0 10px 0' }}>Head of R&D</p>
          <p style={{ fontSize: '13px', color: '#666', margin: 0 }}>MBA in Marketing, KJ Somaiya Institute of Management, Mumbai.</p>
        </div>
        <div style={{ padding: '20px', border: '1px solid #eee', borderRadius: '6px' }}>
          <h4 style={{ margin: '0 0 5px 0' }}>Priya Arya</h4>
          <p style={{ color: '#e65c00', fontSize: '14px', margin: '0 0 10px 0' }}>Chief Financial Officer</p>
          <p style={{ fontSize: '13px', color: '#666', margin: 0 }}>MBA, GLA University, Mathura.</p>
        </div>
      </div>
    </div>
  );
};

export default About;