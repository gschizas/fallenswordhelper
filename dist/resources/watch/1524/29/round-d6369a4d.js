import { n as numberIsNaN } from './numberIsNaN-d1ebf732.js';

function round(number, precision) {
  let factor = 10 ** precision;
  if (numberIsNaN(factor)) { factor = 1; }
  return Math.round(number * factor) / factor;
}

export { round as r };
//# sourceMappingURL=round-d6369a4d.js.map
