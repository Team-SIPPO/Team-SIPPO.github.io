import { useId, useState } from 'react';
import { PageIntro } from '../components/molecules/PageIntro';

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

/* 横倒しのペットボトル(SVG製・画像不使用)。
   線はink・水はグレー階調・キャップだけ黄色のアクセント(4色ルール)。
   flip でキャップが右端になる(左に置いて中央へ注ぐボトル用) */
function BottleArt({ flip = false }) {
  const clipId = useId();
  return (
    <svg viewBox="0 0 420 120" aria-hidden="true" focusable="false">
      <defs>
        <clipPath id={clipId}>
          <path d="M 32 50 L 50 44 Q 66 10 100 10 L 384 10 Q 410 10 410 35 L 410 85 Q 410 110 384 110 L 100 110 Q 66 110 50 76 L 32 70 Z" />
        </clipPath>
      </defs>
      <g transform={flip ? 'scale(-1 1) translate(-420 0)' : undefined}>
        {/* 水(グレー階調) */}
        <rect x="30" y="58" width="382" height="54" fill="#e3e3e3" clipPath={`url(#${clipId})`} />
        {/* ボトル本体 */}
        <path
          d="M 32 50 L 50 44 Q 66 10 100 10 L 384 10 Q 410 10 410 35 L 410 85 Q 410 110 384 110 L 100 110 Q 66 110 50 76 L 32 70 Z"
          fill="none"
          stroke="var(--color-ink)"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
        {/* ボトルのリブ */}
        <path d="M 372 14 V 106 M 380 14 V 106" fill="none" stroke="#c7c7c7" strokeWidth="1.5" />
        {/* キャップ(黄色のアクセント)。注いでいる想定なので開栓済みの体 */}
        <rect x="8" y="46" width="24" height="28" rx="3" fill="var(--color-accent)" stroke="var(--color-ink)" strokeWidth="2.2" />
        <path d="M 15 46 V 74 M 22 46 V 74" fill="none" stroke="var(--color-ink)" strokeWidth="1.2" />
      </g>
    </svg>
  );
}

/* ピッチャー(SVG製・注ぎ口なしの丸角容器) */
function PitcherArt() {
  const clipId = useId();
  return (
    <svg viewBox="0 0 300 240" aria-hidden="true" focusable="false">
      <defs>
        <clipPath id={clipId}>
          <path d="M 56 40 L 224 40 Q 240 40 240 56 L 240 204 Q 240 222 222 222 L 58 222 Q 40 222 40 204 L 40 56 Q 40 40 56 40 Z" />
        </clipPath>
      </defs>
      <rect x="22" y="110" width="220" height="114" fill="#e3e3e3" clipPath={`url(#${clipId})`} />
      <path
        d="M 56 40 L 224 40 Q 240 40 240 56 L 240 204 Q 240 222 222 222 L 58 222 Q 40 222 40 204 L 40 56 Q 40 40 56 40 Z"
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      {/* 取っ手は二重線 */}
      <path
        d="M 240 72 Q 292 72 292 130 Q 292 188 240 188"
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth="2.4"
      />
      <path
        d="M 240 84 Q 279 84 279 130 Q 279 176 240 176"
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth="2.4"
      />
    </svg>
  );
}

/* クラス名はリテラルで持つ(テンプレート文字列で組むと Tailwind の
   未使用クラス削除に引っかかり、ビルドCSSから消える) */
const bottleClassNames = {
  a: 'whx-bottle whx-bottle--a',
  b: 'whx-bottle whx-bottle--b',
};

const resultClassNames = {
  a: 'whx-result whx-result--a',
  b: 'whx-result whx-result--b',
};

