import { Link } from 'react-router';
import { asset } from '../../lib/asset';

/* 活動ページのヒーローイラスト + クリックできるホットスポット
   - 絵は <img>(SVG)で読み込み、ホットスポットは同じ箱に % 配置で重ねる。
     座標はイラストの viewBox 単位で data に書き、ここで % に変換するので、
     どの画面幅でも絵とリンク位置がずれない
   - スマホ(〜767px)では絵を最低 720px 幅に保ったまま横を切り抜き、
     focusX(0〜1)の位置が画面中央に来るようにする(index.css .activity-hero-*) */
export function ActivityHero({ hero }) {
  const { image, alt, width, height, focusX = 0.5, spots = [] } = hero;
  const pct = (value, total) => `${(value / total) * 100}%`;

  return (
    <section className="activity-hero">
      <div className="activity-hero-frame">
        <div
          className="activity-hero-stage"
          style={{ aspectRatio: `${width} / ${height}`, '--hero-focus-x': focusX }}
        >
          <img
            className="activity-hero-image"
            src={asset(image)}
            alt={alt}
            width={width}
            height={height}
            decoding="async"
            fetchPriority="high"
          />
          {spots.map((spot) => (
            <Link
              key={spot.to}
              className="activity-hero-spot"
              to={spot.to}
              aria-label={spot.label}
              style={{
                left: pct(spot.cx - spot.r, width),
                top: pct(spot.cy - spot.r, height),
                width: pct(spot.r * 2, width),
                height: pct(spot.r * 2, height),
              }}
            >
              <span className="activity-hero-spot-label" aria-hidden="true">
                {spot.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
