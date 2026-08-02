import { useParams } from 'react-router';
import { MemberPortfolioGrid } from '../components/organisms/MemberPortfolioGrid';
import { MemberProfileSection } from '../components/organisms/MemberProfileSection';
import { membersBySlug } from '../data/members';
import { NotFoundPage } from './NotFoundPage';

export function MemberDetailPage() {
  const { memberSlug = '' } = useParams();
  const member = membersBySlug[memberSlug];

  if (!member) {
    return <NotFoundPage />;
  }

  return (
    <main className="member-main">
      <MemberProfileSection member={member} />
      <MemberPortfolioGrid member={member} />
    </main>
  );
}
