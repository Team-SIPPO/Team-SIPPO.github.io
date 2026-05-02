import { IconImage } from '../atoms/IconImage';

function NewsTileContent({ item }) {
  return (
    <>
      {item.image ? <IconImage className="news-thumb" name={item.image} /> : <span className="news-thumb news-thumb-empty" aria-hidden="true" />}
      <time>{item.date}</time>
      <span className="news-rule" aria-hidden="true" />
      <h2 title={item.fullTitle}>{item.title}</h2>
    </>
  );
}

export function NewsTile({ item }) {
  if (!item.href) {
    return (
      <article className="news-tile" aria-label={item.fullTitle}>
        <NewsTileContent item={item} />
      </article>
    );
  }

  return (
    <a className="news-tile" href={item.href} target="_blank" rel="noreferrer noopener" aria-label={item.fullTitle}>
      <NewsTileContent item={item} />
    </a>
  );
}
