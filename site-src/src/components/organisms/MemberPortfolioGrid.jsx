import { PortfolioTile } from '../molecules/PortfolioTile';

export function MemberPortfolioGrid({ member }) {
  return (
    <section className="member-portfolio-section" aria-labelledby="member-portfolio-title">
      <h2 id="member-portfolio-title" className="member-section-title">
        portfolio
      </h2>

      <div className="member-portfolio-grid">
        {member.portfolio.map((item, index) => (
          <PortfolioTile key={`${member.slug}-${index}`} item={item} />
        ))}
      </div>
    </section>
  );
}
