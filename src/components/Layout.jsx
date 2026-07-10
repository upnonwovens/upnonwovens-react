import React, { useState, useEffect } from 'react';

const Layout = ({ children, currentTab, onTabClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const [submitStatus, setSubmitStatus] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'products', label: 'Our Products' },
    { id: 'contact', label: 'Contact Us' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const targetWhatsAppNumber = "916306078257";
    const textMessage = `*New KSF Fabric Portal Enquiry*\n` +
                        `-------------------------\n` +
                        `• *Name:* ${formData.name}\n` +
                        `• *Phone:* ${formData.phone}\n` +
                        `• *Email:* ${formData.email}\n\n` +
                        `*Message:* ${formData.message}`;
    
    const whatsappApiUrl = `https://api.whatsapp.com/send?phone=${targetWhatsAppNumber}&text=${encodeURIComponent(textMessage)}`;
    window.open(whatsappApiUrl, '_blank');
    
    setSubmitStatus(true);
    setTimeout(() => {
      setSubmitStatus(false);
      setIsModalOpen(false);
      setFormData({ name: '', phone: '', email: '', message: '' });
    }, 1000);
  };

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', color: '#1a1a1a', minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      
      {/* Mobile CSS Injection */}
      <style>{`
        .desktop-nav { display: flex; gap: 30px; alignItems: center; }
        .mobile-toggle { display: none; background: none; border: none; font-size: 28px; color: #0f172a; cursor: pointer; }
        .mobile-nav-menu { display: none; }
        
        @media (max-width: 850px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
          .mobile-nav-menu.open {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 90px;
            left: 0;
            right: 0;
            background: rgba(255,255,255,0.98);
            backdrop-filter: blur(10px);
            padding: 20px;
            box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
            gap: 20px;
            border-top: 1px solid #e2e8f0;
          }
        }
      `}</style>

      {/* Header */}
      <header style={{ 
        backgroundColor: '#ffffff', 
        boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        zIndex: 1000, 
        display: 'flex', 
        alignItems: 'center',
        padding: 0,
        margin: 0,
        height: '90px'
      }}>
        <div style={{ maxWidth: '1200px', width: '100%', margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', margin: 0, padding: 0 }} onClick={() => { onTabClick('home'); setIsMobileMenuOpen(false); }}>
            <img 
              src="/logo.png" 
              alt="Krishna Solar Farms Logo" 
              style={{ height: '75px', width: 'auto', display: 'block', maxWidth: '100%', objectFit: 'contain' }}
            />
          </div>

          {/* Desktop Nav */}
          <nav className="desktop-nav">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => { e.preventDefault(); onTabClick(item.id); }}
                style={{
                  textDecoration: 'none',
                  color: currentTab === item.id ? '#2563eb' : '#475569',
                  fontWeight: currentTab === item.id ? '700' : '500',
                  fontSize: '15px',
                  paddingBottom: '2px',
                  borderBottom: currentTab === item.id ? '2px solid #2563eb' : '2px solid transparent',
                  transition: 'all 0.2s ease'
                }}
              >
                {item.label}
              </a>
            ))}
            <a 
              href="#contact" 
              onClick={(e) => { e.preventDefault(); onTabClick('contact'); }}
              style={{ backgroundColor: '#2563eb', color: '#ffffff', padding: '8px 20px', borderRadius: '6px', textDecoration: 'none', fontWeight: '600', fontSize: '14px', transition: 'background-color 0.2s' }}
            >
              Get In Touch
            </a>
          </nav>

          {/* Mobile Hamburger Toggle */}
          <button className="mobile-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            ☰
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <nav className={`mobile-nav-menu ${isMobileMenuOpen ? 'open' : ''}`}>
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => { e.preventDefault(); onTabClick(item.id); setIsMobileMenuOpen(false); }}
              style={{
                textDecoration: 'none',
                color: currentTab === item.id ? '#2563eb' : '#475569',
                fontWeight: currentTab === item.id ? '700' : '500',
                fontSize: '18px',
                textAlign: 'center'
              }}
            >
              {item.label}
            </a>
          ))}
          <a 
            href="#contact" 
            onClick={(e) => { e.preventDefault(); onTabClick('contact'); setIsMobileMenuOpen(false); }}
            style={{ backgroundColor: '#2563eb', color: '#ffffff', padding: '12px', borderRadius: '6px', textDecoration: 'none', fontWeight: '600', fontSize: '16px', textAlign: 'center', marginTop: '10px' }}
          >
            Get In Touch
          </a>
        </nav>
      </header>

      {/* Main Content View Frame - Featuring Colorful Fixed Parallax Watermark */}
      <main style={{ 
        flex: 1, 
        paddingTop: '90px',
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.92), rgba(255, 255, 255, 0.95)), url('/non-woven-fabric-exports.jpg')`,
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center'
      }}>
        {children}
      </main>

      {/* Floating Widget */}
      <div 
        onClick={() => setIsModalOpen(true)}
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
          cursor: 'pointer'
        }}
      >
        <svg style={{ width: '34px', height: '34px' }} fill="currentColor" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397 0 11.948 0c3.176.001 6.163 1.24 8.407 3.487 2.245 2.248 3.481 5.237 3.48 8.417-.003 6.597-5.339 11.946-11.89 11.946-2.01-.001-3.987-.51-5.742-1.48L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.725 1.45 5.257 0 9.532-4.282 9.534-9.542.001-2.546-.985-4.94-2.778-6.734A9.458 9.458 0 0011.946 1.66c-5.26 0-9.535 4.286-9.537 9.547-.001 1.62.463 3.21 1.342 4.597l-.993 3.625 3.71-.976zM17.46 14.5c-.307-.154-1.82-.9-2.103-1.002-.283-.103-.49-.155-.696.154-.205.308-.797 1.002-.977 1.208-.18.205-.36.23-.667.077-.307-.153-1.294-.477-2.466-1.522-.912-.813-1.527-1.817-1.707-2.125-.18-.308-.02-.474.135-.627.14-.137.307-.36.462-.538.154-.18.205-.308.308-.514.103-.205.051-.385-.026-.54-.077-.153-.696-1.677-.953-2.298-.25-.6-.537-.513-.734-.523-.19-.01-.407-.01-.624-.01-.217 0-.57.082-.868.41-.297.329-1.136 1.11-1.136 2.704 0 1.594 1.157 3.132 1.319 3.348.163.216 2.278 3.48 5.518 4.88 1.675.723 2.578.868 3.51.73.66-.098 1.82-.744 2.076-1.46.257-.717.257-1.333.18-1.461-.077-.128-.283-.205-.59-.36z"/>
        </svg>
      </div>

      {/* API Form Modal Wrapper */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15,23,42,0.7)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000, padding: '20px' }}>
          <div style={{ backgroundColor: '#ffffff', width: '100%', maxWidth: '480px', borderRadius: '16px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)', padding: '30px', boxSizing: 'border-box', position: 'relative' }}>
            <button onClick={() => setIsModalOpen(false)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: '#94a3b8', fontSize: '24px', cursor: 'pointer' }}>×</button>
            <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#0f172a', margin: '0 0 8px 0' }}>Quick Enquiry Desk</h3>
            <p style={{ color: '#64748b', fontSize: '14px', margin: '0 0 24px 0' }}>Leave your parameters below to route custom textile specifications directly to our desk.</p>
            {submitStatus ? (
              <div style={{ padding: '30px 10px', textAlign: 'center', backgroundColor: '#f0fdf4', color: '#166534', fontWeight: '600', borderRadius: '8px' }}>Enquiry Processed via WhatsApp API!</div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <input type="text" placeholder="Full Name" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '15px', boxSizing: 'border-box' }} />
                <input type="tel" placeholder="Contact Number" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '15px', boxSizing: 'border-box' }} />
                <input type="email" placeholder="Email Address" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '15px', boxSizing: 'border-box' }} />
                <textarea rows="4" placeholder="Enquiry Details" required value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '15px', boxSizing: 'border-box', resize: 'none' }}></textarea>
                <button type="submit" style={{ backgroundColor: '#2563eb', color: '#ffffff', padding: '14px', borderRadius: '8px', border: 'none', fontWeight: '700', cursor: 'pointer', fontSize: '15px' }}>Transmit via WhatsApp API</button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{ backgroundColor: '#0f172a', color: '#94a3b8', padding: '50px 20px', marginTop: '60px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px' }}>
          <div>
            <h3 style={{ color: '#ffffff', fontSize: '18px', marginBottom: '15px' }}>Krishna Solar Farms</h3>
            <p style={{ fontSize: '14px', lineHeight: '1.7' }}>Sustainable technical textile manufacturing specializing in eco-friendly non-woven fabric matrices.</p>
          </div>
          <div>
            <h3 style={{ color: '#ffffff', fontSize: '18px', marginBottom: '15px' }}>Quick Navigation</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
              <li><a href="#home" onClick={(e) => { e.preventDefault(); onTabClick('home'); }} style={{ color: '#94a3b8', textDecoration: 'none' }}>Home</a></li>
              <li><a href="#about" onClick={(e) => { e.preventDefault(); onTabClick('about'); }} style={{ color: '#94a3b8', textDecoration: 'none' }}>About & Executive Leadership</a></li>
              <li><a href="#products" onClick={(e) => { e.preventDefault(); onTabClick('products'); }} style={{ color: '#94a3b8', textDecoration: 'none' }}>Products Portfolio</a></li>
              <li><a href="#contact" onClick={(e) => { e.preventDefault(); onTabClick('contact'); }} style={{ color: '#94a3b8', textDecoration: 'none' }}>Logistics Route</a></li>
            </ul>
          </div>
          <div>
            <h3 style={{ color: '#ffffff', fontSize: '18px', marginBottom: '15px' }}>Facility Information</h3>
            <p style={{ fontSize: '14px', lineHeight: '1.7', margin: 0 }}>
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