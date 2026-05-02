import { IconImage } from '../atoms/IconImage';
import { wixMediaAsset } from '../../lib/wixMedia';

function PortfolioTileContent({ item }) {
  const title = item.title.trim() || ' ';
  const alt = item.title.trim() || item.year || '';

  return (
    <>
      <IconImage className="portfolio-thumb" src={wixMediaAsset(item.image)} alt={alt} loading="lazy" />
      <span className="portfolio-year">{item.year}</span>
      <span className="portfolio-rule" aria-hidden="true" />
      <h3>{title}</h3>
    </>
  );
}

export function PortfolioTile({ item }) {
  if (item.href) {
    return (
      <a className="portfolio-tile" href={item.href} target="_blank" rel="noreferrer">
        <PortfolioTileContent item={item} />
      </a>
    );
  }

  return (
    <article className="portfolio-tile is-static">
      <PortfolioTileContent item={item} />
    </article>
  );
}
