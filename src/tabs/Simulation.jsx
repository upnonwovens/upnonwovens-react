import React, { useState, useEffect } from 'react';

const Simulation = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // STEP VISUALIZATION COORDINATES
  // Adjust these X (left-to-right) and Y (top-to-bottom) percentages (0-100) 
  // to perfectly align the glowing nodes to your specific M1600.jpg layout.
  const flowPoints = [
    { x: 49, y: 12 }, // 1. Hopper (Top)
    { x: 38, y: 30 }, // 2. Extruder (Moving down/left)
    { x: 36, y: 38 }, // 3. Filter
    { x: 36, y: 45 }, // 4. Metering Pump
    { x: 36, y: 55 }, // 5. Die Head (Dropping vertically)
    { x: 36, y: 68 }, // 6. Quenching Chamber (Dropping vertically)
    { x: 45, y: 75 }, // 7. Web Forming Belt (Moving right)
    { x: 55, y: 75 }, // 8. Thermal Bonding Calenders
    { x: 68, y: 82 }  // 9. Final Winder
  ];

  const processSteps = [
    { title: "Raw Material Feeding", desc: "Feeding of the PP raw material into the hopper and transferring it to the mixer." },
    { title: "Melting & Extrusion", desc: "The PP moves from the mixer into the extruder, passing through 7 distinct heating zones to achieve a complete melt." },
    { title: "Filtration", desc: "The melted PP passes through the candle filter assembly to eliminate any impurities." },
    { title: "Precision Dosing", desc: "The metering pump pushes and manipulates the filtered melted PP in precise amounts to ensure consistent flow." },
    { title: "Filament Extrusion", desc: "The melted PP is evenly distributed over the die head and extruded in the form of filaments through 21,000 holes of 0.4mm diameter." },
    { title: "Quenching & Stretching", desc: "Filaments are stretched using a suction pump and simultaneously cooled with air coming in evenly through a honeycomb structure." },
    { title: "Web Forming", desc: "The stretched filaments are evenly distributed and laid over the continuous moving belt to form the web." },
    { title: "Thermal Bonding", desc: "The web is transferred under heated calendars, applying precise pressure and heat to bond the filaments with a diamond pattern." },
    { title: "Winding", desc: "The bonded filaments, which are now in the form of fabric, are finally wound into a roll form with the help of the winder." }
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

  // Helper to generate the exact SVG path up to the current active step
  const getActivePath = () => {
    const activePoints = flowPoints.slice(0, activeStep + 1);
    if (activePoints.length === 0) return "";
    return `M ${activePoints.map(p => `${p.x} ${p.y}`).join(' L ')}`;
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
      
      {/* CSS Animation Injection for Flowing Material Effect */}
      <style>{`
        @keyframes flowDash {
          from { stroke-dashoffset: 20; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes nodePulse {
          0% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(2.5); opacity: 0; }
          100% { transform: scale(1); opacity: 0; }
        }
      `}</style>

      <section style={{ marginBottom: '60px', paddingBottom: '30px', borderBottom: '1px solid rgba(226, 232, 240, 0.8)' }}>
        <div style={{ textAlign: 'center', marginBottom: '35px', backgroundColor: 'rgba(255,255,255,0.95)', padding: '30px', borderRadius: '16px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)', backdropFilter: 'blur(10px)' }}>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 32px)', fontWeight: '800', color: '#0f172a', marginBottom: '15px' }}>3.2m PP Spunbond Line Simulation</h1>
          <p style={{ color: '#475569', fontSize: '16px' }}>Interactive process visualization tracking material flow from raw feeding to final fabric winding.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'flex-start' }}>
          
          {/* Left Side: 3D Model Image with Flow Overlay */}
          <div style={{ position: 'sticky', top: '120px', backgroundColor: 'rgba(255,255,255,0.95)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(226, 232, 240, 0.8)', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)', backdropFilter: 'blur(10px)' }}>
            <div style={{ borderRadius: '12px', overflow: 'hidden', backgroundColor: '#e2e8f0', position: 'relative' }}>
              
              <img 
                src="/M1600.jpg" 
                alt="3.2m PP Spunbond Manufacturing Line 3D Model" 
                style={{ width: '100%', height: 'auto', display: 'block', filter: 'brightness(0.9)' }} 
              />
              
              {/* SVG Overlay: Flowing Material Lines */}
              <svg 
                viewBox="0 0 100 100" 
                preserveAspectRatio="none" 
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 10 }}
              >
                {/* Background Track Path */}
                <path 
                  d={`M ${flowPoints.map(p => `${p.x} ${p.y}`).join(' L ')}`} 
                  fill="none" 
                  stroke="rgba(255, 255, 255, 0.3)" 
                  strokeWidth="0.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
                
                {/* Active Flowing Material Path */}
                <path 
                  d={getActivePath()} 
                  fill="none" 
                  stroke="#38bdf8" 
                  strokeWidth="1.2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  strokeDasharray="2, 2"
                  style={{ animation: 'flowDash 1s linear infinite' }}
                />

                {/* Active Node Pulsing Effect */}
                {flowPoints.map((point, index) => (
                  index === activeStep && (
                    <g key={`node-${index}`}>
                      {/* Core Dot */}
                      <circle cx={point.x} cy={point.y} r="1.5" fill="#e11d48" />
                      {/* Radar Pulse Effect */}
                      <circle 
                        cx={point.x} 
                        cy={point.y} 
                        r="1.5" 
                        fill="none" 
                        stroke="#e11d48" 
                        strokeWidth="0.5"
                        style={{ transformOrigin: `${point.x}px ${point.y}px`, animation: 'nodePulse 1.5s ease-out infinite' }} 
                      />
                    </g>
                  )
                ))}
              </svg>

              {/* Status Overlay */}
              <div style={{ position: 'absolute', top: '20px', left: '20px', backgroundColor: 'rgba(15, 23, 42, 0.85)', color: '#ffffff', padding: '8px 16px', borderRadius: '20px', fontWeight: '700', fontSize: '13px', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.1)', zIndex: 20 }}>
                <span style={{ color: '#38bdf8', marginRight: '6px' }}>●</span> Stage {activeStep + 1} / 9
              </div>
            </div>
            
            {/* Controls */}
            <div style={{ display: 'flex', gap: '15px', marginTop: '20px', justifyContent: 'center' }}>
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                style={{ backgroundColor: isPlaying ? '#e11d48' : '#2563eb', color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '14px', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 6px rgba(37, 99, 235, 0.2)' }}
              >
                {isPlaying ? '⏸ Pause System' : '▶ Run Simulation'}
              </button>
              <button 
                onClick={handleReset}
                style={{ backgroundColor: '#f1f5f9', color: '#475569', border: '1px solid #cbd5e1', padding: '12px 24px', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '14px', transition: 'all 0.2s' }}
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
                        backgroundColor: isActive ? '#38bdf8' : (isPast ? '#2563eb' : '#cbd5e1'), 
                        color: '#ffffff', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        fontWeight: '700',
                        fontSize: '14px',
                        transition: 'background-color 0.3s ease',
                        boxShadow: isActive ? '0 0 10px rgba(56, 189, 248, 0.5)' : 'none'
                      }}>
                        {index + 1}
                      </div>
                      {index !== processSteps.length - 1 && (
                        <div style={{ width: '2px', height: '100%', backgroundColor: isPast ? '#2563eb' : '#e2e8f0', minHeight: '40px', marginTop: '8px', transition: 'background-color 0.3s' }}></div>
                      )}
                    </div>
                    <div style={{ paddingBottom: '20px' }}>
                      <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '700', color: isActive ? '#0f172a' : '#334155', transition: 'color 0.3s ease' }}>
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