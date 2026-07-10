import React, { useState, useEffect } from 'react';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Array containing your 4 public folder image streams
  const slideImages = [
    "/slide1.jpg",
    "/slide2.jpg",
    "/slide3.jpg",
    "/slide4.jpg"
  ];

  // Automated rotation trigger executing every 4000ms
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prevIndex) => (prevIndex + 1) % slideImages.length);
    }, 4000);
    return () => clearInterval(slideTimer);
  }, [slideImages.length]);

  const highlights = [
    { title: "Eco Friendly", desc: "The fabric disintegrates and decomposes in soil and doesn't harm the environment. It is a recyclable material.[cite: 1]" },
    { title: "Non-Woven Fabric", desc: "It can be customized for its properties. For example, it can be made hard to hold heavy items and soft to skin to be wearable.[cite: 1]" },
    { title: "Ultra-Violet Repellent", desc: "Extensively used in Agriculture fields to protect the crops from UV degradation.[cite: 1]" },
    { title: "Concentrating Solar Power", desc: "We are integrating the heat from the solar system into fabric manufacturing to make it more eco friendly.[cite: 1]" }
  ];

  return (
    <div>
      {/* Dynamic Rotational Hero Carousel Section */}
      <section style={{ 
        height: '90vh', 
        width: '100%', 
        position: 'relative', 
        overflow: 'hidden', 
        backgroundColor: '#0f172a' 
      }}>
        {slideImages.map((imgSrc, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${imgSrc})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: currentSlide === index ? 1 : 0,
              transition: 'opacity 1s ease-in-out',
              zIndex: 1
            }}
          />
        ))}

        {/* High-Contrast Tint Overlay Matrix */}
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          backgroundColor: 'rgba(15, 23, 42, 0.55)', 
          zIndex: 2 
        }}></div>

        {/* Centered Typography matching reference site exactly */}
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center', 
          zIndex: 3, 
          textAlign: 'center', 
          padding: '0 20px',
          marginTop: '40px'
        }}>
          <h1 style={{ 
            fontSize: '52px', 
            fontWeight: '800', 
            color: '#ffffff', 
            marginBottom: '15px', 
            lineHeight: '1.25',
            maxWidth: '900px',
            textShadow: '0 4px 12px rgba(0,0,0,0.5)'
          }}>
            Shaping Tomorrow With Non-Woven Innovation.
          </h1>
          <p style={{ 
            fontSize: '18px', 
            color: '#cbd5e1', 
            letterSpacing: '3px', 
            textTransform: 'uppercase', 
            fontWeight: '600',
            textShadow: '0 2px 6px rgba(0,0,0,0.4)'
          }}>
            Weaving The Future
          </p>

          {/* Carousel Manual Position Slide Indicators */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '40px' }}>
            {slideImages.map((_, i) => (
              <div 
                key={i} 
                onClick={() => setCurrentSlide(i)}
                style={{ 
                  height: '4px', 
                  width: i === currentSlide ? '35px' : '12px', 
                  backgroundColor: i === currentSlide ? '#38bdf8' : 'rgba(255,255,255,0.4)', 
                  borderRadius: '2px',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Core Attributes Cards */}
      <section style={{ maxWidth: '1200px', margin: '-50px auto 60px', padding: '0 20px', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          {highlights.map((item, i) => (
            <div key={i} style={{ backgroundColor: '#ffffff', padding: '25px', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#2563eb', marginBottom: '10px' }}>{item.title}</h3>
              <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Industrial Facility Operations Showcase */}
      <section style={{ maxWidth: '1200px', margin: '60px auto', padding: '0 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '40px', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#0f172a', marginBottom: '20px' }}>Advanced Plant Production Line</h2>
            <p style={{ color: '#475569', fontSize: '16px', lineHeight: '1.6', marginBottom: '15px' }}>
              Our manufacturing unit features high-precision industrial automation executing specialized thermal bonding and extrusion sequences to generate flawless fabric weights and dimensional consistency.[cite: 1]
            </p>
            <p style={{ color: '#475569', fontSize: '16px', lineHeight: '1.6' }}>
              With fully integrated Delta PLC systems and responsive dynamic VFD drive synchronizations, we ensure strict quality compliance metrics across every operational manufacturing batch run.[cite: 1]
            </p>
          </div>
          <div>
            <div style={{ backgroundColor: '#e2e8f0', borderRadius: '12px', height: '350px', width: '100%', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
              <img 
                src="/plant-production.jpg" 
                alt="3.2-meter Spunbond Fabric Production Line Infrastructure" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Factory Operational Video Embed */}
      <section style={{ backgroundColor: '#f1f5f9', padding: '60px 20px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#0f172a', marginBottom: '15px' }}>Take a Look At Our Operations</h2>
          <p style={{ color: '#475569', fontSize: '16px', marginBottom: '30px' }}>Explore a visual tour of our continuous material processing facility running under strict automated quality standards.</p>
          
          <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', backgroundColor: '#000000' }}>
            <iframe
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
              src="https://www.youtube.com/embed/2zAmoV0UxiI?si=tXyugcD2ptnu1Aw2"
              title="KSF Spunbond Fabric Manufacturing Plant Operations"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;