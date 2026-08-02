import { socialLinks } from '../../data/socialLinks';
import { IconImage } from '../atoms/IconImage';

export function Footer() {
  return (
    <footer className="border-t border-ink bg-white">
      <ul className="mx-auto flex h-[88px] items-center justify-center gap-[20px] px-page-x" aria-label="SNS バー">
        {socialLinks.map((item) => (
          <li key={item.label}>
            <a className="social-link" href={item.href} target="_blank" rel="noreferrer noopener" aria-label={item.label}>
              <IconImage name={item.image} />
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
}
