import { members } from '../../data/members';
import { MemberCard } from '../molecules/MemberCard';
import { TileGridSection } from './TileGridSection';

export function MembersGrid() {
  return (
    <TileGridSection
      ariaLabel="メンバー"
      gridClassName="members-grid"
      items={members}
      getKey={(member) => member.slug}
      renderItem={(member) => <MemberCard member={member} />}
    />
  );
}
