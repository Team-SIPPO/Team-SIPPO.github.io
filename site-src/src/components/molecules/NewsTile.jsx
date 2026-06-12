import { IconImage } from '../atoms/IconImage';

function NewsTileContent({ item }) {
  return (
    <>
      {item.image ? (
        <IconImage className="media-tile-image news-thumb" name={item.image} />
      ) : (
        <span className="media-tile-image news-thumb news-thumb-empty" aria-hidden="true" />
      )}
      <time className="media-tile-meta news-meta">{item.date}</time>
      <span className="media-tile-rule news-rule" aria-hidden="true" />
      <h2 className="media-tile-title news-title" title={item.fullTitle}>
        {item.title}
      </h2>
    </>
  );
}

export function NewsTile({ item }) {
  if (!item.href) {
    return (
      <article className="media-tile news-tile" aria-label={item.fullTitle}>
        <NewsTileContent item={item} />
      </article>
    );
  }

  return (
    <a
      className="media-tile news-tile"
      href={item.href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={item.fullTitle}
    >
      <NewsTileContent item={item} />
    </a>
  );
}
