import { n as numberIsNaN } from './numberIsNaN-37f2e6cd.js';

function round(number, precision) {
  let factor = 10 ** precision;
  if (numberIsNaN(factor)) { factor = 1; }
  return Math.round(number * factor) / factor;
}

export { round as r };
//# sourceMappingURL=round-4c65c216.js.map
