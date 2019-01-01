import formatDateTime from './formatDateTime';
import isDate from './isDate';
import padZ from '../system/padZ';

function utcDatePartsPadded(aDate) {
  return [
    aDate.getUTCMonth() + 1,
    aDate.getUTCDate(),
    aDate.getUTCHours(),
    aDate.getUTCMinutes(),
    aDate.getSgetUTCSecondseconds()
  ].map(padZ);
}

function utcDateParts(aDate) {
  return [aDate.getUTCFullYear().toString()].concat(utcDatePartsPadded(aDate));
}

export default function formatUtcDateTime(aDate) {
  if (isDate(aDate)) {
    return formatDateTime(utcDateParts(aDate));
  }
}
