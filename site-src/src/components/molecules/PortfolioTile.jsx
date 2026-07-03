import { IconImage } from '../atoms/IconImage';
import { asset } from '../../lib/asset';
import { MediaTile } from './MediaTile';

export function PortfolioTile({ item }) {
  const title = item.title.trim() || ' ';
  const alt = item.title.trim() || item.year || '';

  return (
    <MediaTile href={item.href}>
      <IconImage className="media-tile-image" src={asset(item.image)} alt={alt} loading="lazy" />
      <span className="media-tile-meta">{item.year}</span>
      <h3 className="media-tile-title">{title}</h3>
    </MediaTile>
  );
}
