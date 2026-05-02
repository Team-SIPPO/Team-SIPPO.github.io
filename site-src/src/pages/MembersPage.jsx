import { PageIntro } from '../components/molecules/PageIntro';
import { MembersGrid } from '../components/organisms/MembersGrid';

export function MembersPage() {
  return (
    <main className="page-main">
      <PageIntro
        eyebrow="Members"
        title="Team-S!PPO"
        lead={['技術者、研究者、ものづくりが好きなメンバーで活動しています。']}
        image="logo.png"
      />
      <MembersGrid />
    </main>
  );
}
