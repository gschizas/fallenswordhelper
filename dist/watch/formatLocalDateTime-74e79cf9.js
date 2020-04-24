import { aN as padZ } from './calfSystem-1499e8da.js';
import { i as isDate, f as formatDateTime } from './isDate-043977c3.js';

function localDatePartsPadded(aDate) {
  return [
    aDate.getMonth() + 1,
    aDate.getDate(),
    aDate.getHours(),
    aDate.getMinutes(),
    aDate.getSeconds(),
  ].map(padZ);
}

function localDateParts(aDate) {
  return [aDate.getFullYear().toString()].concat(localDatePartsPadded(aDate));
}

function formatLocalDateTime(aDate) {
  if (isDate(aDate)) {
    return formatDateTime(localDateParts(aDate));
  }
}

export { formatLocalDateTime as f };
//# sourceMappingURL=formatLocalDateTime-74e79cf9.js.map
