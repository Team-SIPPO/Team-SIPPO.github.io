import { IconImage } from '../atoms/IconImage';

export function PageIntro({ eyebrow, title, lead, image, align = 'image' }) {
  const isCenter = align === 'center';
  const className = isCenter ? 'page-intro page-intro--center' : 'page-intro';

  return (
    <section className={className}>
      <div className="page-intro-copy">
        {eyebrow ? <p className="page-kicker">{eyebrow}</p> : null}
        <h1 className="page-title">{title}</h1>
        {lead && lead.length > 0 ? (
          <div className="page-lead">
            {lead.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        ) : null}
      </div>
      {image ? <IconImage className="page-visual" name={image} /> : null}
    </section>
  );
}
