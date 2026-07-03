import { Link } from 'react-router-dom';

/* 荷札タグ(SVG製・画像不使用)
   - viewBox 基準で描くため、幅を変えれば文字ごと比率が追従する
   - 紐は「手前1本・奥1本」: 奥側は本体の白で隠れ、手前側だけ
     本体の縁とハトメの輪を乗り越えて穴に入る(描画順で表現)
   - 影は Activities カードと同じ黄色のオフセットソリッド影 */
export function ActivityTag({ item }) {
  return (
    <>
      <span className={`connector-line ${item.lineClassName}`} aria-hidden="true" />
      <Link className={`activity-tag ${item.className}`} to={item.to} aria-label={item.label}>
        <svg viewBox="0 0 288 96" aria-hidden="true" focusable="false">
          {/* 紐のループ(奥側): 本体の裏を通る部分は本体の白で隠れる */}
          <ellipse
            cx="50.5"
            cy="61.5"
            rx="37"
            ry="13.5"
            transform="rotate(-25 50.5 61.5)"
            fill="none"
            stroke="var(--color-ink)"
            strokeWidth="2"
          />
          {/* 荷札本体: 上下の辺は平行、先端の斜め線は上下対称 */}
          <path
            className="tag-body"
            d="M 86 8 L 285 8 L 285 84 L 86 84 L 46 46 Z"
            fill="var(--color-paper)"
            stroke="var(--color-ink)"
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
          {/* ハトメ(同心の二重丸) */}
          <circle cx="84" cy="46" r="9.5" fill="var(--color-paper)" stroke="var(--color-ink)" strokeWidth="2.2" />
          <circle cx="84" cy="46" r="4.6" fill="none" stroke="var(--color-ink)" strokeWidth="2" />
          {/* 紐(手前側の1本): 本体の縁とハトメの輪を乗り越えて穴に入る */}
          <path
            d="M 53.3 75.1 A 37 13.5 -25 0 0 84 51.1"
            fill="none"
            stroke="var(--color-ink)"
            strokeWidth="2"
          />
          {/* ラベル: 本体五角形(x:86〜285)の中央。SVG座標なので拡縮に追従する */}
          <text
            x="185.5"
            y="46"
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="19"
            fill="var(--color-ink)"
          >
            {item.label}
          </text>
        </svg>
      </Link>
    </>
  );
}
