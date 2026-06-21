import { Link } from 'react-router-dom';
import { IconImage } from '../atoms/IconImage';

function ActivityHistoryCardBody({ item }) {
  return (
    <>
      <IconImage className="media-tile-image" name={item.image} alt="" />
      <span className="media-tile-meta">{item.year}</span>
      <span className="media-tile-rule" aria-hidden="true" />
      <span className="media-tile-title">{item.title}</span>
    </>
  );
}

export function ActivityHistoryCard({ item }) {
  if (item.to) {
    return (
      <Link className="media-tile" to={item.to}>
        <ActivityHistoryCardBody item={item} />
      </Link>
    );
  }

  if (item.href) {
    return (
      <a
        className="media-tile"
        href={item.href}
        target="_blank"
        rel="noreferrer noopener"
      >
        <ActivityHistoryCardBody item={item} />
      </a>
    );
  }

  return (
    <article className="media-tile">
      <ActivityHistoryCardBody item={item} />
    </article>
  );
}
