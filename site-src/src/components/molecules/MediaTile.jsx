import { Link } from 'react-router-dom';

/* 荷札カードの共通ラッパー。
   to(内部リンク) / href(外部リンク) / どちらも無し(記事) で要素を切り替える。
   カードの中身(画像・メタ・タイトル)は呼び出し側が children で渡す。 */
export function MediaTile({ to, href, ariaLabel, className, children }) {
  const tileClass = ['media-tile', className].filter(Boolean).join(' ');

  if (to) {
    return (
      <Link className={tileClass} to={to} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        className={tileClass}
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }

  return (
    <article className={tileClass} aria-label={ariaLabel}>
      {children}
    </article>
  );
}
