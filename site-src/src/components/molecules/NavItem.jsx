import { NavLink } from 'react-router-dom';

function navClassName({ isActive }) {
  return `nav-link ${isActive ? 'is-active' : ''}`;
}

export function NavItem({ item, onNavigate }) {
  if (!item.children) {
    return (
      <NavLink className={navClassName} to={item.to} onClick={onNavigate}>
        {item.label}
      </NavLink>
    );
  }

  return (
    <div className="nav-group">
      <NavLink className={navClassName} to={item.to} onClick={onNavigate}>
        {item.label}
        <span className="nav-caret" aria-hidden="true" />
      </NavLink>
      <div className="nav-menu">
        {item.children.map((child) => (
          <NavLink key={child.label} className={({ isActive }) => (isActive ? 'is-active' : '')} to={child.to} onClick={onNavigate}>
            {child.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
}
