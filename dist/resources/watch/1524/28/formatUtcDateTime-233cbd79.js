import { i as isDate, f as formatDateTime } from './isDate-45c423ee.js';
import { p as padZ } from './padZ-28ca6b6e.js';

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
//# sourceMappingURL=formatUtcDateTime-233cbd79.js.map
