import { t as toLowerCase } from './toLowerCase-2962b55d.js';

function alpha(a, b) {
  if (toLowerCase(a) < toLowerCase(b)) { return -1; }
  if (toLowerCase(a) > toLowerCase(b)) { return 1; }
  return 0;
}

export { alpha as a };
//# sourceMappingURL=alpha-97a40886.js.map
