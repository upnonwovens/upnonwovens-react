import React from 'react';

const About = () => {
  const managementTeam = [
    {
      name: "MR. NAMAN GUPTA",
      role: "DIRECTOR",
      bio: "Mr. Naman Gupta, Mechanical Engineering Graduate, San Diego State University, California, USA",
      image: "/naman.jpg"
    },
    {
      name: "MS. SHUBHI GUPTA",
      role: "HEAD OF R&D",
      bio: "As the Head of Research and Development, She holds MBA in Marketing from KJ Somaiya Institute of Management, Mumbai..",
      image: "/shubhi.jpg"
    },
    {
      name: "MR. SHAILENDRA VERMA",
      role: "MARKETING MANAGER",
      bio: "As the Marketing Manager at KSF Nonwoven, Mr. Shailendra Verma brings a wealth of expertise in developing strategic marketing.",
      image: "/shailendra.jpg"
    },
    {
      name: "MR. PRASENJIT SARKAR",
      role: "GENERAL MANAGER",
      bio: "Mr. Prasenjit Sarkar serves as General Manager, bringing comprehensive technical textiles operational management expertise.",
      image: "/prasenjit.jpg"
    },
    {
      name: "PRIYA ARYA",
      role: "VICE PRESIDENT",
      bio: "Priya Arya serves as Vice President, steering structural corporate planning and strategic business expansion frameworks.",
      image: "/priya.jpg"
    }
  ];

  // Helper component for uniform social links
  const SocialIcons = () => (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', margin: '15px 0', color: '#475569' }}>
      {/* Facebook */}
      <svg style={{ width: '18px', height: '18px', cursor: 'pointer' }} fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
      {/* Twitter */}
      <svg style={{ width: '18px', height: '18px', cursor: 'pointer' }} fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
      {/* LinkedIn */}
      <svg style={{ width: '18px', height: '18px', cursor: 'pointer' }} fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
      {/* Instagram */}
      <svg style={{ width: '18px', height: '18px', cursor: 'pointer' }} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
    </div>
  );

  return (
    <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
      {/* Corporate Profile Narrative */}
      <section style={{ marginBottom: '60px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#0f172a', marginBottom: '20px' }}>Corporate Trajectory</h1>
        <p style={{ color: '#475569', fontSize: '16px', lineHeight: '1.7', maxWidth: '800px', margin: '0 auto' }}>
          Operating as a dedicated subsidiary wing of <strong>Krishna Solar Farms Pvt. Ltd.</strong>, our non-woven fabric division fuses precise engineering practices with optimized manufacturing protocols. We execute reliable technical production schedules configured to deliver consistent industrial components.
        </p>
      </section>

      {/* Leadership Profile Array Section */}
      <section style={{ marginBottom: '60px' }}>
        <h2 style={{ fontSize: '26px', fontWeight: '700', color: '#0f172a', marginBottom: '40px', textAlign: 'center', letterSpacing: '0.5px' }}>OUR MANAGEMENT TEAM</h2>
        
        {/* Responsive Grid Layout to match the screenshot structure */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', justifyContent: 'center' }}>
          {managementTeam.map((member, index) => (
            <div 
              key={index} 
              style={{ 
                backgroundColor: '#ffffff', 
                borderRadius: '12px', 
                border: '1px solid #e2e8f0', 
                overflow: 'hidden', 
                boxShadow: '0 4px 10px rgba(0,0,0,0.02)', 
                textAlign: 'center', 
                padding: '30px 20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              {/* Executive Portrait Circular Container */}
              <div style={{ width: '180px', height: '180px', borderRadius: '50%', overflow: 'hidden', marginBottom: '20px', backgroundColor: '#e2e8f0', border: '1px solid #cbd5e1', position: 'relative' }}>
                <img 
                  src={member.image} 
                  alt={`${member.name} - ${member.role}`} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(15,23,42,0.03)' }}>
                  <span style={{ color: '#64748b', fontSize: '11px', fontWeight: '500' }}>[Photo Frame]</span>
                </div>
              </div>

              <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a', margin: '0 0 4px 0', letterSpacing: '0.5px' }}>{member.name}</h3>
              <p style={{ color: '#64748b', fontSize: '13px', fontWeight: '600', margin: '0 0 10px 0', letterSpacing: '0.5px' }}>{member.role}</p>
              
              {/* Social Channels Matching Dashboard Layout */}
              <SocialIcons />
              
              <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.6', margin: '10px 0 0 0', maxWidth: '280px' }}>{member.bio}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;