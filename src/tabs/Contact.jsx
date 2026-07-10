import React from 'react';

const Contact = () => {
  const managementTeam = [
    { name: "MRS. PRIYA ARYA", role: "VICE PRESIDENT", bio: "Priya Arya serves as Vice President, steering structural corporate planning and strategic business expansion frameworks.", image: "/priya.jpg" },
    { name: "MR. NAMAN GUPTA", role: "DIRECTOR", bio: "Mr. Naman Gupta, Mechanical Engineering Graduate, San Diego State University, California, USA", image: "/naman.jpg" },
    { name: "MS. SHUBHI GUPTA", role: "CHIEF MARKETING OFFICER", bio: "As the Head of Research and Development, She holds MBA in Marketing from KJ Somaiya Institute of Management, Mumbai..", image: "/shubhi.jpg" },
    { name: "MR. SAILENDRA VERMA", role: "MARKETING MANAGER", bio: "As the Marketing Manager at KSF Nonwoven, Mr. Sailendra Verma brings a wealth of expertise in developing strategic marketing.", image: "/sailendra.jpg" },
    { name: "MR. PRASENJIT SARKAR", role: "GENERAL MANAGER", bio: "Mr. Prasenjit Sarkar serves as General Manager, bringing comprehensive technical textiles operational management expertise.", image: "/prasenjit.jpg" },
    { name: "MR. PAWAN CHAUBEY", role: "PLANT HEAD", bio: "Mr. Pawan Chaubey serves as Plant Head, bringing extensive experience in manufacturing operations and quality control.", image: "/pawan.jpg" },
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
      
      {/* Leadership Section */}
      <section style={{ marginBottom: '60px', paddingBottom: '50px' }}>
        <h2 style={{ fontSize: '26px', fontWeight: '700', color: '#0f172a', marginBottom: '40px', textAlign: 'center', letterSpacing: '0.5px' }}>OUR MANAGEMENT TEAM</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px', justifyContent: 'center' }}>
          {managementTeam.map((member, index) => (
            <div key={index} style={{ backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: '12px', border: '1px solid rgba(226, 232, 240, 0.8)', overflow: 'hidden', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)', textAlign: 'center', padding: '30px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', backdropFilter: 'blur(10px)' }}>
              <div style={{ width: '150px', height: '150px', borderRadius: '50%', overflow: 'hidden', marginBottom: '20px', backgroundColor: '#e2e8f0', border: '1px solid #cbd5e1', position: 'relative' }}>
                <img src={member.image} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.style.display = 'none'; }} />
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#0f172a', margin: '0 0 4px 0', letterSpacing: '0.5px' }}>{member.name}</h3>
              <p style={{ color: '#64748b', fontSize: '13px', fontWeight: '600', margin: '0 0 15px 0' }}>{member.role}</p>
              <p style={{ color: '#475569', fontSize: '13px', lineHeight: '1.6', margin: 0, maxWidth: '280px' }}>{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Logistics Intake Route Section - Mobile Wrap Grids */}
      <section>
        <div style={{ textAlign: 'center', marginBottom: '50px', backgroundColor: 'rgba(255,255,255,0.9)', padding: '30px', borderRadius: '16px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#0f172a', marginBottom: '15px' }}>Logistics Intake Route</h1>
          <p style={{ color: '#475569', fontSize: '16px' }}>Coordinate physical batch pickups or route custom specification inquiries directly to our production unit desk.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <div style={{ backgroundColor: 'rgba(255,255,255,0.95)', padding: '25px', borderRadius: '12px', border: '1px solid rgba(226, 232, 240, 0.8)', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)', backdropFilter: 'blur(10px)' }}>
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
                Jamour, Shahjahanpur - 242001 UP
              </p>
            </div>

            <div style={{ backgroundColor: 'rgba(255,255,255,0.95)', padding: '25px', borderRadius: '12px', border: '1px solid rgba(226, 232, 240, 0.8)', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)', backdropFilter: 'blur(10px)' }}>
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
                
                <div style={{ borderTop: '1px solid rgba(241, 245, 249, 0.8)', paddingTop: '10px' }}>
                  <span style={{ display: 'block', fontWeight: '600', color: '#334155', marginBottom: '2px' }}>Direct Contacts:</span>
                  <span style={{ display: 'block' }}>Naman Gupta: +91 6306078257</span>
                  <span style={{ display: 'block' }}>Office Desk: +91 9473714888</span>
                </div>
              </div>
            </div>
            
          </div>

          {/* Live Interactive Map Box View */}
          <div style={{ backgroundColor: 'rgba(255,255,255,0.95)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(226, 232, 240, 0.8)', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)', height: '350px', backdropFilter: 'blur(10px)' }}>
            <iframe
              title="KSF Manufacturing Facility GPS Location Frame"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3527.794101416892!2d79.8828551!3d27.846153!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399f979803bba305%3A0xe54df66432f913d3!2sIndustrial%20Area%20Growth%20Centre%2C%20Jamour!5e0!3m2!1sen!2sin!4v1715000000000!5m2!1sen!2sin"
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