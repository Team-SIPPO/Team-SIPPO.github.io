import { IconImage } from '../atoms/IconImage';

function NewsTileContent({ item }) {
  return (
    <>
      {item.image ? (
        <IconImage className="media-tile-image" name={item.image} />
      ) : (
        <span className="media-tile-image" aria-hidden="true" />
      )}
      <time className="media-tile-meta">{item.date}</time>
      <span className="media-tile-rule" aria-hidden="true" />
      <h2 className="media-tile-title" title={item.fullTitle}>
        {item.title}
      </h2>
    </>
  );
}

export function NewsTile({ item }) {
  if (!item.href) {
    return (
      <article className="media-tile" aria-label={item.fullTitle}>
        <NewsTileContent item={item} />
      </article>
    );
  }

  return (
    <a
      className="media-tile"
      href={item.href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={item.fullTitle}
    >
      <NewsTileContent item={item} />
    </a>
  );
}
