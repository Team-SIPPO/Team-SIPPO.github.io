import { Link } from 'react-router-dom';
import { PageIntro } from '../components/molecules/PageIntro';

export function NotFoundPage() {
  return (
    <main className="page-main">
      <PageIntro eyebrow="404" title="Page not found" align="center" />
      <div className="notfound">
        <Link className="text-link" to="/">
          back home
        </Link>
      </div>
    </main>
  );
}
