import formatDateTime from './formatDateTime';
import isDate from './isDate';
import padZ from '../system/padZ';

function utcDateParts(aDate) {
  return [
    aDate.getUTCFullYear().toString(),
    padZ(aDate.getUTCMonth() + 1),
    padZ(aDate.getUTCDate()),
    padZ(aDate.getUTCHours()),
    padZ(aDate.getUTCMinutes()),
    padZ(aDate.getUTCSeconds())
  ];
}

export default function formatUtcDateTime(aDate) {
  if (isDate(aDate)) {
    return formatDateTime(utcDateParts(aDate));
  }
}
