import isDate from './isDate';
import padZ from '../system/padZ';

function yearAsString(aDate) {
  return aDate.getUTCFullYear().toString();
}

function paddedMonthNumber(aDate) {
  return padZ(aDate.getUTCMonth() + 1);
}

function paddedDayNumber(aDate) {
  return padZ(aDate.getUTCDate());
}

function padddedHours(aDate) {
  return padZ(aDate.getUTCHours());
}

function paddedMinutes(aDate) {
  return padZ(aDate.getUTCMinutes());
}

function paddedSeconds(aDate) {
  return padZ(aDate.getUTCSeconds());
}

export default function formatUtcDateTime(aDate) {
  if (isDate) {
    return yearAsString(aDate) + '-' +
      paddedMonthNumber(aDate) + '-' +
      paddedDayNumber(aDate) + ' ' +
      padddedHours(aDate) + ':' +
      paddedMinutes(aDate) + ':' +
      paddedSeconds(aDate);
  }
}
