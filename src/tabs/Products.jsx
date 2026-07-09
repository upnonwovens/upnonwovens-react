import React, { useState } from 'react';

const Products = () => {
  const [gsm, setGsm] = useState('');
  const [width, setWidth] = useState('');
  const [weight, setWeight] = useState('');
  const [lengthResult, setLengthResult] = useState(null);

  const handleCalculate = (e) => {
    e.preventDefault();
    const gsmVal = parseFloat(gsm);
    const widthVal = parseFloat(width);
    const weightVal = parseFloat(weight);

    if (gsmVal > 0 && widthVal > 0 && weightVal > 0) {
      const calculatedLength = (weightVal * 1000) / (gsmVal * widthVal);
      setLengthResult(calculatedLength.toFixed(2));
    } else {
      setLengthResult(null);
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
      
      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#0f172a', marginBottom: '10px' }}>Product Range & Logistics Specifications</h1>
        <p style={{ color: '#475569', fontSize: '16px' }}>High-performance Spunbond technical components engineered for diverse packaging and agricultural use-cases.</p>
      </div>

      {/* Main Framework Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px', alignItems: 'start', marginBottom: '50px' }}>
        
        {/* Left Card: Uses of Non-Woven Fabric with Translation */}
        <div style={{ backgroundColor: '#ffffff', padding: '30px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#0f172a', marginBottom: '15px' }}>Uses of Non-Woven Fabric</h3>
          <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.6', marginBottom: '15px' }}>
            The Spun bond nonwoven fabric is the main raw material for general accessories like Teabags, Vacuum Filter bags, Shoe Covers, Hair nets, Facemask, Car cover, Coat covet, Luggage and Bags, Shopping Bag, Dust covers, shade Net, agro Net, Sanitary Napkins, Baby and Incontinence Diapers.
          </p>
          <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.6', marginBottom: '15px' }}>
            It is heavily distributed for specialized hospital accessories like Caps, Masks, Drapes, Gowns, Aprons, Beddings, and Disposable Underwear.
          </p>
          <div style={{ backgroundColor: '#f1f5f9', padding: '15px', borderRadius: '8px', borderLeft: '3px solid #64748b' }}>
            <p style={{ color: '#475569', fontSize: '12px', lineHeight: '1.5', margin: 0, fontStyle: 'italic' }}>
              टीबैग्स, वैक्यूम फिल्टर बैग्स, शू कवर्स, हेयर नेट, फेसमास्क, कार कवर, कोट कोवेट, लगेज और बैग्स, शॉपिंग बैग, डस्ट कवर, शेड नेट, एग्रो नेट आदि जैसे सामान्य सामान। सैनिटरी नैपकिन, बेबी और असंयम डायपर, कैप्स, मास्क, ड्रेप्स, गाउन, एप्रन, बेडिंग्स, डिस्पोजेबल अंडरवीयर जैसे हॉस्पिटल एक्सेसरीज।
            </p>
          </div>
        </div>

        {/* Right Card: Yield Calculator Module */}
        <div style={{ backgroundColor: '#ffffff', padding: '30px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '600', marginBottom: '5px', color: '#0f172a' }}>Roll Length Calculator Engine</h2>
          <p style={{ color: '#64748b', fontSize: '13px', marginBottom: '20px' }}>Input parameters to determine linear output matrix measurements from total raw roll mass indicators.</p>
          
          <form onSubmit={handleCalculate} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#334155', marginBottom: '5px' }}>Target Fabric Density (GSM):</label>
              <input type="number" value={gsm} onChange={(e) => setGsm(e.target.value)} placeholder="e.g. 40" required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#334155', marginBottom: '5px' }}>Roll Delivery Width (Meters):</label>
              <input type="number" step="0.01" value={width} onChange={(e) => setWidth(e.target.value)} placeholder="e.g. 1.6" required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#334155', marginBottom: '5px' }}>Net Total Target Mass (Kilograms):</label>
              <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="e.g. 250" required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
            </div>
            <button type="submit" style={{ backgroundColor: '#2563eb', color: '#ffffff', padding: '12px', borderRadius: '6px', border: 'none', fontWeight: '600', cursor: 'pointer', transition: 'background-color 0.2s' }}>Calculate Delivery Yield</button>
          </form>

          {lengthResult !== null && (
            <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f0fdf4', borderRadius: '6px', border: '1px solid #bbf7d0', textAlign: 'center' }}>
              <span style={{ display: 'block', fontSize: '14px', color: '#166534', fontWeight: '500' }}>Calculated Output Yield:</span>
              <span style={{ fontSize: '22px', fontWeight: '700', color: '#15803d' }}>{lengthResult} Linear Meters</span>
            </div>
          )}
        </div>

      </div>

      {/* Full-width Section: Specialized Non-Woven Bags Module */}
      <section style={{ backgroundColor: '#ffffff', padding: '35px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.01)' }}>
        <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', marginBottom: '15px' }}>Eco-Friendly Alternatives: Non-Woven Bags</h3>
        <p style={{ color: '#475569', fontSize: '15px', lineHeight: '1.7', marginBottom: '15px' }}>
          The Non-woven bags look like a textile, they are in fact made from spun bonded polypropylene, commonly known as PP. No water is used in the production process and thereby not polluted. The material is recyclable thus environmentally friendly & assists with Environment protection. These bags are the cheapest alternative to plastic. The non-woven bags have generated the highest order from the market since the plastic bag ban.
        </p>
        <p style={{ color: '#475569', fontSize: '15px', lineHeight: '1.7', marginBottom: '20px' }}>
          There are various kinds of non-woven bags such as non-woven rice bag, carry bag, catering bag, banyan cut bag, fruit and vegetables bag, grocery/shopping bag, PP bag, gift bag, printed bag and many more. <strong>Non-woven rice bags</strong> are extensively used to store rice in place of conventional plastic and paper bags. Non-woven rice bags have high tensile strength and are highly durable. Non-woven fabric bags are widely used as packing material due to so many advantages over conventional sacks. These bags are excellent for covering products and goods thereby protecting them from moisture and dust.
        </p>
      </section>

    </div>
  );
};

export default Products;