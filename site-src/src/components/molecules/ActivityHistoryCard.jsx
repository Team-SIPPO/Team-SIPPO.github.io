import { Link } from 'react-router-dom';
import { IconImage } from '../atoms/IconImage';

function ActivityHistoryCardBody({ item }) {
  return (
    <>
      <IconImage className="activity-history-image" name={item.image} alt="" />
      <span className="activity-history-year">{item.year}</span>
      <span className="activity-history-rule" aria-hidden="true" />
      <span className="activity-history-name">{item.title}</span>
    </>
  );
}

export function ActivityHistoryCard({ item }) {
  if (item.to) {
    return (
      <Link className="activity-history-card" to={item.to}>
        <ActivityHistoryCardBody item={item} />
      </Link>
    );
  }

  if (item.href) {
    return (
      <a
        className="activity-history-card"
        href={item.href}
        target="_blank"
        rel="noreferrer noopener"
      >
        <ActivityHistoryCardBody item={item} />
      </a>
    );
  }

  return (
    <article className="activity-history-card">
      <ActivityHistoryCardBody item={item} />
    </article>
  );
}
