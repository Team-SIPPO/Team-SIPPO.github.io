import { IconImage } from '../atoms/IconImage';
import { MediaTile } from './MediaTile';

export function ActivityHistoryCard({ item }) {
  return (
    <MediaTile to={item.to} href={item.href}>
      <IconImage className="media-tile-image" name={item.image} alt="" />
      <span className="media-tile-meta">{item.year}</span>
      <span className="media-tile-title">{item.title}</span>
    </MediaTile>
  );
}
