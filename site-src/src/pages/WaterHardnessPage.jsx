import { useState } from 'react';

function calcHardness(ca, mg) {
  const c = parseFloat(ca);
  const m = parseFloat(mg);
  if (isNaN(c) || isNaN(m)) return null;
  return c * 2.5 + m * 4.1;
}

function calcBlend(a, b, hardA, hardB) {
  const volA = parseFloat(a.ml);
  const volB = parseFloat(b.ml);
  if (isNaN(volA) || isNaN(volB) || volA + volB <= 0) return null;
  if (hardA === null || hardB === null) return null;
  const totalVol = volA + volB;
  const blended = (hardA * volA + hardB * volB) / totalVol;
  return { hardness: blended, volume: totalVol };
}

function WaterSection({ label, values, onChange, result }) {
  return (
    <div className="wh-section">
      <p className="wh-section-label">{label}</p>
      <div className="wh-field">
        <label className="wh-label">カルシウム量</label>
        <div className="wh-input-row">
          <input
            type="number"
            min="0"
            step="0.1"
            className="wh-input"
            value={values.ca}
            onChange={(e) => onChange('ca', e.target.value)}
            placeholder="0"
          />
          <span className="wh-unit">mg/L</span>
        </div>
      </div>
      <div className="wh-field">
        <label className="wh-label">マグネシウム量</label>
        <div className="wh-input-row">
          <input
            type="number"
            min="0"
            step="0.1"
            className="wh-input"
            value={values.mg}
            onChange={(e) => onChange('mg', e.target.value)}
            placeholder="0"
          />
          <span className="wh-unit">mg/L</span>
        </div>
      </div>
      <div className="wh-field">
        <label className="wh-label">使用量</label>
        <div className="wh-input-row">
          <input
            type="number"
            min="0"
            step="1"
            className="wh-input"
            value={values.ml}
            onChange={(e) => onChange('ml', e.target.value)}
            placeholder="0"
          />
          <span className="wh-unit">ml</span>
        </div>
      </div>
      <div className="wh-result">
        <span className="wh-result-label">硬度</span>
        <span className="wh-result-value">
          {result !== null ? `${result.toFixed(1)} mg/L` : '—'}
        </span>
      </div>
    </div>
  );
}

const empty = { ca: '', mg: '', ml: '' };

export function WaterHardnessPage() {
  const [a, setA] = useState(empty);
  const [b, setB] = useState(empty);
  const [results, setResults] = useState({ a: null, b: null, blend: null });

  function handleChange(which, field, val) {
    if (which === 'a') setA((prev) => ({ ...prev, [field]: val }));
    else setB((prev) => ({ ...prev, [field]: val }));
  }

  function handleCalc() {
    const hardA = calcHardness(a.ca, a.mg);
    const hardB = calcHardness(b.ca, b.mg);
    const blend = calcBlend(a, b, hardA, hardB);
    setResults({ a: hardA, b: hardB, blend });
  }

  function handleClear() {
    setA(empty);
    setB(empty);
    setResults({ a: null, b: null, blend: null });
  }

  return (
    <main className="page-main">
      <div className="wh-page">
        <p className="page-kicker">Cafe Wa-create</p>
        <h1 className="page-title">ざっくり水硬度計算機</h1>
        <p className="wh-subtitle">水の硬度にこだわるコーヒーマニアへ</p>
        <p className="wh-note">テキストエリアに数字を入れて計算ボタンをクリック</p>
        <p className="wh-formula">
          硬度(mg/L)＝（カルシウム量(mg/L)×2.5）+（マグネシウム量(mg/L)×4.1）で計算
        </p>
        <p className="wh-formula">
          配合後の硬度は使用量(ml)で重み付けした加重平均で算出します。
        </p>

        <div className="wh-grid">
          <WaterSection
            label="水 A"
            values={a}
            onChange={(f, v) => handleChange('a', f, v)}
            result={results.a}
          />
          <WaterSection
            label="水 B"
            values={b}
            onChange={(f, v) => handleChange('b', f, v)}
            result={results.b}
          />
        </div>

        <div className="wh-blend">
          <p className="wh-section-label">配合後</p>
          <div className="wh-blend-row">
            <span className="wh-result-label">合計使用量</span>
            <span className="wh-result-value">
              {results.blend !== null ? `${results.blend.volume} ml` : '—'}
            </span>
          </div>
          <div className="wh-blend-row">
            <span className="wh-result-label">硬度</span>
            <span className="wh-result-value">
              {results.blend !== null ? `${results.blend.hardness.toFixed(1)} mg/L` : '—'}
            </span>
          </div>
        </div>

        <div className="wh-actions">
          <button className="wh-btn wh-btn-calc" onClick={handleCalc}>計算</button>
          <button className="wh-btn wh-btn-clear" onClick={handleClear}>クリア</button>
        </div>
      </div>
    </main>
  );
}
