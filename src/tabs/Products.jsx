import React, { useState } from 'react';

const Products = () => {
  const [inputs, setInputs] = useState({ weightKg: '', length: '', width: '' });
  const [gsm, setGsm] = useState(null);

  const calculateGSM = (e) => {
    e.preventDefault();
    const { weightKg, length, width } = inputs;
    if (weightKg && length && width) {
      const weightGrams = parseFloat(weightKg) * 1000;
      const result = (weightGrams / (parseFloat(length) * parseFloat(width))).toFixed(2);
      setGsm(result);
    }
  };

  const productCatalog = [
    { name: "PP Spunbond Nonwoven Fabric", description: "High tensile strength single-beam production fabric variants." },
    { name: "Laminated Nonwoven Fabric", description: "Advanced barrier performance structures for specialized packaging use." },
    { name: "Medical Grade Fabric", description: "Antimicrobial treated blue protective technical textiles." },
    { name: "Agriculture Grade Fabric", description: "UV treated configurations optimized for microclimate stability and protection." }
  ];

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>Industrial Technical Product Portfolio</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px', marginBottom: '60px' }}>
        {productCatalog.map((product, i) => (
          <div key={i} style={{ border: '1px solid #e0e0e0', padding: '20px', borderRadius: '6px' }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#1a1a1a' }}>{product.name}</h4>
            <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.5' }}>{product.description}</p>
          </div>
        ))}
      </div>

      {/* Kg-Input Based GSM Production Calculator */}
      <div style={{ maxWidth: '500px', margin: '0 auto', padding: '30px', background: '#f9f9f9', borderRadius: '8px', border: '1px solid #ddd' }}>
        <h3 style={{ margin: '0 0 20px 0', textAlign: 'center' }}>Production GSM Calculator</h3>
        <form onSubmit={calculateGSM} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Sample Weight (Kilograms - Kg):</label>
            <input type="number" step="0.001" placeholder="e.g. 0.080" required value={inputs.weightKg} onChange={(e) => setInputs({...inputs, weightKg: e.target.value})} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Sample Length (Meters):</label>
            <input type="number" step="0.01" placeholder="e.g. 1.00" required value={inputs.length} onChange={(e) => setInputs({...inputs, length: e.target.value})} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Sample Width (Meters):</label>
            <input type="number" step="0.01" placeholder="e.g. 1.60" required value={inputs.width} onChange={(e) => setInputs({...inputs, width: e.target.value})} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
          </div>
          <button type="submit" style={{ backgroundColor: '#e65c00', color: 'white', border: 'none', padding: '12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Calculate Material Density</button>
        </form>
        {gsm && (
          <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#e6f4ea', color: '#137333', borderRadius: '4px', textAlign: 'center', fontWeight: 'bold' }}>
            Calculated Metric Base: {gsm} g/m²
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;