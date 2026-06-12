import { Link } from 'react-router-dom';
import { wixMediaAsset } from '../../lib/wixMedia';
import { IconImage } from '../atoms/IconImage';

export function MemberCard({ member }) {
  return (
    <Link className="media-tile member-card" to={`/members/${member.slug}`}>
      <IconImage
        className="media-tile-image member-photo"
        src={wixMediaAsset(member.image)}
        alt={member.name}
        loading="lazy"
      />
      <h2 className="media-tile-meta member-card-title">{member.name}</h2>
      <span className="media-tile-rule member-card-rule" aria-hidden="true" />
      <p className="media-tile-title member-card-role">{member.role}</p>
    </Link>
  );
}
