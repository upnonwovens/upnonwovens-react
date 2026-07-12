import React, { useState, useEffect } from 'react';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slideImages = [
    "/slide1.jpg",
    "/slide2.jpg",
    "/slide3.jpg",
    "/slide4.jpg"
  ];

  useEffect(() => {
    slideImages.forEach((imageSrc) => {
      const img = new Image();
      img.src = imageSrc;
    });
  }, []);

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prevIndex) => (prevIndex + 1) % slideImages.length);
    }, 6000);
    return () => clearInterval(slideTimer);
  }, [slideImages.length]);

  return (
    <div>
      {/* Dynamic Rotational Hero Carousel Section */}
      <section style={{ 
        height: '90vh', 
        width: '100%', 
        position: 'relative', 
        overflow: 'hidden', 
        backgroundColor: '#1e293b'
      }}>
        {slideImages.map((imgSrc, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: `url(${imgSrc})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: currentSlide === index ? 1 : 0,
              transition: 'opacity 1s ease-in-out',
              zIndex: 1
            }}
          />
        ))}

        <div style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          background: 'linear-gradient(to bottom, rgba(15,23,42,0.6), rgba(15,23,42,0.75))', 
          zIndex: 2 
        }}></div>

        <div style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center', 
          zIndex: 3, 
          textAlign: 'center', 
          padding: '0 20px',
          marginTop: '40px',
          boxSizing: 'border-box'
        }}>
          <h1 style={{ 
            fontSize: 'clamp(32px, 5vw, 52px)', 
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
            fontSize: 'clamp(14px, 3vw, 18px)', 
            color: '#cbd5e1', 
            letterSpacing: '3px', 
            textTransform: 'uppercase', 
            fontWeight: '600',
            textShadow: '0 2px 6px rgba(0,0,0,0.4)'
          }}>
            Bonding The Future
          </p>

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
    </div>
  );
};

export default Home;