import { n as numberIsNaN } from './numberIsNaN-6ac4f483.js';

function round(number, precision) {
  let factor = 10 ** precision;
  if (numberIsNaN(factor)) { factor = 1; }
  return Math.round(number * factor) / factor;
}

export { round as r };
//# sourceMappingURL=round-05c6910c.js.map
