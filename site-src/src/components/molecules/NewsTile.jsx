import { IconImage } from '../atoms/IconImage';
import { MediaTile } from './MediaTile';

const NEW_BADGE_DAYS = 60;

function isRecent(dateText) {
  // date は "YY/M/D" 形式
  const [year, month, day] = (dateText ?? '').split('/').map(Number);
  if (!year || !month || !day) return false;
  const published = new Date(2000 + year, month - 1, day);
  const ageDays = (Date.now() - published.getTime()) / (1000 * 60 * 60 * 24);
  return ageDays >= 0 && ageDays <= NEW_BADGE_DAYS;
}

export function NewsTile({ item }) {
  return (
    <MediaTile href={item.href} ariaLabel={item.fullTitle}>
      {isRecent(item.date) && <span className="news-badge">NEW</span>}
      {item.image ? (
        <IconImage className="media-tile-image" name={item.image} />
      ) : (
        <span className="media-tile-image" aria-hidden="true" />
      )}
      <time className="media-tile-meta">{item.date}</time>
      <h2 className="media-tile-title" title={item.fullTitle}>
        {item.title}
      </h2>
    </MediaTile>
  );
}
