import { n as numberIsNaN } from './numberIsNaN-fecd7e6d.js';

function round(number, precision) {
  let factor = 10 ** precision;
  if (numberIsNaN(factor)) { factor = 1; }
  return Math.round(number * factor) / factor;
}

function roundToString(number, precision) {
  return round(number, precision).toString();
}

export { round as a, roundToString as r };
//# sourceMappingURL=roundToString-dbdb82cb.js.map
