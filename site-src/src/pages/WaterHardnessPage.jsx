import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { PageIntro } from '../components/molecules/PageIntro';
import { asset } from '../lib/asset';

/* 操作のしくみ
   - 2本の水のCa・Mgと「作る量」は必須
   - スライダーは「硬度の物差し」: 左端=水Aの硬度、右端=水Bの硬度。
     つまみの位置がそのまま、できあがりの硬度になる(Aに寄せるほどAが多い)
   - 目標硬度の欄はスライダーと同じ値の別表現。どちらを動かしても、もう一方が追従する
   - 計算はリアルタイム(ボタンなし) */

const SLIDER_STEPS = 1000;

const emptyInputs = {
  caA: '',
  mgA: '',
  caB: '',
  mgB: '',
  total: '',
};

// 硬度(mg/L) = Ca × 2.5 + Mg × 4.1
function calcHardness(ca, mg) {
  return ca * 2.5 + mg * 4.1;
}

// 空欄・負の値・数値以外は null
function parseAmount(value) {
  if (value === '' || value === null) return null;
  const n = Number(value);
  return Number.isFinite(n) && n >= 0 ? n : null;
}

const clamp01 = (v) => Math.min(1, Math.max(0, v));

/* イラストのSVGは design/illustrations/water-hardness/ で生成・Illustratorで編集する。
   クラス名はリテラルで持つ(テンプレート文字列で組むと Tailwind の
   未使用クラス削除に引っかかり、ビルドCSSから消える) */
const bottleClassNames = {
  a: 'whx-bottle whx-bottle--a',
  b: 'whx-bottle whx-bottle--b',
};

function Bottle({ variant, label, ca, mg, hardness, onChange }) {
  const prefix = variant === 'a' ? 'A' : 'B';
  return (
    <figure className={bottleClassNames[variant]}>
      <div className="whx-bottle-art">
        <img src={asset('whx/bottle.svg')} alt="" width="212" height="280" />
        {/* 成分表示タグ(タグの絵と同じ角度で重ねる) */}
        <fieldset className="whx-tag">
          <legend className="whx-visually-hidden">水{prefix}の成分表示</legend>
          <label className="whx-tag-row">
            <span className="whx-tag-key">Ca</span>
            <input
              type="number"
              inputMode="decimal"
              min="0"
              step="any"
              required
              aria-required="true"
              aria-label={`水${prefix}のカルシウム(mg/L)`}
              className="whx-tag-input"
              value={ca}
              onChange={(e) => onChange(`ca${prefix}`, e.target.value)}
            />
          </label>
          <label className="whx-tag-row">
            <span className="whx-tag-key">Mg</span>
            <input
              type="number"
              inputMode="decimal"
              min="0"
              step="any"
              required
              aria-required="true"
              aria-label={`水${prefix}のマグネシウム(mg/L)`}
              className="whx-tag-input"
              value={mg}
              onChange={(e) => onChange(`mg${prefix}`, e.target.value)}
            />
          </label>
          <span className="whx-tag-unit">mg/L</span>
        </fieldset>
      </div>
      <figcaption className="whx-bottle-caption">
        <span className="whx-bottle-name">{label}</span>
        <span className="whx-bottle-hardness">
          硬度 {hardness === null ? '—' : Math.round(hardness)}
        </span>
      </figcaption>
    </figure>
  );
}

