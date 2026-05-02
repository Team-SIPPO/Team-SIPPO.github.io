import { Link } from 'react-router-dom';
import { wixMediaAsset } from '../../lib/wixMedia';
import { IconImage } from '../atoms/IconImage';

export function MemberCard({ member }) {
  return (
    <Link className="member-card" to={`/members/${member.slug}`}>
      <IconImage className="member-photo" src={wixMediaAsset(member.image)} alt={member.name} loading="lazy" />
      <h2>{member.name}</h2>
      <p>{member.role}</p>
    </Link>
  );
}
