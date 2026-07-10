import React, { useState, useEffect } from 'react';

const Simulation = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // SVG Flow Coordinates mapped to M1600.jpg
  const flowPoints = [
    { x: 49, y: 12 }, // Hopper
    { x: 38, y: 30 }, // Extruder
    { x: 36, y: 38 }, // Filter
    { x: 36, y: 45 }, // Metering Pump
    { x: 36, y: 55 }, // Die Head
    { x: 36, y: 68 }, // Quenching Chamber
    { x: 45, y: 75 }, // Web Forming Belt
    { x: 55, y: 75 }, // Thermal Bonding Calenders
    { x: 68, y: 82 }  // Final Winder
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
      }, 4000); // 4 seconds per process step
    }
    return () => clearInterval(interval);
  }, [isPlaying, processSteps.length]);

  const handleReset = () => {
    setIsPlaying(false);
    setActiveStep(0);
  };

  const getActivePath = () => {
    const activePoints = flowPoints.slice(0, activeStep + 1);
    if (activePoints.length === 0) return "";
    return `M ${activePoints.map(p => `${p.x} ${p.y}`).join(' L ')}`;
  };

  return (
    <div style={{ width: '100%', maxWidth: '1600px', margin: '40px auto', padding: '0 20px' }}>
      
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
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Cinematic Full-Width Container */}
      <div style={{ 
        position: 'relative', 
        width: '100%', 
        borderRadius: '20px', 
        overflow: 'hidden', 
        backgroundColor: '#f8fafc', 
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)' 
      }}>
        
        {/* Base 3D Model Image */}
        <img 
          src="/M1600.jpg" 
          alt="3.2m PP Spunbond Manufacturing Line" 
          style={{ width: '100%', height: 'auto', display: 'block', filter: 'brightness(0.95)' }} 
        />
        
        {/* Translucent Energy Flow SVG */}
        <svg 
          viewBox="0 0 100 100" 
          preserveAspectRatio="none" 
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 10 }}
        >
          {/* Background Track */}
          <path 
            d={`M ${flowPoints.map(p => `${p.x} ${p.y}`).join(' L ')}`} 
            fill="none" 
            stroke="rgba(255, 255, 255, 0.4)" 
            strokeWidth="0.4" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
          
          {/* Active Flow Line */}
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

          {/* Active Pulsing Node */}
          {flowPoints.map((point, index) => (
            index === activeStep && (
              <g key={`node-${index}`}>
                <circle cx={point.x} cy={point.y} r="1.5" fill="#e11d48" />
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

        {/* Top Right: Dynamic Heads-Up Information Display */}
        <div 
          key={activeStep} 
          style={{ 
            position: 'absolute', 
            top: '40px', 
            right: '40px', 
            width: 'clamp(280px, 30vw, 420px)', 
            backgroundColor: 'rgba(255, 255, 255, 0.95)', 
            backdropFilter: 'blur(12px)', 
            padding: '30px', 
            borderRadius: '16px', 
            boxShadow: '0 15px 35px rgba(0,0,0,0.15)', 
            border: '1px solid rgba(226, 232, 240, 0.8)', 
            zIndex: 20,
            animation: 'fadeIn 0.4s ease-out'
          }}
        >
           <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '15px' }}>
             <div style={{ backgroundColor: '#2563eb', color: '#ffffff', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', fontWeight: '800', flexShrink: 0 }}>
               {activeStep + 1}
             </div>
             <h3 style={{ color: '#0f172a', fontSize: '20px', fontWeight: '800', margin: 0, lineHeight: '1.3' }}>
               {processSteps[activeStep].title}
             </h3>
           </div>
           <p style={{ margin: 0, color: '#475569', fontSize: '15px', lineHeight: '1.7' }}>
             {processSteps[activeStep].desc}
           </p>
        </div>

        {/* Bottom Center: Simulation System Controls */}
        <div style={{ 
          position: 'absolute', 
          bottom: '40px', 
          left: '50%', 
          transform: 'translateX(-50%)', 
          display: 'flex', 
          gap: '20px', 
          backgroundColor: 'rgba(15, 23, 42, 0.85)', 
          padding: '12px 24px', 
          borderRadius: '50px', 
          backdropFilter: 'blur(10px)', 
          zIndex: 20, 
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)' 
        }}>
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            style={{ 
              backgroundColor: isPlaying ? '#e11d48' : '#2563eb', 
              color: '#ffffff', 
              border: 'none', 
              padding: '12px 28px', 
              borderRadius: '30px', 
              fontWeight: '700', 
              cursor: 'pointer', 
              fontSize: '15px', 
              transition: 'all 0.2s', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px' 
            }}
          >
            {isPlaying ? '⏸ Pause System' : '▶ Run Simulation'}
          </button>
          <button 
            onClick={handleReset}
            style={{ 
              backgroundColor: 'transparent', 
              color: '#cbd5e1', 
              border: '1px solid rgba(255,255,255,0.3)', 
              padding: '12px 28px', 
              borderRadius: '30px', 
              fontWeight: '700', 
              cursor: 'pointer', 
              fontSize: '15px', 
              transition: 'all 0.2s' 
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#ffffff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#cbd5e1'; }}
          >
            Reset
          </button>
        </div>

      </div>
    </div>
  );
};

export default Simulation;