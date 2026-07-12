import React from 'react';

const About = () => {
  return (
    <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px', boxSizing: 'border-box' }}>
      
      {/* Title Header */}
      <section style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h1 style={{ fontSize: 'clamp(28px, 4vw, 36px)', fontWeight: '800', color: '#0f172a', margin: 0 }}>About Us</h1>
      </section>

      {/* SINGLE UNIFIED MASTER CARD: Housing Profile, Production Line, and Video */}
      <section style={{ marginBottom: '60px' }}>
        <div style={{ 
          backgroundColor: 'rgba(255,255,255,0.95)', 
          padding: '40px', 
          borderRadius: '20px', 
          boxShadow: '0 15px 35px rgba(0,0,0,0.06)', 
          border: '1px solid rgba(226, 232, 240, 0.8)', 
          backdropFilter: 'blur(12px)',
          display: 'flex',
          flexDirection: 'column',
          gap: '50px'
        }}>
          
          {/* Section 1: Corporate Profile */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            <div>
              <h3 style={{ color: '#2563eb', fontSize: '16px', fontWeight: '700', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Corporate Profile</h3>
              <p style={{ color: '#334155', fontSize: '16px', lineHeight: '1.7', fontWeight: '500', margin: 0 }}>
                We are a sustainable Non-Woven fabric manufacturing company. Established in January 2022, with the state-of-the-art technology, we can produce a wide variety of quality non-woven fabric with the belief in quality service and sustainable growth.
              </p>
            </div>
            <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '20px' }}>
              <h3 style={{ color: '#2563eb', fontSize: '16px', fontWeight: '700', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>कॉरपोरेट प्रोफाइल</h3>
              <p style={{ color: '#334155', fontSize: '16px', lineHeight: '1.7', fontWeight: '500', margin: 0 }}>
                हम एक स्थायी Non-Woven कपड़ा निर्माण कंपनी हैं। जनवरी 2022 में स्थापित, अत्याधुनिक तकनीक के साथ, हम गुणवत्ता सेवा और सतत विकास में विश्वास के साथ गुणवत्ता वाले Non-Woven हुए कपड़े की एक विस्तृत विविधता का उत्पादन कर सकते हैं।
              </p>
            </div>
          </div>

          {/* Section 2: Advanced Plant Production Line */}
          <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '50px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px', alignItems: 'center' }}>
              <div>
                <h2 style={{ fontSize: 'clamp(24px, 4vw, 28px)', fontWeight: '800', color: '#0f172a', marginBottom: '20px' }}>Advanced Plant Production Line</h2>
                <p style={{ color: '#475569', fontSize: '16px', lineHeight: '1.6', marginBottom: '15px' }}>
                  Our manufacturing unit features high-precision industrial automation executing specialized thermal bonding and extrusion sequences to generate flawless fabric weights and dimensional consistency.
                </p>
                <p style={{ color: '#475569', fontSize: '16px', lineHeight: '1.6', margin: 0 }}>
                  With fully integrated Delta PLC systems and responsive dynamic VFD drive synchronizations, we ensure strict quality compliance metrics across every operational manufacturing batch run.
                </p>
              </div>
              <div>
                <div style={{ backgroundColor: '#f1f5f9', borderRadius: '12px', height: '320px', width: '100%', overflow: 'hidden', border: '1px solid #cbd5e1' }}>
                  <img 
                    src="/plant-production.jpg" 
                    alt="3.2-meter Spunbond Fabric Production Line Infrastructure" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Operations Video */}
          <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '50px', textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(24px, 4vw, 28px)', fontWeight: '800', color: '#0f172a', marginBottom: '15px' }}>Take a Look At Our Operations</h2>
            <p style={{ color: '#475569', fontSize: '16px', marginBottom: '30px', maxWidth: '700px', margin: '0 auto 30px' }}>
              Explore a visual tour of our continuous material processing facility running under strict automated quality standards.
            </p>
            
            <div style={{ maxWidth: '850px', margin: '0 auto', position: 'relative', paddingBottom: '48%', height: 0, overflow: 'hidden', borderRadius: '16px', boxShadow: '0 10px 20px rgba(0,0,0,0.1)', backgroundColor: '#000000', border: '1px solid #cbd5e1' }}>
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