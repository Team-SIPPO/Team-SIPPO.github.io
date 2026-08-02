import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';

function navClassName({ isActive }) {
  return `nav-link ${isActive ? 'is-active' : ''}`;
}

/* ハッシュ付きリンク(/#about-us など)はパスが "/" 扱いになり、
   ホーム表示中に常時アクティブになってしまうため、アクティブ判定を無効にする */
function isActiveFor(to, isActive) {
  return isActive && !to.includes('#');
}

export function NavItem({ item, onNavigate, menuOpen }) {
  // ハンバーガーメニューを開いたときは全サブメニュー展開がデフォルト
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    if (menuOpen) setIsExpanded(true);
  }, [menuOpen]);

  if (!item.children) {
    return (
      <NavLink
        className={({ isActive }) => navClassName({ isActive: isActiveFor(item.to, isActive) })}
        to={item.to}
        onClick={onNavigate}
      >
        {item.label}
      </NavLink>
    );
  }

  function handleChildClick() {
    setIsExpanded(false);
    onNavigate();
  }

  return (
    <div className={`nav-group ${isExpanded ? 'is-open' : ''}`}>
      {/* PC: リンク + ホバーでドロップダウン */}
      <NavLink
        className={({ isActive }) =>
          `${navClassName({ isActive: isActiveFor(item.to, isActive) })} hidden md:inline-flex`
        }
        to={item.to}
        onClick={onNavigate}
      >
        {item.label}
        <span className="nav-caret" aria-hidden="true" />
      </NavLink>
      {/* モバイル: アコーディオン開閉(遷移しない) */}
      <button
        type="button"
        className="nav-link nav-toggle md:hidden"
        aria-expanded={isExpanded}
        onClick={() => setIsExpanded((value) => !value)}
      >
        {item.label}
        <span className="nav-caret" aria-hidden="true" />
      </button>
      <div className="nav-menu">
        {item.children.map((child) => (
          <NavLink
            key={child.label}
            className={({ isActive }) => (isActiveFor(child.to, isActive) ? 'is-active' : '')}
            to={child.to}
            onClick={handleChildClick}
          >
            {child.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
}
