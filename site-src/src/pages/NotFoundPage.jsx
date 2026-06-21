import { PageIntro } from '../components/molecules/PageIntro';
import { TextLink } from '../components/atoms/TextLink';

export function NotFoundPage() {
  return (
    <main className="page-main">
      <PageIntro eyebrow="404" title="Page not found" align="center" />
      <div className="notfound">
        <TextLink to="/">back home</TextLink>
      </div>
    </main>
  );
}
