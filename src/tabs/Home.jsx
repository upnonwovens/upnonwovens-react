import React, { useState, useEffect } from 'react';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: "/non-woven-fabric-exports.jpg",
      title: "Precision Non-Woven Fabric Manufacturing",
      subtitle: "Advanced PP Spunbond Technology engineered for global industrial, commercial, and healthcare standards."
    },
    {
      id: 2,
      image: "/medical.jpg",
      title: "Mission-Critical Medical & Healthcare Fabrics",
      subtitle: "High-barrier hydrophobic SMS textiles engineered for surgical gowns, drapes, masks, and protective PPE apparel."
    },
    {
      id: 3,
      image: "/hygiene.jpg",
      title: "Ultra-Soft Hygiene & Personal Care Solutions",
      subtitle: "Multi-beam SSS hydrophilic textiles delivering superior rapid moisture strike-through and tactile comfort."
    },
    {
      id: 4,
      image: "/M1600_2.jpg",
      title: "3.2M High-Speed Extrusion Infrastructure",
      subtitle: "State-of-the-art multi-beam production lines ensuring unmatched uniformity, tensile strength, and quality control."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div style={{ 
      position: 'relative', 
      width: '100%', 
      height: 'clamp(500px, 85vh, 800px)', 
      overflow: 'hidden', 
      backgroundColor: '#0f172a',
      margin: 0,
      padding: 0
    }}>
      
      {/* Rotating Image Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: index === currentSlide ? 1 : 0,
            pointerEvents: index === currentSlide ? 'auto' : 'none',
            transition: 'opacity 1s ease-in-out',
            zIndex: index === currentSlide ? 10 : 1,
            transform: 'translate3d(0, 0, 0)',
            WebkitTransform: 'translate3d(0, 0, 0)',
            willChange: 'opacity'
          }}
        >
          {/* Background Image with Dark Gradient Overlay */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `linear-gradient(to right, rgba(15, 23, 42, 0.85) 0%, rgba(15, 23, 42, 0.4) 50%, rgba(15, 23, 42, 0.2) 100%)`,
            zIndex: 2
          }} />
          
          <img
            src={slide.image}
            alt={slide.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              display: 'block'
            }}
          />

          {/* Frosted Glass Content Box */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '5%',
            transform: 'translateY(-50%)',
            zIndex: 3,
            maxWidth: '700px',
            padding: '35px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
            color: '#ffffff',
            boxSizing: 'border-box'
          }}>
            <span style={{
              display: 'inline-block',
              backgroundColor: '#2563eb',
              color: '#ffffff',
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: '700',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              marginBottom: '16px'
            }}>
              Krishna Solar Farms Pvt. Ltd.
            </span>
            
            <h1 style={{
              fontSize: 'clamp(28px, 4vw, 44px)',
              fontWeight: '800',
              lineHeight: '1.2',
              margin: '0 0 16px 0',
              color: '#ffffff',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}>
              {slide.title}
            </h1>
            
            <p style={{
              fontSize: 'clamp(15px, 2vw, 18px)',
              lineHeight: '1.6',
              color: '#e2e8f0',
              margin: '0 0 28px 0',
              fontWeight: '500'
            }}>
              {slide.subtitle}
            </p>

            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
              <a
                href="#products"
                style={{
                  backgroundColor: '#2563eb',
                  color: '#ffffff',
                  padding: '14px 28px',
                  borderRadius: '10px',
                  fontWeight: '700',
                  fontSize: '15px',
                  textDecoration: 'none',
                  display: 'inline-block',
                  boxShadow: '0 4px 12px rgba(37, 99, 235, 0.4)',
                  transition: 'background-color 0.2s'
                }}
              >
                Explore Products Portfolio
              </a>
              <a
                href="#contact"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  color: '#ffffff',
                  padding: '14px 28px',
                  borderRadius: '10px',
                  fontWeight: '700',
                  fontSize: '15px',
                  textDecoration: 'none',
                  display: 'inline-block',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  transition: 'background-color 0.2s'
                }}
              >
                Contact Unit Desk
              </a>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Indicators (Dots) */}
      <div style={{
        position: 'absolute',
        bottom: '30px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 20,
        display: 'flex',
        gap: '12px',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: 'rgba(15, 23, 42, 0.6)',
        backdropFilter: 'blur(8px)',
        borderRadius: '30px',
        border: '1px solid rgba(255, 255, 255, 0.15)'
      }}>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            style={{
              width: index === currentSlide ? '32px' : '12px',
              height: '12px',
              borderRadius: '6px',
              backgroundColor: index === currentSlide ? '#3b82f6' : 'rgba(255, 255, 255, 0.4)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              padding: 0
            }}
          />
        ))}
      </div>

    </div>
  );
};

export default Home;