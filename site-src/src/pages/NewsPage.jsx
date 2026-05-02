import { newsItems } from '../data/news';
import { NewsBoard } from '../components/organisms/NewsBoard';

export function NewsPage() {
  return (
    <main className="news-main">
      <h1 className="news-title">What&apos;s new</h1>
      <NewsBoard items={newsItems} />
    </main>
  );
}
