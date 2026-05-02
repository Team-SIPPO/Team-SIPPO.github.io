import { IconImage } from '../atoms/IconImage';

export function ContactLink({ item }) {
  return (
    <a className="contact-link" href={item.href} target="_blank" rel="noreferrer noopener">
      <IconImage name={item.image} />
      <span>{item.label}</span>
    </a>
  );
}
