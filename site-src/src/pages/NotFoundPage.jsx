import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <main className="page-main">
      <section className="notfound">
        <p className="page-kicker">404</p>
        <h1 className="page-title">Page not found</h1>
        <Link className="text-link" to="/">
          back home
        </Link>
      </section>
    </main>
  );
}
