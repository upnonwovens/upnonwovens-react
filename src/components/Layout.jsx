import React, { useState } from 'react';

const Layout = ({ children, currentTab, onTabClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', color: '#1a1a1a', backgroundColor: '#f8f9fa', minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      
      {/* Premium Transparent Floating Header Overlapping Carousel */}
      <header style={{ 
        backgroundColor: 'rgba(15, 23, 42, 0.45)', 
        backdropFilter: 'blur(8px)',
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        zIndex: 1000, 
        height: '80px', 
        display: 'flex', 
        alignItems: 'center',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{ maxWidth: '1200px', width: '100%', margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          
          {/* Sized & Highly Visible Logo Frame matching Spunweb profile */}
          <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => onTabClick('home')}>
            <img 
              src="/logo.png" 
              alt="Krishna Solar Farms Logo" 
              style={{ height: '60px', width: 'auto', display: 'block', maxWidth: '340px', objectFit: 'contain' }}
            />
          </div>

          {/* Navigation Links - Set to Crisp High-Visibility White Text */}
          <nav style={{ display: 'flex', gap: '35px', alignItems: 'center' }}>
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
                  color: currentTab === item.id ? '#38bdf8' : '#ffffff',
                  fontWeight: '600',
                  fontSize: '15px',
                  letterSpacing: '0.3px',
                  paddingBottom: '4px',
                  borderBottom: currentTab === item.id ? '2px solid #38bdf8' : '2px solid transparent',
                  transition: 'all 0.2s ease',
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Contact CTA Button Element */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <a 
              href="#contact" 
              onClick={(e) => { e.preventDefault(); onTabClick('contact'); }}
              style={{ 
                backgroundColor: '#e11d48', 
                color: '#ffffff', 
                padding: '10px 22px', 
                borderRadius: '20px', 
                textDecoration: 'none', 
                fontWeight: '600', 
                fontSize: '14px', 
                transition: 'all 0.2s',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#be123c'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#e11d48'; }}
            >
              Contact Us
            </a>
          </div>
        </div>
      </header>

      {/* Primary Layout Frame */}
      <main style={{ flex: 1 }}>
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
          transition: 'transform 0.2s ease',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.08)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
      >
        <svg style={{ width: '34px', height: '34px' }} fill="currentColor" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397 0 11.948 0c3.176.001 6.163 1.24 8.407 3.487 2.245 2.248 3.481 5.237 3.48 8.417-.003 6.597-5.339 11.946-11.89 11.946-2.01-.001-3.987-.51-5.742-1.48L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.725 1.45 5.257 0 9.532-4.282 9.534-9.542.001-2.546-.985-4.94-2.778-6.734A9.458 9.458 0 0011.946 1.66c-5.26 0-9.535 4.286-9.537 9.547-.001 1.62.463 3.21 1.342 4.597l-.993 3.625 3.71-.976zM17.46 14.5c-.307-.154-1.82-.9-2.103-1.002-.283-.103-.49-.155-.696.154-.205.308-.797 1.002-.977 1.208-.18.205-.36.23-.667.077-.307-.153-1.294-.477-2.466-1.522-.912-.813-1.527-1.817-1.707-2.125-.18-.308-.02-.474.135-.627.14-.137.307-.36.462-.538.154-.18.205-.308.308-.514.103-.205.051-.385-.026-.54-.077-.153-.696-1.677-.953-2.298-.25-.6-.537-.513-.734-.523-.19-.01-.407-.01-.624-.01-.217 0-.57.082-.868.41-.297.329-1.136 1.11-1.136 2.704 0 1.594 1.157 3.132 1.319 3.348.163.216 2.278 3.48 5.518 4.88 1.675.723 2.578.868 3.51.73.66-.098 1.82-.744 2.076-1.46.257-.717.257-1.333.18-1.461-.077-.128-.283-.205-.59-.36z"/>
        </svg>
      </div>

      {/* API Form Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000, padding: '20px' }}>
          <div style={{ backgroundColor: '#ffffff', width: '100%', maxWidth: '480px', borderRadius: '16px', padding: '30px', boxSizing: 'border-box', position: 'relative' }}>
            <button onClick={() => setIsModalOpen(false)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: '#94a3b8', fontSize: '24px', cursor: 'pointer' }}>×</button>
            <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#0f172a', margin: '0 0 8px 0' }}>Quick Enquiry Desk</h3>
            <p style={{ color: '#64748b', fontSize: '14px', margin: '0 0 24px 0' }}>Leave your parameters below to route custom textile specifications directly to our desk.</p>
            {submitStatus ? (
              <div style={{ padding: '20px 10px', textAlign: 'center', backgroundColor: '#f0fdf4', color: '#166534', fontWeight: '600', borderRadius: '8px' }}>Enquiry Processed via WhatsApp API!</div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <input type="text" placeholder="Full Name" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
                <input type="tel" placeholder="Contact Number" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
                <input type="email" placeholder="Email Address" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
                <textarea rows="4" placeholder="Enquiry Details" required value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', resize: 'none' }}></textarea>
                <button type="submit" style={{ backgroundColor: '#2563eb', color: '#ffffff', padding: '12px', borderRadius: '6px', border: 'none', fontWeight: '600', cursor: 'pointer' }}>Transmit via WhatsApp API</button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{ backgroundColor: '#0f172a', color: '#94a3b8', padding: '40px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px' }}>
          <div>
            <h3 style={{ color: '#ffffff', fontSize: '16px', marginBottom: '15px' }}>Krishna Solar Farms</h3>
            <p style={{ fontSize: '14px', lineHeight: '1.6' }}>Sustainable technical textile manufacturing specializing in eco-friendly non-woven fabric matrices.</p>
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
            <p style={{ fontSize: '14px', lineHeight: '1.6', margin: 0 }}>Krishna Solar Farms Pvt. Ltd.<br />C-1, Industrial Area, Growth Center,<br />Jamour, Shahjahanpur - 242001 UP[cite: 1]</p>
          </div>
        </div>
        <div style={{ maxWidth: '1200px', margin: '40px auto 0', padding: '20px 0 0', borderTop: '1px solid #334155', textAlign: 'center', fontSize: '13px' }}>© 2026 Krishna Solar Farms Pvt. Ltd. All Rights Reserved.</div>
      </footer>
    </div>
  );
};

export default Layout;