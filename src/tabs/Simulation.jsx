import React, { useState, useEffect } from 'react';

const Simulation = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const processSteps = [
    { 
      title: "Raw Material Feeding", 
      desc: "Feeding of the PP raw material into the hopper and transferring it to the mixer." 
    },
    { 
      title: "Melting & Extrusion", 
      desc: "The PP moves from the mixer into the extruder, passing through 7 distinct heating zones to achieve a complete melt." 
    },
    { 
      title: "Filtration", 
      desc: "The melted PP passes through the candle filter assembly to eliminate any impurities." 
    },
    { 
      title: "Precision Dosing", 
      desc: "The metering pump pushes and manipulates the filtered melted PP in precise amounts to ensure consistent flow." 
    },
    { 
      title: "Filament Extrusion", 
      desc: "The melted PP is evenly distributed over the die head and extruded in the form of filaments through 21,000 holes of 0.4mm diameter." 
    },
    { 
      title: "Quenching & Stretching", 
      desc: "Filaments are stretched using a suction pump and simultaneously cooled with air coming in evenly through a honeycomb structure." 
    },
    { 
      title: "Web Forming", 
      desc: "The stretched filaments are evenly distributed and laid over the continuous moving belt to form the web." 
    },
    { 
      title: "Thermal Bonding", 
      desc: "The web is transferred under heated calendars, applying precise pressure and heat to bond the filaments with a diamond pattern." 
    },
    { 
      title: "Winding", 
      desc: "The bonded filaments, which are now in the form of fabric, are finally wound into a roll form with the help of the winder." 
    }
  ];

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setActiveStep((prev) => {
          if (prev === processSteps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [isPlaying, processSteps.length]);

  const handleReset = () => {
    setIsPlaying(false);
    setActiveStep(0);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
      <section style={{ marginBottom: '60px', paddingBottom: '30px', borderBottom: '1px solid rgba(226, 232, 240, 0.8)' }}>
        <div style={{ textAlign: 'center', marginBottom: '35px', backgroundColor: 'rgba(255,255,255,0.9)', padding: '30px', borderRadius: '16px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#0f172a', marginBottom: '15px' }}>3.2m PP Spunbond Line Simulation</h1>
          <p style={{ color: '#475569', fontSize: '16px' }}>Interactive process visualization from raw material feeding to final fabric winding.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'flex-start' }}>
          
          {/* Left Side: 3D Model Image */}
          <div style={{ position: 'sticky', top: '120px', backgroundColor: 'rgba(255,255,255,0.95)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(226, 232, 240, 0.8)', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)', backdropFilter: 'blur(10px)' }}>
            <div style={{ borderRadius: '12px', overflow: 'hidden', backgroundColor: '#f1f5f9', position: 'relative' }}>
              <img 
                src="/M1600.jpg" 
                alt="3.2m PP Spunbond Manufacturing Line 3D Model" 
                style={{ width: '100%', height: 'auto', display: 'block' }} 
              />
              {/* Active Step Indicator Overlay */}
              <div style={{ position: 'absolute', top: '20px', left: '20px', backgroundColor: '#2563eb', color: '#ffffff', padding: '8px 16px', borderRadius: '20px', fontWeight: '700', fontSize: '14px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                Stage {activeStep + 1} / 9
              </div>
            </div>
            
            {/* Simulation Controls */}
            <div style={{ display: 'flex', gap: '15px', marginTop: '20px', justifyContent: 'center' }}>
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                style={{ backgroundColor: isPlaying ? '#e11d48' : '#16a34a', color: '#ffffff', border: 'none', padding: '10px 24px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '15px', transition: 'background-color 0.2s', display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                {isPlaying ? '⏸ Pause Simulation' : '▶ Play Simulation'}
              </button>
              <button 
                onClick={handleReset}
                style={{ backgroundColor: '#64748b', color: '#ffffff', border: 'none', padding: '10px 24px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '15px', transition: 'background-color 0.2s' }}
              >
                Reset
              </button>
            </div>
          </div>

          {/* Right Side: Step-by-Step Interactive Timeline */}
          <div style={{ backgroundColor: 'rgba(255,255,255,0.95)', padding: '30px', borderRadius: '16px', border: '1px solid rgba(226, 232, 240, 0.8)', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)', backdropFilter: 'blur(10px)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {processSteps.map((step, index) => {
                const isActive = index === activeStep;
                const isPast = index < activeStep;
                return (
                  <div 
                    key={index} 
                    onClick={() => { setActiveStep(index); setIsPlaying(false); }}
                    style={{ 
                      display: 'flex', 
                      gap: '20px', 
                      cursor: 'pointer',
                      opacity: isActive || isPast ? 1 : 0.4,
                      transition: 'all 0.3s ease',
                      transform: isActive ? 'scale(1.02)' : 'scale(1)'
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{ 
                        width: '32px', 
                        height: '32px', 
                        borderRadius: '50%', 
                        backgroundColor: isActive ? '#2563eb' : (isPast ? '#16a34a' : '#cbd5e1'), 
                        color: '#ffffff', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        fontWeight: '700',
                        fontSize: '14px',
                        transition: 'background-color 0.3s ease'
                      }}>
                        {index + 1}
                      </div>
                      {index !== processSteps.length - 1 && (
                        <div style={{ width: '2px', height: '100%', backgroundColor: isPast ? '#16a34a' : '#e2e8f0', minHeight: '40px', marginTop: '8px' }}></div>
                      )}
                    </div>
                    <div style={{ paddingBottom: '20px' }}>
                      <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '700', color: isActive ? '#2563eb' : '#0f172a', transition: 'color 0.3s ease' }}>
                        {step.title}
                      </h3>
                      <p style={{ margin: 0, color: '#475569', fontSize: '14px', lineHeight: '1.6' }}>
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Simulation;