import { aN as padZ } from './calfSystem-5ce1fc75.js';
import { i as isDate, f as formatDateTime } from './isDate-ddea7cd1.js';

function utcDatePartsPadded(aDate) {
  return [
    aDate.getUTCMonth() + 1,
    aDate.getUTCDate(),
    aDate.getUTCHours(),
    aDate.getUTCMinutes(),
    aDate.getUTCSeconds(),
  ].map(padZ);
}

function utcDateParts(aDate) {
  return [aDate.getUTCFullYear().toString()].concat(utcDatePartsPadded(aDate));
}

function formatUtcDateTime(aDate) {
  if (isDate(aDate)) {
    return formatDateTime(utcDateParts(aDate));
  }
}

export { formatUtcDateTime as f };
//# sourceMappingURL=formatUtcDateTime-4422c5a8.js.map