export function WaterHardnessPage() {
  const [inputs, setInputs] = useState(emptyInputs);
  // 水Bの割合(0〜1)。スライダー位置の正
  const [ratioB, setRatioB] = useState(0.5);
  // 目標硬度を手入力している間だけ文字列を持つ(null の間は計算値を表示)
  const [targetDraft, setTargetDraft] = useState(null);

  const caA = parseAmount(inputs.caA);
  const mgA = parseAmount(inputs.mgA);
  const caB = parseAmount(inputs.caB);
  const mgB = parseAmount(inputs.mgB);
  const total = parseAmount(inputs.total);

  const hardA = caA !== null && mgA !== null ? calcHardness(caA, mgA) : null;
  const hardB = caB !== null && mgB !== null ? calcHardness(caB, mgB) : null;
  const ready = hardA !== null && hardB !== null;
  const sameHardness = ready && Math.abs(hardA - hardB) < 1e-9;
  const sliderEnabled = ready && !sameHardness;

  const mixed = ready ? hardA + (hardB - hardA) * ratioB : null;
  const percentA = Math.round((1 - ratioB) * 100);
  const percentB = 100 - percentA;

  const amountA = ready && total ? Math.round(total * (1 - ratioB)) : null;
  const amountB = amountA !== null ? Math.round(total) - amountA : null;
  // ml を丸めたあとの実際の硬度
  const actual =
    amountA !== null && total > 0 ? (hardA * amountA + hardB * amountB) / (amountA + amountB) : null;

  const minHard = ready ? Math.min(hardA, hardB) : null;
  const maxHard = ready ? Math.max(hardA, hardB) : null;

  // 目標硬度の手入力が範囲外かどうか
  const draftValue = targetDraft === null ? null : parseAmount(targetDraft);
  const targetOutOfRange =
    sliderEnabled && draftValue !== null && (draftValue < minHard - 0.5 || draftValue > maxHard + 0.5);

  function handleChange(field, value) {
    setInputs((prev) => ({ ...prev, [field]: value }));
  }

  function handleSlider(e) {
    setTargetDraft(null);
    setRatioB(Number(e.target.value) / SLIDER_STEPS);
  }

  function handleTargetChange(e) {
    const text = e.target.value;
    setTargetDraft(text);
    const t = parseAmount(text);
    if (!sliderEnabled || t === null) return;
    if (t >= minHard - 0.5 && t <= maxHard + 0.5) {
      setRatioB(clamp01((t - hardA) / (hardB - hardA)));
    }
  }

  // 入力を離れたら、範囲外の値は近いほうの端に寄せて表示を計算値に戻す
  function handleTargetBlur() {
    const t = parseAmount(targetDraft ?? '');
    if (sliderEnabled && t !== null) {
      setRatioB(clamp01((t - hardA) / (hardB - hardA)));
    }
    setTargetDraft(null);
  }

  // 未入力の必須項目
  const missing = [];
  if (hardA === null) missing.push('水AのCa・Mg');
  if (hardB === null) missing.push('水BのCa・Mg');
  if (!total) missing.push('作る量');

  let status = null;
  if (missing.length > 0) {
    status = `${missing.join('、')}を入れると計算します`;
  } else if (sameHardness) {
    status = '2本の硬度が同じなので、混ぜても硬度は変わりません';
  } else if (targetOutOfRange) {
    status = `この2本では ${Math.round(minHard)}〜${Math.round(maxHard)} mg/L の間で作れます`;
  }

  /* つまみ → ピッチャーの口 を結ぶ線。レイアウトが変わっても追従するよう実測する */
  const stageRef = useRef(null);
  const sliderRef = useRef(null);
  const pitcherRef = useRef(null);
  const [connector, setConnector] = useState(null);

  const measure = useCallback(() => {
    const stage = stageRef.current;
    const slider = sliderRef.current;
    const pitcher = pitcherRef.current;
    if (!stage || !slider || !pitcher) return;
    const s = stage.getBoundingClientRect();
    const r = slider.getBoundingClientRect();
    const p = pitcher.getBoundingClientRect();
    const thumb = 34; // つまみの直径(CSSの --whx-thumb と同じ)
    const x1 = r.left - s.left + thumb / 2 + (r.width - thumb) * ratioB;
    const y1 = r.top - s.top + r.height / 2 + thumb / 2;
    // 口の中心: pitcher.svg(260x186)の x=120, y=10
    const x2 = p.left - s.left + p.width * (120 / 260);
    const y2 = p.top - s.top + p.height * (10 / 186);
    setConnector({ x1, y1, x2, y2, w: s.width, h: s.height });
  }, [ratioB]);

  useLayoutEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    const ro = new ResizeObserver(() => measure());
    if (stageRef.current) ro.observe(stageRef.current);
    return () => ro.disconnect();
  }, [measure]);

  const targetDisplay =
    targetDraft !== null ? targetDraft : mixed === null ? '' : String(Math.round(mixed));

  return (
    <main className="page-main page-main--whx">
      <PageIntro eyebrow="水の硬度にこだわるコーヒーマニアへ" title="ざっくり水硬度計算機" align="center" />

      <div className="whx-stage" ref={stageRef}>
        {connector && sliderEnabled && (
          <svg
            className="whx-connector"
            viewBox={`0 0 ${connector.w} ${connector.h}`}
            aria-hidden="true"
            focusable="false"
          >
            <line
              x1={connector.x1}
              y1={connector.y1}
              x2={connector.x2}
              y2={connector.y2}
              stroke="var(--color-ink)"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        )}

        {/* 1段目: 水A ─ 混ぜる割合 ─ 水B */}
        <div className="whx-mix">
          <Bottle
            variant="a"
            label="水 A"
            ca={inputs.caA}
            mg={inputs.mgA}
            hardness={hardA}
            onChange={handleChange}
          />

          <div className="whx-ratio">
            <label className="whx-ratio-title" htmlFor="whx-ratio">
              混ぜる割合
            </label>
            <p className="whx-ratio-hint">
              {sliderEnabled ? 'つまみを寄せたほうの水が多くなります' : 'タグにCa・Mgを入れると動かせます'}
            </p>
            <div className="whx-track">
              <input
                id="whx-ratio"
                ref={sliderRef}
                type="range"
                min="0"
                max={SLIDER_STEPS}
                step="1"
                value={Math.round(ratioB * SLIDER_STEPS)}
                onChange={handleSlider}
                disabled={!sliderEnabled}
                className="whx-slider"
                aria-valuetext={
                  sliderEnabled
                    ? `水A ${percentA}%、水B ${percentB}%、硬度 ${Math.round(mixed)} mg/L`
                    : 'Ca・Mgを入れると動かせます'
                }
              />
            </div>
            <div className="whx-ratio-labels" aria-hidden="true">
              <span>
                A <b>{sliderEnabled ? percentA : '—'}</b>%
              </span>
              <span>
                B <b>{sliderEnabled ? percentB : '—'}</b>%
              </span>
            </div>
          </div>

          <Bottle
            variant="b"
            label="水 B"
            ca={inputs.caB}
            mg={inputs.mgB}
            hardness={hardB}
            onChange={handleChange}
          />
        </div>

        {/* 2段目: 入力 ─ ピッチャー ─ 結果 */}
        <div className="whx-make">
          <div className="whx-fields">
            <label className="whx-field">
              <span className="whx-field-label">作る量</span>
              <input
                type="number"
                inputMode="numeric"
                min="1"
                step="1"
                required
                aria-required="true"
                className="whx-field-input"
                placeholder="例 500"
                value={inputs.total}
                onChange={(e) => handleChange('total', e.target.value)}
              />
              <span className="whx-field-unit">ml</span>
            </label>
            <label className="whx-field">
              <span className="whx-field-label">目標硬度</span>
              <input
                type="number"
                inputMode="numeric"
                min="0"
                step="1"
                className="whx-field-input"
                placeholder="—"
                value={targetDisplay}
                disabled={!sliderEnabled}
                aria-invalid={targetOutOfRange || undefined}
                onChange={handleTargetChange}
                onBlur={handleTargetBlur}
              />
              <span className="whx-field-unit">mg/L</span>
            </label>
            {sliderEnabled && (
              <p className="whx-field-range">
                {Math.round(minHard)}〜{Math.round(maxHard)} mg/L で作れます
              </p>
            )}
          </div>

          <img
            ref={pitcherRef}
            className="whx-pitcher"
            src={asset('whx/pitcher.svg')}
            alt=""
            width="260"
            height="186"
            onLoad={measure}
          />

          <div className="whx-result">
            <dl className="whx-result-list" aria-live="polite">
              <div className="whx-result-row">
                <dt>Aの水</dt>
                <dd>
                  <span className="whx-result-value">{amountA ?? '—'}</span>
                  <span className="whx-result-unit">ml</span>
                </dd>
              </div>
              <div className="whx-result-row">
                <dt>Bの水</dt>
                <dd>
                  <span className="whx-result-value">{amountB ?? '—'}</span>
                  <span className="whx-result-unit">ml</span>
                </dd>
              </div>
            </dl>
            <img className="whx-bean" src={asset('whx/bean.svg')} alt="" width="40" height="48" />
            {actual !== null && (
              <p className="whx-result-actual">できあがり 約 {Math.round(actual)} mg/L</p>
            )}
          </div>
        </div>

        <p className="whx-status" role="status">
          {status}
        </p>
      </div>

      <p className="whx-note">
        *硬度(mg/L)＝（カルシウム量(mg/L)ｘ2.5）+（マグネシウム量(mg/L)ｘ4.1）で計算
      </p>
    </main>
  );
}
