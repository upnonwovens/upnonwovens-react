import React from 'react';

const Layout = ({ children, currentTab, onTabClick }) => {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'products', label: 'Our Products' },
    { id: 'contact', label: 'Contact Us' }
  ];

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', color: '#1a1a1a', backgroundColor: '#f8f9fa', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Sticky Navigation Bar */}
      <header style={{ backgroundColor: '#ffffff', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', position: 'sticky', top: 0, zIndex: 1000 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => onTabClick('home')}>
            <img 
              src="/logo.png" 
              alt="Krishna Solar Farms Logo" 
              style={{ height: '70px', width: 'auto', display: 'block', maxWidth: '280px', objectFit: 'contain' }}
            />
          </div>

          <nav style={{ display: 'flex', gap: '30px' }}>
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onTabClick(item.id);
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

          <div>
            <a 
              href="#contact" 
              onClick={(e) => { e.preventDefault(); onTabClick('contact'); }}
              style={{ backgroundColor: '#2563eb', color: '#ffffff', padding: '10px 20px', borderRadius: '6px', textDecoration: 'none', fontWeight: '600', fontSize: '14px', transition: 'background-color 0.2s' }}
            >
              Get In Touch
            </a>
          </div>
        </div>
      </header>

      <main style={{ flex: 1 }}>
        {children}
      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: '#0f172a', color: '#94a3b8', padding: '40px 20px', marginTop: '60px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px' }}>
          <div>
            <h3 style={{ color: '#ffffff', fontSize: '16px', marginBottom: '15px' }}>Krishna Solar Farms</h3>
            <p style={{ fontSize: '14px', lineHeight: '1.6' }}>Kanhiya Hosiery Group — Sustainable technical textile manufacturing specializing in eco-friendly non-woven fabric matrices.</p>
          </div>
          <div>
            <h3 style={{ color: '#ffffff', fontSize: '16px', marginBottom: '15px' }}>Quick Navigation</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
              <li><a href="#home" onClick={(e) => { e.preventDefault(); onTabClick('home'); }} style={{ color: '#94a3b8', textDecoration: 'none' }}>Home</a></li>
              <li><a href="#about" onClick={(e) => { e.preventDefault(); onTabClick('about'); }} style={{ color: '#94a3b8', textDecoration: 'none' }}>About & Executive Leadership</a></li>
              <li><a href="#products" onClick={(e) => { e.preventDefault(); onTabClick('products'); }} style={{ color: '#94a3b8', textDecoration: 'none' }}>Products Portfolio</a></li>
              <li><a href="#contact" onClick={(e) => { e.preventDefault(); onTabClick('contact'); }} style={{ color: '#94a3b8', textDecoration: 'none' }}>Logistics Route</a></li>
            </ul>
          </div>
          <div>
            <h3 style={{ color: '#ffffff', fontSize: '16px', marginBottom: '15px' }}>Facility Information</h3>
            <p style={{ fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
              Krishna Solar Farms Pvt. Ltd.<br />
              C-1, Industrial Area, Growth Center,<br />
              Jamour, Shahjahanpur - 242001 UP
            </p>
          </div>
        </div>
        <div style={{ maxWidth: '1200px', margin: '40px auto 0', padding: '20px 0 0', borderTop: '1px solid #334155', textAlign: 'center', fontSize: '13px' }}>
          © 2026 Krishna Solar Farms Pvt. Ltd. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;