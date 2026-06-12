import { PortfolioTile } from '../molecules/PortfolioTile';
import { TileGridSection } from './TileGridSection';

export function MemberPortfolioGrid({ member }) {
  return (
    <TileGridSection
      ariaLabelledBy="member-portfolio-title"
      title="portfolio"
      titleId="member-portfolio-title"
      titleClassName="member-section-title"
      sectionClassName="member-portfolio-section"
      gridClassName="member-portfolio-grid"
      items={member.portfolio}
      getKey={(item, index) => `${member.slug}-${index}`}
      renderItem={(item) => <PortfolioTile item={item} />}
    />
  );
}
