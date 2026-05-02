import { IconImage } from '../atoms/IconImage';

export function PageIntro({ eyebrow, title, lead, image }) {
  return (
    <section className="page-intro">
      <div>
        <p className="page-kicker">{eyebrow}</p>
        <h1 className="page-title">{title}</h1>
        <div className="page-lead">
          {lead.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>
      {image ? <IconImage className="page-visual" name={image} /> : null}
    </section>
  );
}
