import React from 'react';

const Layout = ({ children, currentTab, setCurrentTab }) => {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'products', label: 'Our Products' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact Us' }
  ];

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', color: '#1a1a1a', backgroundColor: '#f8f9fa', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header style={{ backgroundColor: '#ffffff', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', position: 'sticky', top: 0, zIndex: 1000 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Logo Section */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <img 
              src="/logo.png" 
              alt="KSF Non-Woven Fabric Logo" 
              style={{ height: '50px', width: 'auto', display: 'block' }}
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#0f172a', letterSpacing: '0.5px' }}>KSF Non-Woven Fabric</span>
            <span style={{ fontSize: '11px', color: '#64748b', fontWeight: '500', marginTop: '2px' }}>Inventory Manager</span>
          </div>

          {/* Navigation */}
          <nav style={{ display: 'flex', gap: '30px' }}>
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentTab(item.id);
                  window.location.hash = item.id;
                }}
                style={{
                  textDecoration: 'none',
                  color: currentTab === item.id ? '#2563eb' : '#475569',
                  fontWeight: currentTab === item.id ? '600' : '500',
                  fontSize: '15px',
                  paddingBottom: '5px',
                  borderBottom: currentTab === item.id ? '2px solid #2563eb' : '2px solid transparent',
                  transition: 'all 0.2s ease'
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Quick Contact CTA */}
          <div>
            <a 
              href="#contact" 
              onClick={() => { setCurrentTab('contact'); window.location.hash = 'contact'; }}
              style={{ backgroundColor: '#2563eb', color: '#ffffff', padding: '10px 20px', borderRadius: '6px', textDecoration: 'none', fontWeight: '600', fontSize: '14px', transition: 'background-color 0.2s' }}
            >
              Get In Touch
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Stream */}
      <main style={{ flex: 1 }}>
        {children}
      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: '#0f172a', color: '#94a3b8', padding: '40px 20px', marginTop: '60px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px' }}>
          <div>
            <h3 style={{ color: '#ffffff', fontSize: '16px', marginBottom: '15px' }}>KSF Non-Woven Fabric</h3>
            <p style={{ fontSize: '14px', lineHeight: '1.6' }}>Advanced technical textile manufacturing specializing in high-performance polypropylene spunbond production solutions.</p>
          </div>
          <div>
            <h3 style={{ color: '#ffffff', fontSize: '16px', marginBottom: '15px' }}>Quick Links</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
              <li><a href="#home" style={{ color: '#94a3b8', textDecoration: 'none' }}>Home</a></li>
              <li><a href="#products" style={{ color: '#94a3b8', textDecoration: 'none' }}>Products & Calculator</a></li>
              <li><a href="#about" style={{ color: '#94a3b8', textDecoration: 'none' }}>About & Executive Leadership</a></li>
              <li><a href="#contact" style={{ color: '#94a3b8', textDecoration: 'none' }}>Logistics Route</a></li>
            </ul>
          </div>
          <div>
            <h3 style={{ color: '#ffffff', fontSize: '16px', marginBottom: '15px' }}>Facility Information</h3>
            <p style={{ fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
              Corporate Operations Info<br />
              Krishna Solar Farms Pvt. Ltd.<br />
              Manufacturing Sector, India
            </p>
          </div>
        </div>
        <div style={{ maxWidth: '1200px', margin: '40px auto 0', paddingBreak: '20px 0 0', borderTop: '1px solid #334155', textAlign: 'center', fontSize: '13px' }}>
          © 2026 Krishna Solar Farms Pvt. Ltd. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;