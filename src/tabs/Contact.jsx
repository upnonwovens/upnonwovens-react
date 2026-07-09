import React from 'react';

const Contact = () => {
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
      
      {/* Leadership Section - Positioned At the Top of Contact Us */}
      <section style={{ marginBottom: '60px', borderBottom: '1px solid #e2e8f0', paddingBottom: '50px' }}>
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

      {/* Logistics Intake Route Section */}
      <section>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#0f172a', marginBottom: '15px' }}>Logistics Intake Route</h1>
          <p style={{ color: '#475569', fontSize: '16px' }}>Coordinate physical batch pickups or route custom specification inquiries directly to our production unit desk.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '40px' }}>
          
          {/* Operational Routing Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Facility Coordinates Card */}
            <div style={{ backgroundColor: '#ffffff', padding: '25px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <svg style={{ width: '24px', height: '24px', color: '#2563eb' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0, color: '#0f172a' }}>Facility Coordinates</h3>
              </div>
              <p style={{ color: '#475569', fontSize: '15px', lineHeight: '1.6', margin: 0 }}>
                <strong style={{ color: '#0f172a' }}>Krishna Solar Farms Pvt. Ltd.</strong><br />
                C-1, Industrial Area, Growth Center,<br />
                Jamour, Shahjahanpur - 242001 UP[cite: 1]
              </p>
            </div>

            {/* Communications Channels Card */}
            <div style={{ backgroundColor: '#ffffff', padding: '25px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                <svg style={{ width: '24px', height: '24px', color: '#2563eb' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0, color: '#0f172a' }}>Communications Channels</h3>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: '#475569', fontSize: '14px' }}>
                <div>
                  <span style={{ display: 'block', fontWeight: '600', color: '#334155', marginBottom: '2px' }}>Email Enquiries:</span>
                  <span style={{ display: 'block' }}>upnonwovens@gmail.com</span>
                  <span style={{ display: 'block' }}>sale.ksfnonwoven@gmail.com</span>
                </div>
                
                <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '10px' }}>
                  <span style={{ display: 'block', fontWeight: '600', color: '#334155', marginBottom: '2px' }}>Direct Contacts:</span>
                  <span style={{ display: 'block' }}>Naman Gupta: +91 6306078257</span>
                  <span style={{ display: 'block' }}>Office Desk: +91 9473714888</span>
                </div>
              </div>
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
      </section>

    </div>
  );
};

export default Contact;