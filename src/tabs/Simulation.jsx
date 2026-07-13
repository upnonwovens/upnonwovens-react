import React, { useState, useEffect } from 'react';

const Simulation = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // SVG Flow Coordinates precisely calibrated from your click data
  const flowPoints = [
    { x: 41, y: 8 },  // 1. Hopper
    { x: 42, y: 32 }, // 2. Extruder
    { x: 58, y: 30 }, // 3. Filter
    { x: 67, y: 36 }, // 4. Metering Pump
    { x: 63, y: 37 }, // 5. Die Head
    { x: 63, y: 48 }, // 6. Quenching Chamber
    { x: 63, y: 78 }, // 7. Web Forming Belt
    { x: 49, y: 80 }, // 8. Thermal Bonding Calenders
    { x: 26, y: 88 }  // 9. Final Winder
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
      }, 4000);
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
    <div style={{ width: '100%', maxWidth: '1600px', margin: '40px auto', padding: '0 20px', boxSizing: 'border-box' }}>
      
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
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        /* Mobile-First Layout Styles */
        .sim-container {
          display: flex;
          flex-direction: column;
          width: 100%;
          border-radius: 20px;
          overflow: hidden;
          background-color: #ffffff;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          position: relative;
        }
        
        .sim-hud {
          position: relative;
          padding: 20px;
          background-color: rgba(255, 255, 255, 0.95);
          border-top: 1px solid rgba(226, 232, 240, 0.8);
          z-index: 20;
          animation: fadeIn 0.3s ease-out;
        }

        .sim-controls {
          display: flex;
          flex-direction: column;
          gap: 15px;
          padding: 20px;
          background-color: rgba(15, 23, 42, 0.95);
          z-index: 20;
          align-items: stretch;
        }

        /* Desktop Layout Override */
        @media (min-width: 850px) {
          .sim-container {
            display: block;
          }
          .sim-hud {
            position: absolute;
            top: 40px;
            right: 40px;
            width: clamp(240px, 25vw, 320px);
            background-color: transparent;
            border-top: none;
            padding: 0;
          }
          .sim-controls {
            position: absolute;
            bottom: 40px;
            left: 50%;
            transform: translateX(-50%);
            flex-direction: row;
            border-radius: 50px;
            padding: 12px 24px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            align-items: center;
          }
        }
      `}</style>

      <div className="sim-container">
        
        {/* Responsive Image Wrap */}
        <div style={{ position: 'relative', width: '100%', display: 'flex' }}>
          <img 
            src="/M1600_2.jpg" 
            alt="3.2m PP Spunbond Manufacturing Line" 
            style={{ width: '100%', height: 'auto', display: 'block', filter: 'brightness(1)' }} 
          />
          
          {/* Scalable SVG Overlay */}
          <svg 
            viewBox="0 0 100 100" 
            preserveAspectRatio="none" 
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 10 }}
          >
            {/* Background Track */}
            <path 
              d={`M ${flowPoints.map(p => `${p.x} ${p.y}`).join(' L ')}`} 
              fill="none" 
              stroke="rgba(0, 0, 0, 0.15)" 
              strokeWidth="0.4" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
            
            {/* Active Flow Line */}
            <path 
              d={getActivePath()} 
              fill="none" 
              stroke="#2563eb" 
              strokeWidth="1" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              strokeDasharray="2, 2"
              style={{ animation: 'flowDash 1s linear infinite' }}
            />

            {/* Active Pulsing Node */}
            {flowPoints.map((point, index) => (
              index === activeStep && (
                <g key={`node-${index}`}>
                  <circle cx={point.x} cy={point.y} r="1.2" fill="#e11d48" />
                  <circle 
                    cx={point.x} 
                    cy={point.y} 
                    r="1.2" 
                    fill="none" 
                    stroke="#e11d48" 
                    strokeWidth="0.4"
                    style={{ transformOrigin: `${point.x}px ${point.y}px`, animation: 'nodePulse 1.5s ease-out infinite' }} 
                  />
                </g>
              )
            ))}
          </svg>
        </div>

        {/* Dynamic Heads-Up Information Display */}
        <div className="sim-hud" key={activeStep}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
             <div style={{ backgroundColor: '#2563eb', color: '#ffffff', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '800', flexShrink: 0, boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
               {activeStep + 1}
             </div>
             <h3 style={{ color: '#0f172a', fontSize: '16px', fontWeight: '800', margin: 0, lineHeight: '1.2', textShadow: '0 2px 5px rgba(255,255,255,0.9), 0 0 15px rgba(255,255,255,1)' }}>
               {processSteps[activeStep].title}
             </h3>
           </div>
           <p style={{ margin: 0, color: '#334155', fontSize: '13px', lineHeight: '1.6', fontWeight: '600', textShadow: '0 2px 5px rgba(255,255,255,0.9), 0 0 15px rgba(255,255,255,1)' }}>
             {processSteps[activeStep].desc}
           </p>
        </div>

        {/* System Controls */}
        <div className="sim-controls">
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            style={{ 
              backgroundColor: isPlaying ? '#e11d48' : '#2563eb', 
              color: '#ffffff', 
              border: 'none', 
              padding: '12px 24px', 
              borderRadius: '30px', 
              fontWeight: '700', 
              cursor: 'pointer', 
              fontSize: '14px', 
              transition: 'all 0.2s', 
              display: 'flex', 
              alignItems: 'center',
              justifyContent: 'center',
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
              padding: '12px 24px', 
              borderRadius: '30px', 
              fontWeight: '700', 
              cursor: 'pointer', 
              fontSize: '14px', 
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