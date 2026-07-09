import React from 'react';

const Layout = ({ children }) => {
  const whatsappNumber = "916306078257";
  
  const handleWhatsApp = () => {
    window.open(`https://wa.me/${whatsappNumber}?text=Hello,%20I%20am%20interested%20in%20your%20non-woven%20fabric%20products.`, '_blank');
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', color: '#333', margin: 0, padding: 0 }}>
      {/* Global Navigation Header Area */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 40px', borderBottom: '1px solid #eaeaea' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a1a1a', letterSpacing: '1px' }}>KSF</span>
          <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#e65c00', textTransform: 'uppercase', marginTop: '2px', width: '100px' }}>Inventory Manager</span>
        </div>
        <nav style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
          <a href="#home" style={{ textDecoration: 'none', color: '#333', fontWeight: '500' }}>Home</a>
          <a href="#products" style={{ textDecoration: 'none', color: '#333', fontWeight: '500' }}>Our Products</a>
          <a href="#about" style={{ textDecoration: 'none', color: '#333', fontWeight: '500' }}>About Us</a>
          <a href="#contact" style={{ textDecoration: 'none', color: '#333', fontWeight: '500' }}>Contact Us</a>
          <button onClick={handleWhatsApp} style={{ backgroundColor: '#e65c00', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Get in Touch</button>
        </nav>
      </header>

      {/* Primary Dynamic Content Injector Area */}
      <main style={{ minHeight: '80vh' }}>
        {children}
      </main>

      {/* Global Standard Footer Area */}
      <footer style={{ backgroundColor: '#1a1a1a', color: 'white', padding: '40px', textAlign: 'center', fontSize: '14px' }}>
        <p>© 2026 UPNONWOVENS | Krishna Solar Farms Pvt. Ltd. All Rights Reserved.</p>
        <p style={{ color: '#666', marginTop: '10px' }}>C-1, Industrial Area Growth Center, Jamour, Shahjahanpur, U.P. 242001</p>
      </footer>
    </div>
  );
};

export default Layout;