function Bottle({ variant, values, fields, onChange }) {
  const [calField, mgField] = fields;
  return (
    <div className={bottleClassNames[variant]}>
      <BottleArt flip={variant === 'a'} />
      {/* 「実物のボトルの成分表示を写せばいい」を一言で伝えるラベル */}
      <span className="whx-chip">成分表示</span>
      <input
        type="number"
        min="0"
        step="0.01"
        className="whx-input whx-bottle-cal"
        placeholder="カルシウム 例:80"
        value={values[calField]}
        onChange={(e) => onChange(calField, e.target.value)}
      />
      <span className="whx-unit whx-bottle-cal-unit">mg/L</span>
      <input
        type="number"
        min="0"
        step="0.01"
        className="whx-input whx-bottle-mg"
        placeholder="マグネシウム 例:26"
        value={values[mgField]}
        onChange={(e) => onChange(mgField, e.target.value)}
      />
      <span className="whx-unit whx-bottle-mg-unit">mg/L</span>
    </div>
  );
}

function BottleResult({ variant, result }) {
  return (
    <div className={resultClassNames[variant]} aria-live="polite">
      {result && (
        <>
          <span className="whx-result-hardness">硬度 {result.hardness} mg/L</span>
          {result.amount !== null && (
            <span className="whx-result-line">
              <span className="whx-pill">{result.amount}</span>
              {result.amount !== 'エラー' && <span className="whx-result-unit">ml</span>}
            </span>
          )}
        </>
      )}
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
    <main className="page-main">
      <PageIntro
        eyebrow="水の硬度にこだわるコーヒーマニアへ"
        title="ざっくり水硬度計算機"
        align="center"
      />

      {/* 使い方は文章でなく3ステップで */}
      <ol className="whx-steps">
        <li>2本のボトルの成分表示を写す</li>
        <li>作りたい量と硬度を入れる</li>
        <li>計算!</li>
      </ol>

      {/* 2本のボトルがピッチャーへ注いでいる構図 */}
      <div className="whx-stage">
        <svg className="whx-streams" viewBox="0 0 820 640" aria-hidden="true" focusable="false">
          {/* ボトルの口から出て、すぐ重力で垂直に落ち、水面の色に溶けて消える */}
          <path
            d="M 351 96 C 374 118 384 180 385 260 C 386 360 381 460 378 528"
            fill="none"
            stroke="#e3e3e3"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <path
            d="M 469 294 C 448 300 434 330 429 390 C 426 440 428 490 431 528"
            fill="none"
            stroke="#e3e3e3"
            strokeWidth="12"
            strokeLinecap="round"
          />
          {/* 着水の粒 */}
          <circle cx="366" cy="512" r="3.5" fill="#e3e3e3" />
          <circle cx="392" cy="506" r="2.8" fill="#e3e3e3" />
          <circle cx="443" cy="510" r="3.2" fill="#e3e3e3" />
        </svg>

        <Bottle variant="a" values={inputs} fields={['cal1', 'mg1']} onChange={handleChange} />
        <BottleResult variant="a" result={results?.bottle1} />

        <Bottle variant="b" values={inputs} fields={['cal2', 'mg2']} onChange={handleChange} />
        <BottleResult variant="b" result={results?.bottle2} />

        <div className="whx-pitcher">
          <PitcherArt />
          <span className="whx-chip">作りたい水</span>
          <input
            type="number"
            min="0"
            className="whx-input whx-pitcher-amount"
            placeholder="量 例:500"
            value={inputs.totalAmount}
            onChange={(e) => handleChange('totalAmount', e.target.value)}
          />
          <span className="whx-unit whx-pitcher-amount-unit">ml</span>
          <input
            type="number"
            min="0"
            className="whx-input whx-pitcher-hardness"
            placeholder="硬度 例:100"
            value={inputs.totalHardness}
            onChange={(e) => handleChange('totalHardness', e.target.value)}
          />
          <span className="whx-unit whx-pitcher-hardness-unit">mg/L</span>
        </div>
      </div>

      <div className="whx-buttons">
        <button type="button" className="cta-button" onClick={handleCalc}>
          計算
        </button>
        <button type="button" className="whx-clear" onClick={handleClear}>
          クリア
        </button>
      </div>

      <p className="whx-note">
        *硬度(mg/L)＝（カルシウム量(mg/L)ｘ2.5）+（マグネシウム量(mg/L)ｘ4.1）で計算
      </p>
    </main>
  );
}
