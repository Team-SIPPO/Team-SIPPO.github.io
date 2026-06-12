import { NewsTile } from '../molecules/NewsTile';
import { TileGridSection } from './TileGridSection';

export function NewsBoard({ items }) {
  return (
    <TileGridSection
      ariaLabel="お知らせ"
      sectionClassName="news-section"
      gridClassName="news-board"
      items={items}
      getKey={(item) => item.id}
      renderItem={(item) => <NewsTile item={item} />}
    />
  );
}
