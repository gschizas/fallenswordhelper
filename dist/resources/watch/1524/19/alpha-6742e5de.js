import { t as toLowerCase } from './toLowerCase-bbc44a43.js';

function alpha(a, b) {
  if (toLowerCase(a) < toLowerCase(b)) { return -1; }
  if (toLowerCase(a) > toLowerCase(b)) { return 1; }
  return 0;
}

export { alpha as a };
//# sourceMappingURL=alpha-6742e5de.js.map
