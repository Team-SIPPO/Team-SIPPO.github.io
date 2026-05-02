import { asset } from '../../lib/asset';

export function IconImage({ name, src, alt = '', ...props }) {
  const resolvedSource = src ?? (name ? asset(name) : '');

  if (!resolvedSource) {
    return null;
  }

  return <img src={resolvedSource} alt={alt} {...props} />;
}
