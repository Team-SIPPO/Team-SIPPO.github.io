import { asset } from './asset';

const WIX_MEDIA_BASE = 'https://static.wixstatic.com/media/';

export function wixMediaAsset(value) {
  if (!value) {
    return '';
  }

  if (value.startsWith('http://') || value.startsWith('https://') || value.startsWith('/')) {
    return value;
  }

  const match = value.match(/^wix:image:\/\/v1\/([^/]+)/);

  if (match) {
    return `${WIX_MEDIA_BASE}${match[1]}`;
  }

  return asset(value);
}
