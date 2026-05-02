import { Link } from 'react-router-dom';

export function TextLink({ children, href, to }) {
  if (to) {
    return (
      <Link className="text-link" to={to}>
        {children}
      </Link>
    );
  }

  return (
    <a className="text-link" href={href} target="_blank" rel="noreferrer noopener">
      {children}
    </a>
  );
}
