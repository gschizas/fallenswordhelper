import { n as numberIsNaN } from './numberIsNaN-0a1aaf72.js';

function round(number, precision) {
  let factor = 10 ** precision;
  if (numberIsNaN(factor)) { factor = 1; }
  return Math.round(number * factor) / factor;
}

export { round as r };
//# sourceMappingURL=round-278bde6e.js.map
