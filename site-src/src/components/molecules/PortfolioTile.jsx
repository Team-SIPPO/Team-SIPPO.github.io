import { IconImage } from '../atoms/IconImage';
import { asset } from '../../lib/asset';

function PortfolioTileContent({ item }) {
  const title = item.title.trim() || ' ';
  const alt = item.title.trim() || item.year || '';

  return (
    <>
      <IconImage
        className="media-tile-image"
        src={asset(item.image)}
        alt={alt}
        loading="lazy"
      />
      <span className="media-tile-meta">{item.year}</span>
      <span className="media-tile-rule" aria-hidden="true" />
      <h3 className="media-tile-title">{title}</h3>
    </>
  );
}

export function PortfolioTile({ item }) {
  if (item.href) {
    return (
      <a className="media-tile" href={item.href} target="_blank" rel="noreferrer">
        <PortfolioTileContent item={item} />
      </a>
    );
  }

  return (
    <article className="media-tile">
      <PortfolioTileContent item={item} />
    </article>
  );
}
