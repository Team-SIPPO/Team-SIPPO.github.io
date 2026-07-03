/* ヒーローイラストの小物(電球・レンチ・ラップトップ・コーヒー)をSVG化した
   ミニアイコン。ink線+黄アクセントで、ヒーローと同じ視覚言語 */
import { useId } from 'react';

function BulbIcon() {
  return (
    <>
      <circle cx="24" cy="17" r="11" fill="var(--color-accent)" stroke="var(--color-ink)" strokeWidth="2.2" />
      {/* 口金: 横線は詰めて4本 */}
      <path d="M19.5 30 h9 M19.5 33 h9 M20 36 h8 M21.5 39 h5" fill="none" stroke="var(--color-ink)" strokeWidth="2" strokeLinecap="round" />
    </>
  );
}

function WrenchIcon() {
  const clipId = useId();
  return (
    <>
      <defs>
        <clipPath id={clipId}>
          <circle cx="15" cy="15" r="10.7" />
        </clipPath>
      </defs>
      {/* スパナ: 柄のink縁取り → 頭 → 柄の黄色芯を頭の中から通して一体化 */}
      <path d="M22 22 L38 38" stroke="var(--color-ink)" strokeWidth="7.5" strokeLinecap="round" />
      <circle cx="15" cy="15" r="9.5" fill="var(--color-accent)" stroke="var(--color-ink)" strokeWidth="2.2" />
      <path d="M19 19 L38 38" stroke="var(--color-accent)" strokeWidth="3.5" strokeLinecap="round" />
      {/* 口: 頭の左上の縁に六角形の切り欠きを食い込ませ、円の内側だけ見せる */}
      <g clipPath={`url(#${clipId})`}>
        <polygon
          points="12.2,12.2 6.9,13.6 3,9.7 4.4,4.4 9.7,3 13.6,6.9"
          fill="var(--color-paper)"
          stroke="var(--color-ink)"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </g>
    </>
  );
}

function LaptopIcon() {
  return (
    <>
      {/* 画面は長方形 */}
      <rect x="12" y="8" width="24" height="16" fill="var(--color-accent)" stroke="var(--color-ink)" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M12 24 L36 24 L42 33 L6 33 Z" fill="var(--color-paper)" stroke="var(--color-ink)" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M16 28 h16 M14 30.5 h20" fill="none" stroke="var(--color-ink)" strokeWidth="1.2" />
    </>
  );
}

function CupIcon() {
  return (
    <>
      <path d="M17 12 q2.5 -3.5 0 -7 M27 12 q2.5 -3.5 0 -7" fill="none" stroke="var(--color-ink)" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="3 2.5" />
      <path d="M10 17 H34 V29 Q34 38 25 38 H19 Q10 38 10 29 Z" fill="var(--color-accent)" stroke="var(--color-ink)" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M34 20 Q42 20 42 25.5 Q42 31 34 31" fill="none" stroke="var(--color-ink)" strokeWidth="2.2" />
    </>
  );
}

const icons = {
  bulb: BulbIcon,
  wrench: WrenchIcon,
  laptop: LaptopIcon,
  cup: CupIcon,
};

export function ActivityIcon({ name, className }) {
  const Icon = icons[name];
  if (!Icon) return null;

  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" focusable="false">
      <Icon />
    </svg>
  );
}
