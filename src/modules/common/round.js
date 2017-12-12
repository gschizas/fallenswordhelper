import isNaN from './isNaN';

export default function round(number, precision) {
  var factor = Math.pow(10, precision);
  if (isNaN(factor)) {factor = 1;}
  return Math.round(number * factor) / factor;
}
