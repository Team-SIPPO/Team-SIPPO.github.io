import { IconImage } from '../atoms/IconImage';
import { TextLink } from '../atoms/TextLink';

export function ProjectCard({ item }) {
  return (
    <article className="project-card">
      <IconImage className="project-image" name={item.image} />
      <div className="project-body">
        <span className="project-meta">{item.year}</span>
        <h2>{item.title}</h2>
        <p>{item.text}</p>
        {item.href ? <TextLink href={item.href}>open</TextLink> : null}
      </div>
    </article>
  );
}
