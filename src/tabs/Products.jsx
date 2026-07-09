import React, { useState } from 'react';

const Products = () => {
  // Calculator Core State Registers
  const [gsm, setGsm] = useState('');
  const [width, setWidth] = useState('');
  const [weight, setWeight] = useState('');
  const [lengthResult, setLengthResult] = useState(null);

  // Kg-to-Length Conversion Formula Equation Execution
  const handleCalculate = (e) => {
    e.preventDefault();
    const gsmVal = parseFloat(gsm);
    const widthVal = parseFloat(width);
    const weightVal = parseFloat(weight);

    if (gsmVal > 0 && widthVal > 0 && weightVal > 0) {
      // Equation: Length = (Weight * 1000) / (GSM * Width)
      const calculatedLength = (weightVal * 1000) / (gsmVal * widthVal);
      setLengthResult(calculatedLength.toFixed(2));
    } else {
      setLengthResult(null);
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#0f172a', marginBottom: '15px' }}>Technical Fabric Product Portfolio</h1>
        <p style={{ color: '#475569', fontSize: '16px', maxWidth: '700px', margin: '0 auto' }}>Explore custom industrial technical textile specifications configured cleanly for standard structural packaging, healthcare overlays, and agricultural applications.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>
        {/* Specifications Matrix Details */}
        <div style={{ backgroundColor: '#ffffff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '600', marginBottom: '20px', color: '#0f172a' }}>Material Capabilities</h2>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '15px', padding: 0, listStyle: 'none', color: '#475569', fontSize: '15px' }}>
            <li style={{ paddingBottom: '10px', borderBottom: '1px solid #f1f5f9' }}><strong>Beam Architecture:</strong> 3.2-Meter Single-Beam Spunbond Extrusion Line</li>
            <li style={{ paddingBottom: '10px', borderBottom: '1px solid #f1f5f9' }}><strong>GSM Density Matrix Range:</strong> 10 GSM up to 150 GSM Configurations</li>
            <li style={{ paddingBottom: '10px', borderBottom: '1px solid #f1f5f9' }}><strong>Polymer Compounds:</strong> 100% Virgin Polypropylene (PP) Fine Fiber Matrices</li>
            <li style={{ paddingBottom: '10px', borderBottom: '1px solid #f1f5f9' }}><strong>Custom Finishes Available:</strong> Hydrophilic treatments, UV protection stabilizers</li>
          </ul>
        </div>

        {/* Industrial Batch Calculator Engine */}
        <div style={{ backgroundColor: '#ffffff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '600', marginBottom: '10px', color: '#0f172a' }}>Roll Length Calculator Engine</h2>
          <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '20px' }}>Input target parameters below to execute linear yield metrics from raw batch mass constraints.</p>
          
          <form onSubmit={handleCalculate} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#334155', marginBottom: '5px' }}>Target Fabric Density (GSM):</label>
              <input 
                type="number" 
                value={gsm} 
                onChange={(e) => setGsm(e.target.value)}
                placeholder="e.g. 40" 
                required 
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '15px', boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#334155', marginBottom: '5px' }}>Roll Delivery Width (Meters):</label>
              <input 
                type="number" 
                step="0.01" 
                value={width} 
                onChange={(e) => setWidth(e.target.value)}
                placeholder="e.g. 1.6" 
                required 
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '15px', boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#334155', marginBottom: '5px' }}>Net Total Target Mass (Kilograms):</label>
              <input 
                type="number" 
                value={weight} 
                onChange={(e) => setWeight(e.target.value)}
                placeholder="e.g. 250" 
                required 
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '15px', boxSizing: 'border-box' }}
              />
            </div>
            <button 
              type="submit" 
              style={{ backgroundColor: '#2563eb', color: '#ffffff', padding: '12px', borderRadius: '6px', border: 'none', fontWeight: '600', fontSize: '15px', cursor: 'pointer', marginTop: '5px', transition: 'background-color 0.2s' }}
            >
              Calculate Delivery Yield
            </button>
          </form>

          {lengthResult !== null && (
            <div style={{ marginTop: '25px', padding: '15px', backgroundColor: '#f0fdf4', borderRadius: '6px', border: '1px solid #bbf7d0', textAlign: 'center' }}>
              <span style={{ display: 'block', fontSize: '14px', color: '#166534', fontWeight: '500' }}>Estimated Total Output Yield:</span>
              <span style={{ fontSize: '24px', fontWeight: '700', color: '#15803d' }}>{lengthResult} Linear Meters</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;