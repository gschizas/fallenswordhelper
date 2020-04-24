import { n as numberIsNaN } from './numberIsNaN-4a77fba0.js';

function round(number, precision) {
  let factor = 10 ** precision;
  if (numberIsNaN(factor)) { factor = 1; }
  return Math.round(number * factor) / factor;
}

export { round as r };
//# sourceMappingURL=round-7f21a1bb.js.map
