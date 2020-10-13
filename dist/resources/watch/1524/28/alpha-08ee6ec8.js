import { t as toLowerCase } from './toLowerCase-27ea448e.js';

function alpha(a, b) {
  if (toLowerCase(a) < toLowerCase(b)) { return -1; }
  if (toLowerCase(a) > toLowerCase(b)) { return 1; }
  return 0;
}

export { alpha as a };
//# sourceMappingURL=alpha-08ee6ec8.js.map
