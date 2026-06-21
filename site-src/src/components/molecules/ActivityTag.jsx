import { Link } from 'react-router-dom';
import { IconImage } from '../atoms/IconImage';

export function ActivityTag({ item }) {
  return (
    <>
      <span className={`connector-line ${item.lineClassName}`} aria-hidden="true" />
      <Link className={`activity-tag ${item.className}`} to={item.to} aria-label={item.label}>
        <IconImage name={item.image} alt="" />
      </Link>
    </>
  );
}
