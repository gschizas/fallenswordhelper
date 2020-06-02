import { i as isDate, f as formatDateTime } from './isDate-03b058bd.js';
import { p as padZ } from './padZ-e4d6f7a0.js';

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
//# sourceMappingURL=formatLocalDateTime-6a198ae8.js.map
