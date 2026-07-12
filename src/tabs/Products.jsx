import React, { useState } from 'react';

const Products = () => {
  const [modalImage, setModalImage] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  const productCategories = [
    {
      id: "medical",
      title: "Medical & Healthcare",
      techSpec: "SMS (Spunbond-Meltblown-Spunbond) • Hydrophobic Treatment",
      badgeColor: "#e11d48", // Crimson Red
      image: "/medical.jpg",
      description: "Engineered for mission-critical barrier protection, our medical-grade SMS fabrics integrate a ultra-fine meltblown filtration core sandwiched between robust spunbond protective layers. The specialized hydrophobic architecture strictly repels blood, bodily fluids, and aqueous solutions while maintaining exceptional breathability and thermal comfort.",
      keyFeatures: [
        "High Bacterial Filtration Efficiency (BFE) & Particulate Barrier",
        "Strict fluid repellency and hydrostatic head resistance",
        "Low-linting and abrasion-resistant surface structure",
        "Fully compatible with EO (Ethylene Oxide) and Steam Sterilization"
      ],
      applications: "Surgical Gowns, Sterile Drapes, CSR Wraps, Surgeon Face Masks, and Isolation PPE Apparel."
    },
    {
      id: "hygiene",
      title: "Hygiene & Personal Care",
      techSpec: "SSS (Spunbond-Spunbond-Spunbond) • Hydrophilic Treatment",
      badgeColor: "#0284c7", // Sky Blue
      image: "/hygiene.jpg",
      description: "Designed specifically for direct, continuous skin contact, our multi-beam SSS hydrophilic textiles deliver ultra-soft tactile comfort combined with rapid moisture management. The permanent hydrophilic surface treatment lowers surface tension, promoting instant liquid strike-through into absorbent cores while preventing re-wetting to keep delicate skin dry and healthy.",
      keyFeatures: [
        "Ultra-soft, cotton-like tactile hand-feel for sensitive skin",
        "Rapid liquid strike-through rate with superior re-wet resistance",
        "Non-toxic, non-irritating, and dermatologically safe matrix",
        "High longitudinal and transverse tensile strength for high-speed converting"
      ],
      applications: "Baby Diapers Top-Sheets, Adult Incontinence Products, Feminine Hygiene Pads, and Wet/Dry Surface Wipes."
    },
    {
      id: "packaging",
      title: "Eco-Friendly Packaging",
      techSpec: "High-Tenacity Spunbond PP • Customizable GSM & Colors",
      badgeColor: "#16a34a", // Green
      image: "/packaging.jpg",
      description: "Built to displace single-use conventional plastics, our heavy-duty packaging textiles offer outstanding mechanical strength, puncture resistance, and dimensional stability. Manufactured from 100% recyclable polypropylene, these breathable fabrics are highly printable and engineered for seamless ultrasonic welding or automated industrial sewing.",
      keyFeatures: [
        "High load-bearing tensile strength and tear resistance",
        "100% recyclable, reusable, and environmentally degradable",
        "Excellent flexographic printing surface for brand vibrancy",
        "Resistant to moisture, mold, and industrial chemicals"
      ],
      applications: "Retail Shopping Totes, Industrial Box Linings, Rice & Flour Packaging Bags, Promotional Garment Bags, and Protective Wrapping."
    },
    {
      id: "agriculture",
      title: "Agricultural & Horticultural",
      techSpec: "UV-Stabilized Spunbond • Controlled Micro-Porosity",
      badgeColor: "#ca8a04", // Amber Gold
      image: "/agriculture.jpg",
      description: "Formulated with advanced ultraviolet repellents and thermal stabilizers, our agricultural textiles protect valuable crops from solar degradation, frost, pest infiltration, and severe weather. The controlled air and water permeability creates an optimal microclimate that accelerates plant growth while naturally suppressing weed proliferation without herbicides.",
      keyFeatures: [
        "Extended UV degradation resistance for multi-season outdoor exposure",
        "Optimal light, air, and irrigation water transmission",
        "Thermal insulation properties for frost and freeze protection",
        "Lightweight structure prevents physical damage to delicate seedlings"
      ],
      applications: "Direct Crop Covers, Weed Control Landscape Fabrics, Greenhouse Thermal Shading, Frost Fleece, and Fruit Protection Bags."
    },
    {
      id: "automobile",
      title: "Automotive & Industrial",
      techSpec: "Flame-Retardant • NVH Acoustic Insulation Matrix",
      badgeColor: "#475569", // Slate Grey
      image: "/automobile.jpg",
      description: "Precision-engineered for automotive interior components and NVH (Noise, Vibration, and Harshness) attenuation, our high-density industrial non-wovens combine long-term abrasion durability with superior acoustic absorption. Lightweight and inherently flame-retardant, they actively contribute to overall vehicle weight reduction and improved cabin acoustics.",
      keyFeatures: [
        "Complies with strict automotive flame-retardancy safety standards",
        "High acoustic damping and thermal insulation performance",
        "Superior dimensional stability under extreme temperature fluctuations",
        "Resistant to engine oils, greases, and automotive fluids"
      ],
      applications: "Headliner Substrates, Trunk Liners, Seat Backing Reinforcements, Parcel Shelves, Acoustic Door Panels, and Underbody Heat Shields."
    }
  ];

  const handleOpenModal = (imgSrc, imgTitle) => {
    setModalImage({ src: imgSrc, title: imgTitle });
    setZoomLevel(1);
  };

  const handleCloseModal = () => {
    setModalImage(null);
    setZoomLevel(1);
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.3, 3)); // Max zoom 3x
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.3, 0.5)); // Min zoom 0.5x
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px', boxSizing: 'border-box', position: 'relative' }}>
      
      <style>{`
        .img-hover-frame:hover .zoom-badge {
          background-color: #2563eb !important;
          color: #ffffff !important;
          transform: scale(1.05);
        }
        .img-hover-frame:hover img {
          transform: scale(1.02);
        }
      `}</style>

      {/* Section Title Header */}
      <section style={{ marginBottom: '50px', textAlign: 'center' }}>
        <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', padding: '35px 20px', borderRadius: '16px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)', border: '1px solid rgba(226, 232, 240, 0.8)', backdropFilter: 'blur(10px)' }}>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 36px)', fontWeight: '800', color: '#0f172a', margin: '0 0 12px 0' }}>Our Product Portfolio</h1>
          <p style={{ color: '#475569', fontSize: '16px', margin: 0, maxWidth: '750px', display: 'inline-block', lineHeight: '1.6' }}>
            Specialized polypropylene non-woven fabric matrices engineered for demanding industrial, medical, and commercial applications.
          </p>
        </div>
      </section>

      {/* Product Categories Grid */}
      <section style={{ marginBottom: '60px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          {productCategories.map((cat) => (
            <div 
              key={cat.id} 
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                borderRadius: '16px', 
                border: '1px solid rgba(226, 232, 240, 0.8)', 
                boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)', 
                padding: '35px', 
                backdropFilter: 'blur(10px)',
                display: 'flex',
                flexDirection: 'column',
                gap: '25px',
                boxSizing: 'border-box'
              }}
            >
              {/* Card Header with Tech Spec Badge */}
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '15px', borderBottom: '1px solid #f1f5f9', paddingBottom: '18px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                  {cat.title}
                </h2>
                <span style={{ 
                  backgroundColor: cat.badgeColor, 
                  color: '#ffffff', 
                  padding: '6px 14px', 
                  borderRadius: '20px', 
                  fontSize: '13px', 
                  fontWeight: '700', 
                  letterSpacing: '0.5px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                  {cat.techSpec}
                </span>
              </div>

              {/* Responsive 2-Column Content Body (Text + Image) */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', alignItems: 'stretch' }}>
                
                {/* Left Column: Technical Copy & Features */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'center' }}>
                  <p style={{ color: '#334155', fontSize: '15px', lineHeight: '1.7', margin: 0, fontWeight: '500' }}>
                    {cat.description}
                  </p>

                  {/* Key Features Box */}
                  <div style={{ backgroundColor: 'rgba(248, 249, 250, 0.8)', padding: '20px', borderRadius: '10px', borderLeft: `4px solid ${cat.badgeColor}` }}>
                    <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 12px 0' }}>
                      Technical Characteristics
                    </h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {cat.keyFeatures.map((feature, i) => (
                        <li key={i} style={{ color: '#475569', fontSize: '14px', display: 'flex', alignItems: 'flex-start', gap: '8px', lineHeight: '1.5' }}>
                          <span style={{ color: cat.badgeColor, fontWeight: 'bold', lineHeight: '1' }}>✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Industry Applications */}
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', flexWrap: 'wrap', paddingTop: '5px' }}>
                    <span style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Primary Applications:
                    </span>
                    <span style={{ color: '#64748b', fontSize: '14px', fontStyle: 'italic', lineHeight: '1.6' }}>
                      {cat.applications}
                    </span>
                  </div>
                </div>

                {/* Right Column: Click-to-Zoom Image Showcase Frame */}
                <div 
                  className="img-hover-frame"
                  onClick={() => handleOpenModal(cat.image, cat.title)}
                  style={{ 
                    borderRadius: '12px', 
                    overflow: 'hidden', 
                    backgroundColor: '#ffffff', 
                    border: '1px solid #cbd5e1', 
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)', 
                    display: 'flex', 
                    flexDirection: 'column',
                    alignItems: 'center', 
                    justifyContent: 'center',
                    minHeight: '280px',
                    maxHeight: '400px',
                    position: 'relative',
                    cursor: 'pointer',
                    padding: '10px'
                  }}
                >
                  <img 
                    src={cat.image} 
                    alt={`${cat.title} Product Showcase`} 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'contain', // Prevents cropping of text at edges
                      display: 'block',
                      transition: 'transform 0.3s ease'
                    }}
                    onError={(e) => { 
                      e.target.style.display = 'none'; 
                    }}
                  />
                  
                  {/* Floating Zoom Indicator Badge */}
                  <div 
                    className="zoom-badge"
                    style={{
                      position: 'absolute',
                      bottom: '15px',
                      right: '15px',
                      backgroundColor: 'rgba(15, 23, 42, 0.85)',
                      color: '#cbd5e1',
                      padding: '8px 14px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '700',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      backdropFilter: 'blur(4px)',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.15)',
                      transition: 'all 0.2s ease',
                      border: '1px solid rgba(255,255,255,0.1)'
                    }}
                  >
                    <span>🔍 Click to View & Zoom</span>
                  </div>
                </div>

              </div>

            </div>
          ))}
        </div>
      </section>

      {/* Full-Screen Lightbox Zoom Modal */}
      {modalImage && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.92)',
          backdropFilter: 'blur(8px)',
          zIndex: 100000,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          boxSizing: 'border-box'
        }}>
          
          {/* Top Control Bar */}
          <div style={{
            width: '100%',
            maxWidth: '1000px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '15px',
            color: '#ffffff',
            padding: '0 10px',
            boxSizing: 'border-box'
          }}>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#f8fafc' }}>
              {modalImage.title}
            </h3>
            
            {/* Zoom Action Buttons */}
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <button 
                onClick={handleZoomOut}
                disabled={zoomLevel <= 0.5}
                style={{ backgroundColor: '#334155', color: '#ffffff', border: 'none', width: '36px', height: '36px', borderRadius: '8px', fontWeight: '800', fontSize: '18px', cursor: zoomLevel <= 0.5 ? 'not-allowed' : 'pointer', opacity: zoomLevel <= 0.5 ? 0.5 : 1 }}
              >
                −
              </button>
              <button 
                onClick={handleResetZoom}
                style={{ backgroundColor: '#2563eb', color: '#ffffff', border: 'none', padding: '0 12px', height: '36px', borderRadius: '8px', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}
              >
                {Math.round(zoomLevel * 100)}%
              </button>
              <button 
                onClick={handleZoomIn}
                disabled={zoomLevel >= 3}
                style={{ backgroundColor: '#334155', color: '#ffffff', border: 'none', width: '36px', height: '36px', borderRadius: '8px', fontWeight: '800', fontSize: '18px', cursor: zoomLevel >= 3 ? 'not-allowed' : 'pointer', opacity: zoomLevel >= 3 ? 0.5 : 1 }}
              >
                +
              </button>
              <button 
                onClick={handleCloseModal}
                style={{ backgroundColor: '#e11d48', color: '#ffffff', border: 'none', width: '36px', height: '36px', borderRadius: '8px', fontWeight: '800', fontSize: '20px', cursor: 'pointer', marginLeft: '10px', display: 'flex', alignItems: 'center', justify-content: 'center' }}
              >
                ×
              </button>
            </div>
          </div>

          {/* Interactive Zoomable Viewport */}
          <div style={{
            width: '100%',
            maxWidth: '1000px',
            height: '80vh',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            overflow: 'auto', // Enables scrolling when zoomed inside
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}>
            <img 
              src={modalImage.src} 
              alt={modalImage.title}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                transform: `scale(${zoomLevel})`,
                transition: 'transform 0.2s ease-out',
                transformOrigin: 'center center'
              }}
            />
          </div>

          <p style={{ color: '#94a3b8', fontSize: '13px', marginTop: '12px', marginBottom: 0 }}>
            Use the + and − buttons above to scale the image, or scroll to pan across zoomed text.
          </p>

        </div>
      )}

    </div>
  );
};

export default Products;