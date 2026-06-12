import { useState } from 'react';

const emptyInputs = {
  cal1: '',
  mg1: '',
  cal2: '',
  mg2: '',
  totalAmount: '',
  totalHardness: '',
};

function calcHardness(ca, mg) {
  return Number(ca) * 2.5 + Number(mg) * 4.1;
}

function formatHardness(value) {
  return String(Math.round(value * 100) / 100);
}

function Bottle({ values, fields, onChange, result }) {
  const [calField, mgField] = fields;
  return (
    <div className="wh-bottle">
      <img src="/assets/techreate/wh-bottle.png" alt="" className="wh-art" />
      {/* 計算結果は注ぎ口(水しぶき)の上に重ねて「このボトルから◯ml」を表現。
          %配置なので画面幅によらずボトルに追従する */}
      {result && (
        <div className="wh-bottle-result" aria-live="polite">
          <span className="wh-bottle-hardness">硬度 {result.hardness} mg/L</span>
          {result.amount !== null && (
            <span className="wh-result-line">
              <span className="wh-pill">{result.amount}</span>
              {result.amount !== 'エラー' && <span className="wh-unit">ml</span>}
            </span>
          )}
        </div>
      )}
      <input
        type="number"
        min="0"
        step="0.01"
        className="wh-input wh-bottle-cal"
        placeholder="カルシウム"
        value={values[calField]}
        onChange={(e) => onChange(calField, e.target.value)}
      />
      <span className="wh-unit wh-bottle-cal-unit">mg/L</span>
      <input
        type="number"
        min="0"
        step="0.01"
        className="wh-input wh-bottle-mg"
        placeholder="マグネシウム"
        value={values[mgField]}
        onChange={(e) => onChange(mgField, e.target.value)}
      />
      <span className="wh-unit wh-bottle-mg-unit">mg/L</span>
    </div>
  );
}

export function WaterHardnessPage() {
  const [inputs, setInputs] = useState(emptyInputs);
  const [results, setResults] = useState(null);

  function handleChange(field, value) {
    setInputs((prev) => ({ ...prev, [field]: value }));
  }

  function handleCalc() {
    const hard1 = calcHardness(inputs.cal1, inputs.mg1);
    const hard2 = calcHardness(inputs.cal2, inputs.mg2);
    const total = parseInt(inputs.totalAmount, 10);
    const target = Number(inputs.totalHardness);

    let amount1 = 'エラー';
    let amount2 = null;
    for (let x = 1; x < total; x++) {
      const y = total - x;
      const blended = Math.trunc((x / total) * hard1 + (y / total) * hard2);
      if (target === blended) {
        amount1 = String(x);
        amount2 = String(y);
        break;
      }
    }

    setResults({
      bottle1: { hardness: formatHardness(hard1), amount: amount1 },
      bottle2: { hardness: formatHardness(hard2), amount: amount2 },
    });
  }

  function handleClear() {
    setInputs(emptyInputs);
    setResults(null);
  }

  return (
    <main className="wh-main">
      <div className="wh-page">
        <header className="wh-head">
          <p className="wh-sub">水の硬度にこだわるコーヒーマニアへ</p>
          <h1 className="wh-title">ざっくり水硬度計算機</h1>
        </header>

        <div className="wh-bottles">
          <Bottle
            values={inputs}
            fields={['cal1', 'mg1']}
            onChange={handleChange}
            result={results?.bottle1}
          />
          <Bottle
            values={inputs}
            fields={['cal2', 'mg2']}
            onChange={handleChange}
            result={results?.bottle2}
          />
        </div>

        <div className="wh-bottom">
          <div className="wh-pitcher">
            <img src="/assets/techreate/wh-pitcher.png" alt="" className="wh-art" />
            <input
              type="number"
              min="0"
              className="wh-input wh-pitcher-amount"
              placeholder="作成したい水の量"
              value={inputs.totalAmount}
              onChange={(e) => handleChange('totalAmount', e.target.value)}
            />
            <span className="wh-unit wh-pitcher-amount-unit">ml</span>
            <input
              type="number"
              min="0"
              className="wh-input wh-pitcher-hardness"
              placeholder="作成したい硬度"
              value={inputs.totalHardness}
              onChange={(e) => handleChange('totalHardness', e.target.value)}
            />
          </div>
          <div className="wh-side">
            <p className="wh-instruction">
              テキストエリアに数字を入れて
              <br />
              計算ボタンクリック
            </p>
            <div className="wh-buttons">
              <button type="button" className="wh-btn" onClick={handleCalc}>
                計算
              </button>
              <button type="button" className="wh-btn" onClick={handleClear}>
                クリア
              </button>
            </div>
          </div>
          <p className="wh-note">
            *硬度(mg/L)＝（カルシウム量(mg/L)ｘ2.5）+（マグネシウム量(mg/L)ｘ4.1）で計算
          </p>
        </div>
      </div>
    </main>
  );
}
