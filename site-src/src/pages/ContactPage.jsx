import { PageIntro } from '../components/molecules/PageIntro';
import { ContactForm } from '../components/organisms/ContactForm';

export function ContactPage() {
  return (
    <main className="page-main">
      <PageIntro
        eyebrow="Contact us"
        title="Hello, Techreate"
        lead={['ご質問やご協力のご提案など、お気軽にお問い合わせください。']}
        align="center"
      />
      <ContactForm />
    </main>
  );
}
