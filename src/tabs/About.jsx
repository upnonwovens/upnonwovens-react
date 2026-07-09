import React from 'react';

const About = () => {
  const managementTeam = [
    { name: "PRIYA ARYA", role: "VICE PRESIDENT", bio: "Priya Arya serves as Vice President, steering structural corporate planning and strategic business expansion frameworks.[cite: 1]", image: "/priya.jpg" },
    { name: "MR. NAMAN GUPTA", role: "DIRECTOR", bio: "Mr. Naman Gupta, Mechanical Engineering Graduate, San Diego State University, California, USA[cite: 1]", image: "/naman.jpg" },
    { name: "MS. SHUBHI GUPTA", role: "HEAD OF R&D", bio: "As the Head of Research and Development, She holds MBA in Marketing from KJ Somaiya Institute of Management, Mumbai..[cite: 1]", image: "/shubhi.jpg" },
    { name: "MR. SHAILENDRA VERMA", role: "MARKETING MANAGER", bio: "As the Marketing Manager at KSF Nonwoven, Mr. Shailendra Verma brings a wealth of expertise in developing strategic marketing.[cite: 1]", image: "/shailendra.jpg" },
    { name: "MR. PRASENJIT SARKAR", role: "GENERAL MANAGER", bio: "Mr. Prasenjit Sarkar serves as General Manager, bringing comprehensive technical textiles operational management expertise.[cite: 1]", image: "/prasenjit.jpg" },
    { name: "MR. PAWAN CHAUBEY", role: "PLANT HEAD", bio: "Mr. Pawan Chaubey serves as Plant Head, bringing extensive experience in manufacturing operations and quality control.[cite: 1]", image: "/pawan.jpg" },
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
      
      {/* About Section - Full Width Stacked Text Layout */}
      <section style={{ marginBottom: '60px', borderBottom: '1px solid #e2e8f0', paddingBottom: '50px' }}>
        <div style={{ textAlign: 'center', marginBottom: '35px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: '800', color: '#0f172a', margin: 0 }}>About Us</h1>
        </div>

        <div style={{ backgroundColor: '#ffffff', padding: '35px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.01)', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '25px' }}>
          {/* Corporate Profile English */}
          <div>
            <h3 style={{ color: '#2563eb', fontSize: '16px', fontWeight: '600', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Corporate Profile</h3>
            <p style={{ color: '#334155', fontSize: '16px', lineHeight: '1.7', fontWeight: '500', margin: 0 }}>
              We are a sustainable Non-Woven fabric manufacturing company. Established in January 2022, with the state-of-the-art technology, we can produce a wide variety of quality non-woven fabric with the belief in quality service and sustainable growth.[cite: 1]
            </p>
          </div>
          
          {/* Corporate Profile Hindi - Positioned Directly Underneath */}
          <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '20px' }}>
            <h3 style={{ color: '#2563eb', fontSize: '16px', fontWeight: '600', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>कॉरपोरेट प्रोफाइल</h3>
            <p style={{ color: '#334155', fontSize: '16px', lineHeight: '1.7', fontWeight: '500', margin: 0 }}>
              हम एक स्थायी Non-Woven कपड़ा निर्माण कंपनी हैं। जनवरी 2022 में स्थापित, अत्याधुनिक तकनीक के साथ, हम गुणवत्ता सेवा और सतत विकास में विश्वास के साथ गुणवत्ता वाले Non-Woven हुए कपड़े की एक विस्तृत विविधता का उत्पादन कर सकते हैं।[cite: 1]
            </p>
          </div>
        </div>
      </section>

      {/* Sustainable Infrastructure Technical Module - Full Width Stretched Flow */}
      <section style={{ marginBottom: '60px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          
          {/* Fabric Technology Block */}
          <div style={{ backgroundColor: '#ffffff', padding: '30px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#0f172a', marginBottom: '15px' }}>Non-Woven Fabric Technology</h3>
            <p style={{ color: '#475569', fontSize: '15px', lineHeight: '1.7', marginBottom: '15px' }}>
              Non-woven fabric is made from polypropylene (P.P.) which is a by-product of crude oil. P.P. is first melted and converted into long fibers of polypropylene (P.P.) which are then bonded together by chemical, mechanical, heat or solvent treatment. Non-woven fabric can have various properties from filtration material to packaging and has seen its demand growth in various industries over the last decade.[cite: 1]
            </p>
            <p style={{ color: '#475569', fontSize: '15px', lineHeight: '1.7', marginBottom: '25px' }}>
              Our non-woven fabric is made by spun bonding (heat treatment) polypropylene which can be recycled, naturally decompose and completely incinerates without any production of poisonous pollutant. In recent years, non-woven fabric has become an alternative to polyurethane foam. They are flat, porous sheets that are made directly from separate fibers or from molten P.P. Non-woven bags have been found as one of the best eco-friendly alternative to plastic bags.[cite: 1]
            </p>

            <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', marginBottom: '12px' }}>Characteristics & Properties</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #2563eb' }}>
                <p style={{ color: '#334155', fontSize: '14px', lineHeight: '1.6', margin: '0 0 10px 0', fontWeight: '500' }}>
                  Non-woven fabrics provide specific functions such as absorbency, liquid repellency, resilience, stretch, softness, strength, flame retardancy, washability, cushioning, filtering, bacterial barrier and sterility.[cite: 1]
                </p>
                <p style={{ color: '#64748b', fontSize: '13px', lineHeight: '1.6', margin: 0, fontStyle: 'italic', borderTop: '1px dashed #e2e8f0', paddingTop: '10px' }}>
                  (ये कपड़े विशिष्ट कार्य प्रदान करते हैं जैसे कि अवशोषकता, तरल पुनर्विक्रय, लचीलापन, खिंचाव, कोमलता, शक्ति, लौ मंदता, धोने की क्षमता, कुशनिंग, फ़िल्टरिंग, जीवाणु अवरोध और सड़न रोकनेवाला ।)[cite: 1]
                </p>
              </div>

              <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #2563eb' }}>
                <p style={{ color: '#334155', fontSize: '14px', lineHeight: '1.6', margin: '0 0 10px 0', fontWeight: '500' }}>
                  These properties are often combined to create fabrics suited for specific jobs, while achieving a good balance between product use-life and cost. They can mimic the appearance, texture and strength of a woven fabric and can be as bulky as the thickest paddings.[cite: 1]
                </p>
                <p style={{ color: '#64748b', fontSize: '13px', lineHeight: '1.6', margin: 0, fontStyle: 'italic', borderTop: '1px dashed #e2e8f0', paddingTop: '10px' }}>
                  (उत्पाद के उपयोग-जीवन और लागत के बीच एक अच्छा संतुलन प्राप्त करते हुए, इन गुणों को अक्सर विशिष्ट उपयोगों के अनुकूल कपड़े बनाने के लिए जोड़ा जाता है। वे बुने हुए कपड़े की उपस्थिति, बनावट और ताकत की नकल कर सकते हैं और सबसे मोटे पैडिंग के रूप में भारी हो सकते हैं।)[cite: 1]
                </p>
              </div>
            </div>
          </div>

          {/* Eco Friendly Block - English with Hindi Directly Underneath */}
          <div style={{ backgroundColor: '#ffffff', padding: '30px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#15803d', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#16a34a' }}></span>
              Eco Friendly and Sustainable
            </h3>
            <p style={{ color: '#475569', fontSize: '15px', lineHeight: '1.7', marginBottom: '15px' }}>
              We use solar energy for the heat treatment of the polypropylene (P.P.) to make long fibers and then again use solar energy for the spun bonding process to convert the fibers into fabric. The solar technology used in this process is called concentrating solar thermal power. This allows us to make our fabric even more sustainable and achieve carbon neutrality.[cite: 1]
            </p>
            <div style={{ backgroundColor: '#f0fdf4', padding: '20px', borderRadius: '8px', border: '1px solid #bbf7d0', marginBottom: '25px' }}>
              <p style={{ color: '#166534', fontSize: '14px', lineHeight: '1.7', margin: 0, fontStyle: 'italic' }}>
                हम लंबे फाइबर बनाने के लिए पॉलीप्रोपाइलीन (पीपी) के ताप उपचार के लिए सौर ऊर्जा का उपयोग करते हैं और फिर फाइबर को कपड़े में बदलने के लिए स्पून बॉन्डिंग प्रक्रिया के लिए फिर से सौर ऊर्जा का उपयोग करते हैं। इस प्रक्रिया में उपयोग की जाने वाली सौर तकनीक को सौर तापीय ऊर्जा को केंद्रित करना कहा जाता है। यह हमें अपने कपड़े को और भी अधिक विस्तृत बनाने और कार्बन तटस्थता प्राप्त करने की अनुमति देता है।[cite: 1]
              </p>
            </div>
            <p style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>
              In combination with other materials they provide a spectrum of products with diverse properties, and are used alone or as components of apparel, home furnishings, health care, engineering, industrial and consumer goods.[cite: 1]
            </p>
          </div>

        </div>
      </section>

      {/* Leadership Section with Integrated 6-Member Roster */}
      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '26px', fontWeight: '700', color: '#0f172a', marginBottom: '40px', textAlign: 'center', letterSpacing: '0.5px' }}>OUR MANAGEMENT TEAM</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', justifyContent: 'center' }}>
          {managementTeam.map((member, index) => (
            <div key={index} style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.02)', textAlign: 'center', padding: '30px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: '180px', height: '180px', borderRadius: '50%', overflow: 'hidden', marginBottom: '20px', backgroundColor: '#e2e8f0', border: '1px solid #cbd5e1', position: 'relative' }}>
                <img src={member.image} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.style.display = 'none'; }} />
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#0f172a', margin: '0 0 4px 0', letterSpacing: '0.5px' }}>{member.name}</h3>
              <p style={{ color: '#64748b', fontSize: '13px', fontWeight: '600', margin: '0 0 15px 0' }}>{member.role}</p>
              <p style={{ color: '#475569', fontSize: '13px', lineHeight: '1.6', margin: 0, maxWidth: '280px' }}>{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default About;