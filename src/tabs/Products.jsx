import React from 'react';

const Products = () => {
  const productCategories = [
    {
      id: "medical",
      title: "Medical & Healthcare",
      techSpec: "SMS (Spunbond-Meltblown-Spunbond) • Hydrophobic Treatment",
      badgeColor: "#e11d48", // Crimson Red
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

  return (
    <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px', boxSizing: 'border-box' }}>
      
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
                gap: '20px'
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

              {/* Main Technical Description */}
              <p style={{ color: '#334155', fontSize: '15px', lineHeight: '1.7', margin: 0, fontWeight: '500' }}>
                {cat.description}
              </p>

              {/* Key Features & Characteristics */}
              <div style={{ backgroundColor: 'rgba(248, 249, 250, 0.8)', padding: '20px', borderRadius: '10px', borderLeft: `4px solid ${cat.badgeColor}` }}>
                <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 12px 0' }}>
                  Technical Characteristics
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '10px' }}>
                  {cat.keyFeatures.map((feature, i) => (
                    <li key={i} style={{ color: '#475569', fontSize: '14px', display: 'flex', alignItems: 'flex-start', gap: '8px', lineHeight: '1.5' }}>
                      <span style={{ color: cat.badgeColor, fontWeight: 'bold', lineHeight: '1' }}>✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Primary Industry Applications */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', flexWrap: 'wrap', paddingTop: '5px' }}>
                <span style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Primary Applications:
                </span>
                <span style={{ color: '#64748b', fontSize: '14px', fontStyle: 'italic', lineHeight: '1.6' }}>
                  {cat.applications}
                </span>
              </div>

            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Products;