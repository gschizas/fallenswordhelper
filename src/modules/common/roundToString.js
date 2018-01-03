import round from './round';

export default function roundToString(number, precision) {
  return round(number, precision).toString();
}
