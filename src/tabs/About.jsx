import React from 'react';

const About = () => {
  return (
    <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px', boxSizing: 'border-box' }}>
      
      {/* Title Header with Subtitle */}
      <section style={{ marginBottom: '50px', textAlign: 'center' }}>
        <h1 style={{ fontSize: 'clamp(32px, 4.5vw, 42px)', fontWeight: '800', color: '#0f172a', margin: '0 0 12px 0', letterSpacing: '-0.5px' }}>
          About Us
        </h1>
        <p style={{ color: '#64748b', fontSize: '17px', margin: '0 auto', maxWidth: '600px', lineHeight: '1.6', fontWeight: '500' }}>
          Pioneering sustainable non-woven textile manufacturing through advanced engineering and eco-friendly solar integration.
        </p>
      </section>

      {/* SINGLE UNIFIED MASTER CARD */}
      <section style={{ marginBottom: '60px' }}>
        <div style={{ 
          backgroundColor: 'rgba(255,255,255,0.96)', 
          padding: 'clamp(30px, 5vw, 60px)', 
          borderRadius: '24px', 
          boxShadow: '0 20px 40px -15px rgba(0,0,0,0.07)', 
          border: '1px solid rgba(226, 232, 240, 0.9)', 
          backdropFilter: 'blur(16px)',
          display: 'flex',
          flexDirection: 'column',
          gap: '60px'
        }}>
          
          {/* Section 1: Corporate Profile (Organized Two-Column Split Grid) */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '25px' }}>
              <div style={{ width: '8px', height: '24px', backgroundColor: '#2563eb', borderRadius: '4px' }}></div>
              <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#0f172a', margin: 0, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                Corporate Profile
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
              {/* English Profile Box */}
              <div style={{ backgroundColor: '#f8fafc', padding: '30px', borderRadius: '16px', border: '1px solid #e2e8f0', borderTop: '4px solid #2563eb' }}>
                <span style={{ display: 'inline-block', fontSize: '12px', fontWeight: '700', color: '#2563eb', backgroundColor: '#dbeafe', padding: '4px 12px', borderRadius: '20px', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  English
                </span>
                <p style={{ color: '#334155', fontSize: '15.5px', lineHeight: '1.8', fontWeight: '500', margin: 0 }}>
                  We are a sustainable Non-Woven fabric manufacturing company. Established in January 2022, with the state-of-the-art technology, we can produce a wide variety of quality non-woven fabric with the belief in quality service and sustainable growth.
                </p>
              </div>

              {/* Hindi Profile Box */}
              <div style={{ backgroundColor: '#f8fafc', padding: '30px', borderRadius: '16px', border: '1px solid #e2e8f0', borderTop: '4px solid #0f172a' }}>
                <span style={{ display: 'inline-block', fontSize: '12px', fontWeight: '700', color: '#0f172a', backgroundColor: '#e2e8f0', padding: '4px 12px', borderRadius: '20px', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  हिंदी (Hindi)
                </span>
                <p style={{ color: '#334155', fontSize: '16px', lineHeight: '1.8', fontWeight: '500', margin: 0 }}>
                  हम एक स्थायी Non-Woven कपड़ा निर्माण कंपनी हैं। जनवरी 2022 में स्थापित, अत्याधुनिक तकनीक के साथ, हम गुणवत्ता सेवा और सतत विकास में विश्वास के साथ गुणवत्ता वाले Non-Woven हुए कपड़े की एक विस्तृत विविधता का उत्पादन कर सकते हैं।
                </p>
              </div>
            </div>
          </div>

          {/* Styled Section Divider */}
          <div style={{ height: '1px', backgroundColor: '#e2e8f0', width: '100%', position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <span style={{ backgroundColor: '#ffffff', padding: '0 20px', color: '#94a3b8', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', position: 'absolute', top: '-8px' }}>
              Infrastructure
            </span>
          </div>

          {/* Section 2: Advanced Production Line */}
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '50px', alignItems: 'center' }}>
              <div>
                <span style={{ color: '#2563eb', fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>
                  3.2-Meter Spunbond Line
                </span>
                <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 30px)', fontWeight: '800', color: '#0f172a', marginBottom: '20px', lineHeight: '1.3' }}>
                  Advanced Plant Production Line
                </h2>
                <p style={{ color: '#475569', fontSize: '16px', lineHeight: '1.7', marginBottom: '16px' }}>
                  Our manufacturing unit features high-precision industrial automation executing specialized thermal bonding and extrusion sequences to generate flawless fabric weights and dimensional consistency.
                </p>
                <p style={{ color: '#475569', fontSize: '16px', lineHeight: '1.7', margin: 0 }}>
                  With fully integrated Delta PLC systems and responsive dynamic VFD drive synchronizations, we ensure strict quality compliance metrics across every operational manufacturing batch run.
                </p>
              </div>
              
              <div>
                <div style={{ 
                  backgroundColor: '#f1f5f9', 
                  borderRadius: '16px', 
                  height: '340px', 
                  width: '100%', 
                  overflow: 'hidden', 
                  border: '1px solid #cbd5e1',
                  boxShadow: '0 10px 25px -5px rgba(0,0,0,0.08)',
                  position: 'relative'
                }}>
                  <img 
                    src="/plant-production.jpg" 
                    alt="3.2-meter Spunbond Fabric Production Line Infrastructure" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Styled Section Divider */}
          <div style={{ height: '1px', backgroundColor: '#e2e8f0', width: '100%', position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <span style={{ backgroundColor: '#ffffff', padding: '0 20px', color: '#94a3b8', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', position: 'absolute', top: '-8px' }}>
              Facility Tour
            </span>
          </div>

          {/* Section 3: Operations Video */}
          <div style={{ textAlign: 'center' }}>
            <span style={{ color: '#2563eb', fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>
              Visual Inside Look
            </span>
            <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 30px)', fontWeight: '800', color: '#0f172a', marginBottom: '16px' }}>
              Take a Look At Our Operations
            </h2>
            <p style={{ color: '#475569', fontSize: '16px', marginBottom: '35px', maxWidth: '650px', margin: '0 auto 35px', lineHeight: '1.6' }}>
              Explore a visual tour of our continuous material processing facility running under strict automated quality standards.
            </p>
            
            <div style={{ 
              maxWidth: '900px', 
              margin: '0 auto', 
              position: 'relative', 
              paddingBottom: '50.625%', // 16:9 Aspect Ratio
              height: 0, 
              overflow: 'hidden', 
              borderRadius: '20px', 
              boxShadow: '0 20px 35px -10px rgba(0,0,0,0.15)', 
              backgroundColor: '#0f172a', 
              border: '1px solid #cbd5e1' 
            }}>
              <iframe
                title="KSF Spunbond Fabric Manufacturing Plant Operations"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                src="https://www.youtube.com/embed/2zAmoV0UxiI?si=tXyugcD2ptnu1Aw2"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default About;