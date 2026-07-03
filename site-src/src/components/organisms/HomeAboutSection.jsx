import { Link } from 'react-router-dom';
import { aboutCopyGroups } from '../../data/aboutCopy';
import { members } from '../../data/members';
import { MemberCard } from '../molecules/MemberCard';

export function HomeAboutSection() {
  const featuredMembers = members.slice(0, 4);

  return (
    <section id="about-us" className="home-section home-about-section">
      <div className="home-section-container">
        <h2 className="home-section-title">
          <span className="section-marker">About us</span>
        </h2>

        <div className="about-copy home-about-copy">
          {aboutCopyGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="about-copy-group">
              {group.map((line, lineIndex) => (
                <p key={lineIndex}>{line}</p>
              ))}
            </div>
          ))}
        </div>

        <div className="home-members-preview">
          <div className="home-members-grid">
            {featuredMembers.map((member) => (
              <MemberCard key={member.slug} member={member} />
            ))}
          </div>
        </div>

        <div className="home-section-cta">
          <Link to="/members" className="cta-button">
            メンバー紹介へ
          </Link>
        </div>
      </div>
    </section>
  );
}
