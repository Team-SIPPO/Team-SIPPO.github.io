import { members } from '../../data/members';
import { MemberCard } from '../molecules/MemberCard';

export function MembersGrid() {
  return (
    <section className="members-grid" aria-label="メンバー">
      {members.map((member) => (
        <MemberCard key={member.slug} member={member} />
      ))}
    </section>
  );
}
