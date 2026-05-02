import { socialLinks } from '../../data/socialLinks';
import { ContactLink } from '../molecules/ContactLink';

export function ContactLinks() {
  return (
    <section className="social-grid" aria-label="連絡先">
      {socialLinks.map((item) => (
        <ContactLink key={item.label} item={item} />
      ))}
    </section>
  );
}
