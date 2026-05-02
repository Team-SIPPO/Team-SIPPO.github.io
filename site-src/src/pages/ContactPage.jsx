import { PageIntro } from '../components/molecules/PageIntro';
import { ContactLinks } from '../components/organisms/ContactLinks';

export function ContactPage() {
  return (
    <main className="page-main">
      <PageIntro
        eyebrow="Contact us"
        title="Hello, Techreate"
        lead={['活動や制作についての連絡は、各SNSからどうぞ。']}
        image="logo.png"
      />
      <ContactLinks />
    </main>
  );
}
