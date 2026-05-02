import { ProjectCard } from '../molecules/ProjectCard';

export function ProjectGrid({ page }) {
  return (
    <section className="project-grid" aria-label={`${page.title} projects`}>
      {page.items.map((item) => (
        <ProjectCard key={`${item.year}-${item.title}`} item={item} />
      ))}
    </section>
  );
}
