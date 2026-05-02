import { NewsTile } from '../molecules/NewsTile';

export function NewsBoard({ items }) {
  return (
    <section className="news-board" aria-label="お知らせ">
      {items.map((item) => (
        <NewsTile key={item.id} item={item} />
      ))}
    </section>
  );
}
