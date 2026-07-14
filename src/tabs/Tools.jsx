import React, { useState, useEffect } from 'react';

const COLORS = ['White', 'Ivory', 'Red', 'Orange', 'Lemon Yellow', 'Golden Yellow', 'Peacock Blue', 'Bottle Green', 'Medical Green', 'Beige', 'Brown', 'Black', 'Gray', 'Color Change', 'Royal Blue', 'Pink', 'Baby Pink', 'Lavender', 'Parrot Green', 'Medical Blue'];
const QUALITIES = ['Virgin', 'Fresh', 'Semi-Fresh', 'Semi 2', 'Semi Star'];
const BAG_TYPES = ['D-Cut', 'W-Cut', 'Loop Handle', 'Box Bag', 'Leader Bag', 'Stitched', 'Fabric Roll', 'Fabric Sheet'];

const Tools = () => {
  const [orderMode, setOrderMode] = useState('kg');
  const [showRateCalc, setShowRateCalc] = useState(false);
  
  const [rates, setRates] = useState({
    fabricPerKg: 0,
    conversionPerKg: 0,
    laborPerPiece: 0,
    marginPercent: 0
  });
  
  const [calculatedRate, setCalculatedRate] = useState({ perPiece: 0, perKg: 0 });

  const [inputs, setInputs] = useState({
    bagType: 'D-Cut',
    printType: 'Plain',
    gsm: 60,
    quality: 'Virgin',
    color: 'Ivory',
    width: 14,
    height: 18,
    gusset: 5,
    topFold: 3,
    inputValue: 100
  });

  const [singleBagWeightGrams, setSingleBagWeightGrams] = useState(0);
  const [calculatedResult, setCalculatedResult] = useState({ mainValue: 0, finalKgForDb: 0, rollWidth: 0, wastageInfo: '' });

  // --- RATE CALCULATION ENGINE ---
  useEffect(() => {
    if (singleBagWeightGrams > 0) {
      const weightInKg = singleBagWeightGrams / 1000;
      const materialCostPerPiece = weightInKg * (Number(rates.fabricPerKg) + Number(rates.conversionPerKg));
      const totalCostPerPiece = materialCostPerPiece + Number(rates.laborPerPiece);
      const finalRatePerPiece = totalCostPerPiece * (1 + (Number(rates.marginPercent) / 100));
      const finalRatePerKg = weightInKg > 0 ? finalRatePerPiece / weightInKg : 0;

      setCalculatedRate({
        perPiece: Number(finalRatePerPiece.toFixed(2)),
        perKg: Number(finalRatePerKg.toFixed(2))
      });
    } else {
      setCalculatedRate({ perPiece: 0, perKg: 0 });
    }
  }, [rates, singleBagWeightGrams]);

  // Auto-set Top Fold Defaults based on Bag Type
  useEffect(() => {
    if (inputs.bagType === 'D-Cut') setInputs((prev) => ({ ...prev, topFold: 3 }));
    else if (inputs.bagType === 'Loop Handle') setInputs((prev) => ({ ...prev, topFold: 1 }));
    else if (inputs.bagType === 'Box Bag' || inputs.bagType === 'Leader Bag') setInputs((prev) => ({ ...prev, topFold: 1 }));
    else if (inputs.bagType === 'Stitched') setInputs((prev) => ({ ...prev, topFold: 1.5 }));
    else setInputs((prev) => ({ ...prev, topFold: 0 }));
  }, [inputs.bagType]);

  // --- CORE SPECIFICATION & WASTAGE CALCULATION ENGINE ---
  useEffect(() => {
    if (inputs.inputValue > 0 && inputs.width > 0 && inputs.height > 0) {
      const W = Number(inputs.width);
      const H = Number(inputs.height);
      const G = Number(inputs.gusset);
      const F = Number(inputs.topFold);
      const GSM = Number(inputs.gsm);
      
      let calcRollWidth = 0;
      let fabricAreaInch = 0;

      // 1. ROLL WIDTH & AREA LOGIC
      if (inputs.bagType === 'W-Cut') {
        calcRollWidth = W + (G * 2);
        fabricAreaInch = calcRollWidth * (H * 2);
      } else if (inputs.bagType === 'Box Bag' || inputs.bagType === 'Leader Bag') {
        calcRollWidth = (H * 2) + G + (F * 2);
        const cutLength = W + G;
        fabricAreaInch = calcRollWidth * cutLength;
      } else if (inputs.bagType === 'Stitched') {
        calcRollWidth = W + (G * 2) + 2;
        fabricAreaInch = calcRollWidth * (H + F) * 2;
      } else if (inputs.bagType === 'Fabric Sheet') {
        calcRollWidth = W;
        fabricAreaInch = W * H;
      } else {
        calcRollWidth = (H + F) * 2;
        const effectiveWidth = W + (G > 0 ? G : 0);
        fabricAreaInch = calcRollWidth * effectiveWidth;
      }
      
      // 2. FABRIC WEIGHT
      const fabricGrams = (fabricAreaInch * 0.00064516) * GSM;
      
      // 3. HANDLE WEIGHT
      let handleWeightGrams = 0;
      if (['Loop Handle', 'Box Bag', 'Stitched', 'Leader Bag'].includes(inputs.bagType)) {
        handleWeightGrams = 4;
      }

      const singleBagTotalGrams = fabricGrams + handleWeightGrams;
      setSingleBagWeightGrams(singleBagTotalGrams);

      // 4. WASTAGE
      let wastagePercent = inputs.bagType === 'W-Cut' ? 0.12 : inputs.bagType === 'D-Cut' ? 0.02 : 0.03;
      if (inputs.bagType === 'Fabric Sheet') wastagePercent = 0.01;

      let mainResult = 0;
      let dbKg = 0;

      if (orderMode === 'pieces') {
        const totalKgPure = (singleBagTotalGrams * inputs.inputValue) / 1000;
        const requiredKg = totalKgPure * (1 + wastagePercent);
        mainResult = Number(requiredKg.toFixed(2));
        dbKg = mainResult;
      } else {
        const usableGrams = (inputs.inputValue * 1000) / (1 + wastagePercent);
        const pieces = Math.floor(usableGrams / singleBagTotalGrams);
        mainResult = pieces;
        dbKg = inputs.inputValue;
      }

      setCalculatedResult({
        mainValue: mainResult,
        finalKgForDb: dbKg,
        rollWidth: Math.ceil(calcRollWidth),
        wastageInfo: `${(wastagePercent * 100).toFixed(0)}%`
      });
    }
  }, [inputs, orderMode]);

  const handleChange = (e) => {
    const value = e.target.type === 'number' ? Number(e.target.value) : e.target.value;
    setInputs({ ...inputs, [e.target.name]: value });
  };

  const handleReset = () => {
    setInputs({
      bagType: 'D-Cut',
      printType: 'Plain',
      gsm: 60,
      quality: 'Virgin',
      color: 'Ivory',
      width: 14,
      height: 18,
      gusset: 5,
      topFold: 3,
      inputValue: 100
    });
    setRates({ fabricPerKg: 0, conversionPerKg: 0, laborPerPiece: 0, marginPercent: 0 });
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px', boxSizing: 'border-box' }}>
      
      {/* Section Title Header */}
      <section style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h1 style={{ fontSize: 'clamp(28px, 4vw, 36px)', fontWeight: '800', color: '#0f172a', margin: '0 0 12px 0' }}>
          Non-Woven Bag Specification Calculator
        </h1>
        <p style={{ color: '#475569', fontSize: '16px', margin: 0, maxWidth: '750px', display: 'inline-block', lineHeight: '1.6' }}>
          Instantly compute exact fabric roll widths, unit piece weights, and manufacturing yield rates based on your custom bag dimensions.
        </p>
      </section>

      {/* SINGLE UNIFIED MASTER CARD: Calculator UI */}
      <section style={{ marginBottom: '60px' }}>
        <div style={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.95)', 
          padding: '40px', 
          borderRadius: '20px', 
          boxShadow: '0 15px 35px rgba(0,0,0,0.06)', 
          border: '1px solid rgba(226, 232, 240, 0.8)', 
          backdropFilter: 'blur(12px)',
          display: 'flex',
          flexDirection: 'column',
          gap: '30px'
        }}>
          
          {/* Top Bar: Title & Mode Selector */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '15px', borderBottom: '1px solid #e2e8f0', paddingBottom: '20px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
              Engineering Parameters
            </h2>
            
            <div style={{ display: 'flex', backgroundColor: '#e2e8f0', borderRadius: '8px', padding: '4px' }}>
              <button 
                type="button" 
                onClick={() => setOrderMode('pieces')} 
                style={{ 
                  padding: '6px 16px', 
                  borderRadius: '6px', 
                  fontSize: '14px', 
                  fontWeight: '700', 
                  border: 'none', 
                  cursor: 'pointer',
                  backgroundColor: orderMode === 'pieces' ? '#ffffff' : 'transparent',
                  color: orderMode === 'pieces' ? '#2563eb' : '#64748b',
                  boxShadow: orderMode === 'pieces' ? '0 2px 4px rgba(0,0,0,0.08)' : 'none',
                  transition: 'all 0.2s'
                }}
              >
                By Pieces
              </button>
              <button 
                type="button" 
                onClick={() => setOrderMode('kg')} 
                style={{ 
                  padding: '6px 16px', 
                  borderRadius: '6px', 
                  fontSize: '14px', 
                  fontWeight: '700', 
                  border: 'none', 
                  cursor: 'pointer',
                  backgroundColor: orderMode === 'kg' ? '#ffffff' : 'transparent',
                  color: orderMode === 'kg' ? '#16a34a' : '#64748b',
                  boxShadow: orderMode === 'kg' ? '0 2px 4px rgba(0,0,0,0.08)' : 'none',
                  transition: 'all 0.2s'
                }}
              >
                By Weight (Kg)
              </button>
            </div>
          </div>

          {/* Input Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>Bag Type</label>
              <select name="bagType" value={inputs.bagType} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', fontWeight: '600', color: '#0f172a', backgroundColor: '#ffffff' }}>
                {BAG_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>Print Technology</label>
              <select name="printType" value={inputs.printType} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', fontWeight: '600', color: '#0f172a', backgroundColor: '#ffffff' }}>
                <option value="Plain">Plain (Unprinted)</option>
                <option value="Flex">Flex Printing</option>
                <option value="Offset">Offset Printing</option>
                <option value="Screen">Screen Printing</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#7e22ce', textTransform: 'uppercase', marginBottom: '6px' }}>Polymer Quality</label>
              <select name="quality" value={inputs.quality} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e9d5ff', fontSize: '14px', fontWeight: '600', color: '#0f172a', backgroundColor: '#f3e8ff' }}>
                {QUALITIES.map(q => <option key={q} value={q}>{q}</option>)}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>Fabric Color</label>
              <select name="color" value={inputs.color} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', fontWeight: '600', color: '#0f172a', backgroundColor: '#ffffff' }}>
                {COLORS.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>GSM (Weight)</label>
              <input type="number" name="gsm" value={inputs.gsm} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', fontWeight: '600', color: '#0f172a', boxSizing: 'border-box' }} required />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>Width (Inches)</label>
              <input type="number" name="width" value={inputs.width} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', fontWeight: '600', color: '#0f172a', boxSizing: 'border-box' }} required />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>Height (Inches)</label>
              <input type="number" name="height" value={inputs.height} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', fontWeight: '600', color: '#0f172a', boxSizing: 'border-box' }} required />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>Gusset (Inches)</label>
              <input type="number" name="gusset" value={inputs.gusset} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', fontWeight: '600', color: '#0f172a', boxSizing: 'border-box' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#e11d48', textTransform: 'uppercase', marginBottom: '6px' }}>Top Fold (Inches)</label>
              <input type="number" name="topFold" value={inputs.topFold} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #fecdd3', fontSize: '14px', fontWeight: '600', color: '#0f172a', backgroundColor: '#fff1f2', boxSizing: 'border-box' }} />
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#2563eb', textTransform: 'uppercase', marginBottom: '6px' }}>
                {orderMode === 'pieces' ? 'Target Batch Quantity (Pieces)' : 'Target Batch Weight (Kg)'}
              </label>
              <input type="number" name="inputValue" value={inputs.inputValue === 0 ? '' : inputs.inputValue} onChange={handleChange} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '2px solid #bfdbfe', fontSize: '16px', fontWeight: '700', color: '#1e3a8a', backgroundColor: '#eff6ff', boxSizing: 'border-box' }} required />
            </div>

          </div>

          {/* --- EXPANDABLE RATE CALCULATOR --- */}
          <div style={{ backgroundColor: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <div onClick={() => setShowRateCalc(!showRateCalc)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', userSelect: 'none' }}>
              <div style={{ fontWeight: '800', color: '#4338ca', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>💰 Commercial Cost & Rate Calculator</span>
                <span style={{ fontSize: '12px', color: '#6366f1' }}>{showRateCalc ? '▼' : '▶'}</span>
              </div>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#64748b' }}>
                {singleBagWeightGrams > 0 ? `Unit Weight: ${singleBagWeightGrams.toFixed(2)} g / piece` : 'Enter dimensions first'}
              </div>
            </div>

            {showRateCalc && (
              <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '15px', borderTop: '1px solid #e2e8f0', paddingTop: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>Fabric Rate (₹/Kg)</label>
                  <input type="number" placeholder="e.g. 120" value={rates.fabricPerKg || ''} onChange={e => setRates({...rates, fabricPerKg: Number(e.target.value)})} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>Print/Conv. (₹/Kg)</label>
                  <input type="number" placeholder="e.g. 30" value={rates.conversionPerKg || ''} onChange={e => setRates({...rates, conversionPerKg: Number(e.target.value)})} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>Stitch/Labor (₹/Pc)</label>
                  <input type="number" placeholder="e.g. 1.50" value={rates.laborPerPiece || ''} onChange={e => setRates({...rates, laborPerPiece: Number(e.target.value)})} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>Margin/Waste (%)</label>
                  <input type="number" placeholder="e.g. 10" value={rates.marginPercent || ''} onChange={e => setRates({...rates, marginPercent: Number(e.target.value)})} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', boxSizing: 'border-box' }} />
                </div>

                <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '15px', marginTop: '10px', flexWrap: 'wrap' }}>
                  <div style={{ flex: '1 1 200px', backgroundColor: '#e0e7ff', padding: '15px', borderRadius: '8px', border: '1px solid #c7d2fe', textAlign: 'center' }}>
                    <div style={{ fontSize: '12px', color: '#4338ca', fontWeight: '800', textTransform: 'uppercase' }}>Computed Rate Per Piece</div>
                    <div style={{ fontSize: '24px', fontWeight: '800', color: '#312e81', marginTop: '4px' }}>₹{calculatedRate.perPiece}</div>
                  </div>
                  <div style={{ flex: '1 1 200px', backgroundColor: '#dcfce7', padding: '15px', borderRadius: '8px', border: '1px solid #bbf7d0', textAlign: 'center' }}>
                    <div style={{ fontSize: '12px', color: '#166534', fontWeight: '800', textTransform: 'uppercase' }}>Computed Rate Per Kg</div>
                    <div style={{ fontSize: '24px', fontWeight: '800', color: '#14532d', marginTop: '4px' }}>₹{calculatedRate.perKg}</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* --- RESULTS HUD DISPLAY --- */}
          <div style={{ backgroundColor: '#0f172a', color: '#ffffff', padding: '25px', borderRadius: '16px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '20px', boxShadow: '0 10px 25px rgba(0,0,0,0.15)' }}>
            <div>
              <div style={{ fontSize: '13px', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase', marginBottom: '6px' }}>
                REQUIRED RAW MATERIAL ROLL SIZE
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '28px', fontFamily: 'monospace', fontWeight: '800', color: '#facc15', border: '1px solid #ca8a04', padding: '2px 12px', borderRadius: '8px', backgroundColor: 'rgba(113, 63, 18, 0.3)' }}>
                  {calculatedResult.rollWidth}"
                </span>
                <span style={{ color: '#475569', fontSize: '20px' }}>|</span>
                <span style={{ fontSize: '14px', fontWeight: '700', color: '#cbd5e1', backgroundColor: '#1e293b', padding: '6px 12px', borderRadius: '6px', border: '1px solid #334155' }}>
                  Wastage Allowance: {calculatedResult.wastageInfo}
                </span>
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '13px', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase', marginBottom: '6px' }}>
                TOTAL MANUFACTURING YIELD
              </div>
              <div style={{ fontSize: '36px', fontWeight: '800', color: '#ffffff', lineHeight: '1' }}>
                {calculatedResult.mainValue}{' '}
                <span style={{ fontSize: '18px', color: '#64748b', fontWeight: '700' }}>
                  {orderMode === 'pieces' ? 'kg required' : 'total pieces'}
                </span>
              </div>
            </div>
          </div>

          {/* Reset Action Button */}
          <button 
            type="button" 
            onClick={handleReset} 
            style={{ 
              width: '100%', 
              backgroundColor: '#f1f5f9', 
              color: '#475569', 
              padding: '14px', 
              borderRadius: '10px', 
              fontWeight: '700', 
              fontSize: '15px', 
              border: '1px solid #cbd5e1', 
              cursor: 'pointer', 
              transition: 'all 0.2s' 
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#e2e8f0'; e.currentTarget.style.color = '#0f172a'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#f1f5f9'; e.currentTarget.style.color = '#475569'; }}
          >
            🔄 Reset Calculation Parameters
          </button>

        </div>
      </section>

    </div>
  );
};

export default Tools;