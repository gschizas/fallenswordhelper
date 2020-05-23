import { t as toLowerCase } from './toLowerCase-7c48beec.js';

function alpha(a, b) {
  if (toLowerCase(a) < toLowerCase(b)) { return -1; }
  if (toLowerCase(a) > toLowerCase(b)) { return 1; }
  return 0;
}

export { alpha as a };
//# sourceMappingURL=alpha-cf3b2c75.js.map
