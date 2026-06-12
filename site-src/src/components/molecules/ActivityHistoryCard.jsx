import { Link } from 'react-router-dom';
import { IconImage } from '../atoms/IconImage';

function ActivityHistoryCardBody({ item }) {
  return (
    <>
      <IconImage className="media-tile-image activity-history-image" name={item.image} alt="" />
      <span className="media-tile-meta activity-history-year">{item.year}</span>
      <span className="media-tile-rule activity-history-rule" aria-hidden="true" />
      <span className="media-tile-title activity-history-name">{item.title}</span>
    </>
  );
}

export function ActivityHistoryCard({ item }) {
  if (item.to) {
    return (
      <Link className="media-tile activity-history-card" to={item.to}>
        <ActivityHistoryCardBody item={item} />
      </Link>
    );
  }

  if (item.href) {
    return (
      <a
        className="media-tile activity-history-card"
        href={item.href}
        target="_blank"
        rel="noreferrer noopener"
      >
        <ActivityHistoryCardBody item={item} />
      </a>
    );
  }

  return (
    <article className="media-tile activity-history-card">
      <ActivityHistoryCardBody item={item} />
    </article>
  );
}
