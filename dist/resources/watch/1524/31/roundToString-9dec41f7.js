import { n as numberIsNaN } from './numberIsNaN-53300e34.js';

function round(number, precision) {
  let factor = 10 ** precision;
  if (numberIsNaN(factor)) { factor = 1; }
  return Math.round(number * factor) / factor;
}

function roundToString(number, precision) {
  return round(number, precision).toString();
}

export { round as a, roundToString as r };
//# sourceMappingURL=roundToString-9dec41f7.js.map
