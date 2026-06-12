import { ActivityHistoryCard } from '../molecules/ActivityHistoryCard';
import { TileGridSection } from './TileGridSection';

export function ActivityHistoryGrid({ title, items }) {
  return (
    <TileGridSection
      ariaLabel={`${title} history`}
      title="history"
      titleClassName="activity-history-title"
      sectionClassName="activity-history-section"
      gridClassName="activity-history-grid"
      items={items}
      getKey={(item) => `${item.year}-${item.title}`}
      renderItem={(item) => <ActivityHistoryCard item={item} />}
    />
  );
}
