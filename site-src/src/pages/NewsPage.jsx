import { PageIntro } from '../components/molecules/PageIntro';
import { newsItems } from '../data/news';
import { NewsBoard } from '../components/organisms/NewsBoard';

export function NewsPage() {
  return (
    <main className="page-main">
      <PageIntro title="What's new" align="center" />
      <NewsBoard items={newsItems} />
    </main>
  );
}
