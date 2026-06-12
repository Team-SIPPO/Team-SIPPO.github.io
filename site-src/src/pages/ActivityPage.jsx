import { PageIntro } from '../components/molecules/PageIntro';
import { ActivityHistoryGrid } from '../components/organisms/ActivityHistoryGrid';

export function ActivityPage({ page }) {
  const leadLines = page.leadGroups.flat();

  return (
    <main className="page-main">
      <PageIntro title={page.title} lead={leadLines} align="center" />
      <ActivityHistoryGrid title={page.title} items={page.items} />
    </main>
  );
}
