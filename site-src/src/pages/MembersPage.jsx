import { PageIntro } from '../components/molecules/PageIntro';
import { MembersGrid } from '../components/organisms/MembersGrid';

export function MembersPage() {
  return (
    <main className="page-main members-page">
      <PageIntro title="Members" align="center" />
      <MembersGrid />
    </main>
  );
}
