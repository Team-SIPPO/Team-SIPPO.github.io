import { asset } from '../../lib/asset';
import { IconImage } from '../atoms/IconImage';
import { MediaTile } from './MediaTile';

export function MemberCard({ member }) {
  return (
    <MediaTile to={`/members/${member.slug}`} className="member-card" ariaLabel={member.name}>
      <IconImage
        className="media-tile-image member-photo"
        src={asset(member.image)}
        alt=""
        loading="lazy"
      />
      <h2 className="media-tile-meta member-card-title">{member.name}</h2>
      <p className="media-tile-title member-card-role">{member.role}</p>
    </MediaTile>
  );
}
