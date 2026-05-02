import { ActivityHistoryGrid } from '../components/organisms/ActivityHistoryGrid';

export function ActivityPage({ page }) {
  return (
    <main className="activity-main">
      <h1 className="activity-page-title">{page.title}</h1>
      <div className="activity-lead">
        {page.leadGroups.map((group, index) => (
          <div key={index} className="activity-lead-group">
            {group.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        ))}
      </div>
      <ActivityHistoryGrid title={page.title} items={page.items} />
    </main>
  );
}
