import { Link } from 'react-router';
import { IconImage } from '../atoms/IconImage';
import { MemberDetailRow } from '../molecules/MemberDetailRow';
import { asset } from '../../lib/asset';

function MemberSocialLinks({ member }) {
  const links = [
    member.twitterUrl ? { href: member.twitterUrl, icon: 'social-x.png', label: `${member.name} on X` } : null,
    member.noteUrl ? { href: member.noteUrl, icon: 'social-note.png', label: `${member.name} on note` } : null,
  ].filter(Boolean);

  if (links.length === 0) {
    return null;
  }

  return (
    <div className="member-socials">
      {links.map((link) => (
        <a
          key={link.href}
          className="member-social"
          href={link.href}
          target="_blank"
          rel="noreferrer"
          aria-label={link.label}
        >
          <IconImage name={link.icon} alt="" />
        </a>
      ))}
    </div>
  );
}

export function MemberProfileSection({ member }) {
  const introLines = member.intro.split('\n').filter(Boolean);

  return (
    <section>
      <Link className="member-back" to="/members">
        &lt; Back
      </Link>

      {/* PageIntro と同じ「ページタイトル層」: 名前=タイトル、肩書=アイブロウ、一言=リード */}
      <header className="member-title">
        <div className="member-heading">
          <h1>{member.name}</h1>
          <MemberSocialLinks member={member} />
        </div>

        <div className="member-role-block">
          <p className="member-role">{member.role}</p>
          {member.roleDetail ? <p className="member-role-detail">{member.roleDetail}</p> : null}
        </div>

        <div className="member-intro">
          {introLines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </header>

      <div className="member-hero">
        <div className="member-profile-card">
          <dl className="member-detail-list">
            <MemberDetailRow label="趣味" lines={member.hobby} />
            <MemberDetailRow label="必殺技" lines={member.specialMove} />
            <MemberDetailRow label="しっぽの魅力" lines={member.charmPoints} />
            <MemberDetailRow label="どんな人" lines={member.profile} />
          </dl>
        </div>

        <div className="member-photo-card">
          <IconImage
            className="member-photo-hero"
            src={asset(member.image)}
            alt={member.name}
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
}
