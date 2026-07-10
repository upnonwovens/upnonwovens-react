import React from 'react';

const About = () => {
  return (
    <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
      
      {/* About Section */}
      <section style={{ marginBottom: '60px', paddingBottom: '50px' }}>
        <div style={{ textAlign: 'center', marginBottom: '35px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: '800', color: '#0f172a', margin: 0 }}>About Us</h1>
        </div>

        <div style={{ backgroundColor: 'rgba(255,255,255,0.95)', padding: '35px', borderRadius: '16px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)', border: '1px solid rgba(226, 232, 240, 0.8)', display: 'flex', flexDirection: 'column', gap: '25px', backdropFilter: 'blur(10px)' }}>
          <div>
            <h3 style={{ color: '#2563eb', fontSize: '16px', fontWeight: '600', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Corporate Profile</h3>
            <p style={{ color: '#334155', fontSize: '16px', lineHeight: '1.7', fontWeight: '500', margin: 0 }}>
              We are a sustainable Non-Woven fabric manufacturing company. Established in January 2022, with the state-of-the-art technology, we can produce a wide variety of quality non-woven fabric with the belief in quality service and sustainable growth.
            </p>
          </div>
          <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '20px' }}>
            <h3 style={{ color: '#2563eb', fontSize: '16px', fontWeight: '600', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>कॉरपोरेट प्रोफाइल</h3>
            <p style={{ color: '#334155', fontSize: '16px', lineHeight: '1.7', fontWeight: '500', margin: 0 }}>
              हम एक स्थायी Non-Woven कपड़ा निर्माण कंपनी हैं। जनवरी 2022 में स्थापित, अत्याधुनिक तकनीक के साथ, हम गुणवत्ता सेवा और सतत विकास में विश्वास के साथ गुणवत्ता वाले Non-Woven हुए कपड़े की एक विस्तृत विविधता का उत्पादन कर सकते हैं।
            </p>
          </div>
        </div>
      </section>

      {/* Technical Module - Responsive minmax(280px) */}
      <section style={{ marginBottom: '60px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          
          <div style={{ backgroundColor: 'rgba(255,255,255,0.95)', padding: '30px', borderRadius: '12px', border: '1px solid rgba(226, 232, 240, 0.8)', backdropFilter: 'blur(10px)', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#0f172a', marginBottom: '15px' }}>Non-Woven Fabric Technology</h3>
            <p style={{ color: '#475569', fontSize: '15px', lineHeight: '1.7', marginBottom: '15px' }}>
              Non-woven fabric is made from polypropylene (P.P.) which is a by-product of crude oil. P.P. is first melted and converted into long fibers of polypropylene (P.P.) which are then bonded together by chemical, mechanical, heat or solvent treatment.
            </p>
            <p style={{ color: '#475569', fontSize: '15px', lineHeight: '1.7', marginBottom: '25px' }}>
              Our non-woven fabric is made by spun bonding (heat treatment) polypropylene which can be recycled, naturally decompose and completely incinerates without any production of poisonous pollutant.
            </p>

            <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', marginBottom: '12px' }}>Characteristics & Properties</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ backgroundColor: 'rgba(248, 249, 250, 0.9)', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #2563eb' }}>
                <p style={{ color: '#334155', fontSize: '14px', lineHeight: '1.6', margin: '0 0 10px 0', fontWeight: '500' }}>
                  Non-woven fabrics provide specific functions such as absorbency, liquid repellency, resilience, stretch, softness, strength, flame retardancy, washability, cushioning, filtering, bacterial barrier and sterility.
                </p>
                <p style={{ color: '#64748b', fontSize: '13px', lineHeight: '1.6', margin: 0, fontStyle: 'italic', borderTop: '1px dashed #e2e8f0', paddingTop: '10px' }}>
                  (ये कपड़े विशिष्ट कार्य प्रदान करते हैं जैसे कि अवशोषकता, तरल पुनर्विक्रय, लचीलापन, खिंचाव, कोमलता, शक्ति, लौ मंदता, धोने की क्षमता, कुशनिंग, फ़िल्टरिंग, जीवाणु अवरोध और सड़न रोकनेवाला ।)
                </p>
              </div>

              <div style={{ backgroundColor: 'rgba(248, 249, 250, 0.9)', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #2563eb' }}>
                <p style={{ color: '#334155', fontSize: '14px', lineHeight: '1.6', margin: '0 0 10px 0', fontWeight: '500' }}>
                  These properties are often combined to create fabrics suited for specific jobs, while achieving a good balance between product use-life and cost.
                </p>
                <p style={{ color: '#64748b', fontSize: '13px', lineHeight: '1.6', margin: 0, fontStyle: 'italic', borderTop: '1px dashed #e2e8f0', paddingTop: '10px' }}>
                  (उत्पाद के उपयोग-जीवन और लागत के बीच एक अच्छा संतुलन प्राप्त करते हुए, इन गुणों को अक्सर विशिष्ट उपयोगों के अनुकूल कपड़े बनाने के लिए जोड़ा जाता है।)
                </p>
              </div>
            </div>
          </div>

          <div style={{ backgroundColor: 'rgba(255,255,255,0.95)', padding: '30px', borderRadius: '12px', border: '1px solid rgba(226, 232, 240, 0.8)', backdropFilter: 'blur(10px)', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#15803d', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#16a34a' }}></span>
              Eco Friendly and Sustainable
            </h3>
            <p style={{ color: '#475569', fontSize: '15px', lineHeight: '1.7', marginBottom: '15px' }}>
              We use solar energy for the heat treatment of the polypropylene (P.P.) to make long fibers and then again use solar energy for the spun bonding process to convert the fibers into fabric. The solar technology used in this process is called concentrating solar thermal power.
            </p>
            <div style={{ backgroundColor: 'rgba(240, 253, 244, 0.9)', padding: '20px', borderRadius: '8px', border: '1px solid #bbf7d0', marginBottom: '25px' }}>
              <p style={{ color: '#166534', fontSize: '14px', lineHeight: '1.7', margin: 0, fontStyle: 'italic' }}>
                हम लंबे फाइबर बनाने के लिए पॉलीप्रोपाइलीन (पीपी) के ताप उपचार के लिए सौर ऊर्जा का उपयोग करते हैं और फिर फाइबर को कपड़े में बदलने के लिए स्पून बॉन्डिंग प्रक्रिया के लिए फिर से सौर ऊर्जा का उपयोग करते हैं।
              </p>
            </div>
            <p style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>
              In combination with other materials they provide a spectrum of products with diverse properties, and are used alone or as components of apparel, home furnishings, health care, engineering, industrial and consumer goods.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
};

export default About;