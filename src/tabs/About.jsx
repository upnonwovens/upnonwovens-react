import React from 'react';

const About = () => {
  const managementTeam = [
    {
      name: "Executive Management Board",
      role: "Operations & Industrial Strategy Planning",
      bio: "Overseeing facility infrastructure setups, raw material matrix compliance, and software control architecture synchronizations to anchor reliable market delivery streams across domestic sectors.",
      image: "/management-profile.jpg"
    }
  ];

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
      <section>
        <h2 style={{ fontSize: '26px', fontWeight: '700', color: '#0f172a', marginBottom: '30px', textAlign: 'center' }}>Executive Leadership</h2>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {managementTeam.map((member, index) => (
            <div key={index} style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden', maxWidth: '450px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', textAlign: 'center', padding: '30px' }}>
              {/* Executive Portrait Frame Container */}
              <div style={{ width: '150px', height: '150px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 20px', backgroundColor: '#e2e8f0', border: '4px solid #f1f5f9', position: 'relative' }}>
                <img 
                  src={member.image} 
                  alt={`${member.name} - ${member.role}`} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(15,23,42,0.05)', padding: '10px' }}>
                  <span style={{ color: '#64748b', fontSize: '10px', fontWeight: '500' }}>[Headshot Portrait]</span>
                </div>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#0f172a', margin: '0 0 5px 0' }}>{member.name}</h3>
              <p style={{ color: '#2563eb', fontSize: '14px', fontWeight: '500', margin: '0 0 15px 0' }}>{member.role}</p>
              <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>{member.bio}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;