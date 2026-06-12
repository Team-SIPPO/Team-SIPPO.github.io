import { IconImage } from '../atoms/IconImage';
import { wixMediaAsset } from '../../lib/wixMedia';

function PortfolioTileContent({ item }) {
  const title = item.title.trim() || ' ';
  const alt = item.title.trim() || item.year || '';

  return (
    <>
      <IconImage
        className="media-tile-image portfolio-thumb"
        src={wixMediaAsset(item.image)}
        alt={alt}
        loading="lazy"
      />
      <span className="media-tile-meta portfolio-year">{item.year}</span>
      <span className="media-tile-rule portfolio-rule" aria-hidden="true" />
      <h3 className="media-tile-title portfolio-title">{title}</h3>
    </>
  );
}

export function PortfolioTile({ item }) {
  if (item.href) {
    return (
      <a className="media-tile portfolio-tile" href={item.href} target="_blank" rel="noreferrer">
        <PortfolioTileContent item={item} />
      </a>
    );
  }

  return (
    <article className="media-tile portfolio-tile is-static">
      <PortfolioTileContent item={item} />
    </article>
  );
}
