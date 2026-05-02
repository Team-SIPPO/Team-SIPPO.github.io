import { ActivityHistoryCard } from '../molecules/ActivityHistoryCard';

export function ActivityHistoryGrid({ title, items }) {
  return (
    <section className="activity-history-section" aria-label={`${title} history`}>
      <h2 className="activity-history-title">history</h2>
      <div className={`activity-history-grid${items.length === 1 ? ' is-single' : ''}`}>
        {items.map((item) => (
          <ActivityHistoryCard key={`${item.year}-${item.title}`} item={item} />
        ))}
      </div>
    </section>
  );
}
