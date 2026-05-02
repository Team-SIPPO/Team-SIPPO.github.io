import { Navigate, useLocation, useParams } from 'react-router-dom';
import { MemberPortfolioGrid } from '../components/organisms/MemberPortfolioGrid';
import { MemberProfileSection } from '../components/organisms/MemberProfileSection';
import { membersBySlug } from '../data/members';
import { NotFoundPage } from './NotFoundPage';

const LEGACY_PORTFOLIO_PAGE_PARAM = 'comp-laj8m8r7_page';

export function MemberDetailPage() {
  const { memberSlug = '' } = useParams();
  const location = useLocation();
  const member = membersBySlug[memberSlug];

  if (!member) {
    return <NotFoundPage />;
  }

  if (new URLSearchParams(location.search).has(LEGACY_PORTFOLIO_PAGE_PARAM)) {
    return <Navigate replace to={`/members/${memberSlug}`} />;
  }

  return (
    <main className="member-main">
      <MemberProfileSection member={member} />
      <MemberPortfolioGrid member={member} />
    </main>
  );
}
