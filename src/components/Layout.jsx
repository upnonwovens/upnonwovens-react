import React from 'react';

const Layout = ({ children, currentTab, onTabClick }) => {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'products', label: 'Our Products' },
    { id: 'contact', label: 'Contact Us' }
  ];

  // WhatsApp configuration metrics
  const whatsappNumber = "916306078257";
  const whatsappMessage = encodeURIComponent("Hello KSF Non-Woven Fabric team, I would like to make an enquiry regarding your products.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', color: '#1a1a1a', backgroundColor: '#f8f9fa', minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      
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

      {/* Floating Sticky WhatsApp Quick Link Widget */}
      <a 
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          backgroundColor: '#25D366',
          color: '#ffffff',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          zIndex: 9999,
          transition: 'transform 0.2s ease, background-color 0.2s ease',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.08)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
      >
        {/* Modern Flat Inline SVG WhatsApp Icon Vector */}
        <svg style={{ width: '34px', height: '34px' }} fill="currentColor" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397 0 11.948 0c3.176.001 6.163 1.24 8.407 3.487 2.245 2.248 3.481 5.237 3.48 8.417-.003 6.597-5.339 11.946-11.89 11.946-2.01-.001-3.987-.51-5.742-1.48L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.725 1.45 5.257 0 9.532-4.282 9.534-9.542.001-2.546-.985-4.94-2.778-6.734A9.458 9.458 0 0011.946 1.66c-5.26 0-9.535 4.286-9.537 9.547-.001 1.62.463 3.21 1.342 4.597l-.993 3.625 3.71-.976zM17.46 14.5c-.307-.154-1.82-.9-2.103-1.002-.283-.103-.49-.155-.696.154-.205.308-.797 1.002-.977 1.208-.18.205-.36.23-.667.077-.307-.153-1.294-.477-2.466-1.522-.912-.813-1.527-1.817-1.707-2.125-.18-.308-.02-.474.135-.627.14-.137.307-.36.462-.538.154-.18.205-.308.308-.514.103-.205.051-.385-.026-.54-.077-.153-.696-1.677-.953-2.298-.25-.6-.537-.513-.734-.523-.19-.01-.407-.01-.624-.01-.217 0-.57.082-.868.41-.297.329-1.136 1.11-1.136 2.704 0 1.594 1.157 3.132 1.319 3.348.163.216 2.278 3.48 5.518 4.88 1.675.723 2.578.868 3.51.73.66-.098 1.82-.744 2.076-1.46.257-.717.257-1.333.18-1.461-.077-.128-.283-.205-.59-.36z"/>
        </svg>
      </a>

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