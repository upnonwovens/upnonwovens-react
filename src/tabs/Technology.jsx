import React from 'react';

const Technology = () => {
  return (
    <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px', boxSizing: 'border-box' }}>
      
      {/* Title Header */}
      <section style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h1 style={{ fontSize: 'clamp(28px, 4vw, 36px)', fontWeight: '800', color: '#0f172a', margin: '0 0 12px 0' }}>Our Technology & Sustainability</h1>
        <p style={{ color: '#475569', fontSize: '16px', margin: 0, maxWidth: '750px', display: 'inline-block', lineHeight: '1.6' }}>
          Harnessing solar thermal power and advanced polymer extrusion to manufacture eco-friendly, high-performance non-woven textiles.
        </p>
      </section>

      {/* SINGLE UNIFIED MASTER CARD: Housing Technology & Eco-Sustainability */}
      <section style={{ marginBottom: '60px' }}>
        <div style={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.95)', 
          padding: '40px', 
          borderRadius: '20px', 
          boxShadow: '0 15px 35px rgba(0,0,0,0.06)', 
          border: '1px solid rgba(226, 232, 240, 0.8)', 
          backdropFilter: 'blur(12px)',
          display: 'flex',
          flexDirection: 'column',
          gap: '50px'
        }}>
          
          {/* Section 1: Non-Woven Fabric Technology */}
          <div>
            <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', marginBottom: '15px' }}>Non-Woven Fabric Technology</h3>
            <p style={{ color: '#475569', fontSize: '16px', lineHeight: '1.7', marginBottom: '15px' }}>
              Non-woven fabric is made from polypropylene (P.P.) which is a by-product of crude oil. P.P. is first melted and converted into long fibers of polypropylene (P.P.) which are then bonded together by chemical, mechanical, heat or solvent treatment.
            </p>
            <p style={{ color: '#475569', fontSize: '16px', lineHeight: '1.7', marginBottom: '30px' }}>
              Our non-woven fabric is made by spun bonding (heat treatment) polypropylene which can be recycled, naturally decompose and completely incinerates without any production of poisonous pollutant.
            </p>

            <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Characteristics & Properties</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              <div style={{ backgroundColor: 'rgba(248, 249, 250, 0.9)', padding: '25px', borderRadius: '12px', borderLeft: '4px solid #2563eb', border: '1px solid #e2e8f0', borderLeftWidth: '4px' }}>
                <p style={{ color: '#334155', fontSize: '14px', lineHeight: '1.6', margin: '0 0 12px 0', fontWeight: '600' }}>
                  Non-woven fabrics provide specific functions such as absorbency, liquid repellency, resilience, stretch, softness, strength, flame retardancy, washability, cushioning, filtering, bacterial barrier and sterility.
                </p>
                <p style={{ color: '#64748b', fontSize: '13px', lineHeight: '1.6', margin: 0, fontStyle: 'italic', borderTop: '1px dashed #cbd5e1', paddingTop: '12px' }}>
                  (ये कपड़े विशिष्ट कार्य प्रदान करते हैं जैसे कि अवशोषकता, तरल पुनर्विक्रय, लचीलापन, खिंचाव, कोमलता, शक्ति, लौ मंदता, धोने की क्षमता, कुशनिंग, फ़िल्टरिंग, जीवाणु अवरोध और सड़न रोकनेवाला ।)
                </p>
              </div>

              <div style={{ backgroundColor: 'rgba(248, 249, 250, 0.9)', padding: '25px', borderRadius: '12px', borderLeft: '4px solid #2563eb', border: '1px solid #e2e8f0', borderLeftWidth: '4px' }}>
                <p style={{ color: '#334155', fontSize: '14px', lineHeight: '1.6', margin: '0 0 12px 0', fontWeight: '600' }}>
                  These properties are often combined to create fabrics suited for specific jobs, while achieving a good balance between product use-life and cost.
                </p>
                <p style={{ color: '#64748b', fontSize: '13px', lineHeight: '1.6', margin: 0, fontStyle: 'italic', borderTop: '1px dashed #cbd5e1', paddingTop: '12px' }}>
                  (उत्पाद के उपयोग-जीवन और लागत के बीच एक अच्छा संतुलन प्राप्त करते हुए, इन गुणों को अक्सर विशिष्ट उपयोगों के अनुकूल कपड़े बनाने के लिए जोड़ा जाता है।)
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: Eco Friendly and Sustainable */}
          <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '50px' }}>
            <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#15803d', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#16a34a' }}></span>
              Eco Friendly and Sustainable
            </h3>
            <p style={{ color: '#475569', fontSize: '16px', lineHeight: '1.7', marginBottom: '20px' }}>
              We use solar energy for the heat treatment of the polypropylene (P.P.) to make long fibers and then again use solar energy for the spun bonding process to convert the fibers into fabric. The solar technology used in this process is called concentrating solar thermal power.
            </p>
            <div style={{ backgroundColor: 'rgba(240, 253, 244, 0.9)', padding: '20px', borderRadius: '10px', border: '1px solid #bbf7d0', marginBottom: '25px' }}>
              <p style={{ color: '#166534', fontSize: '15px', lineHeight: '1.7', margin: 0, fontStyle: 'italic', fontWeight: '500' }}>
                हम लंबे फाइबर बनाने के लिए पॉलीप्रोपाइलीन (पीपी) के ताप उपचार के लिए सौर ऊर्जा का उपयोग करते हैं और फिर फाइबर को कपड़े में बदलने के लिए स्पून बॉन्डिंग प्रक्रिया के लिए फिर से सौर ऊर्जा का उपयोग करते हैं।
              </p>
            </div>
            <p style={{ color: '#475569', fontSize: '16px', lineHeight: '1.7', margin: 0 }}>
              In combination with other materials they provide a spectrum of products with diverse properties, and are used alone or as components of apparel, home furnishings, health care, engineering, industrial and consumer goods.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Technology;