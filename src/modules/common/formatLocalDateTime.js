import isDate from './isDate';
import padZ from '../system/padZ';

function yearAsString(aDate) {
  return aDate.getFullYear().toString();
}

function paddedMonthNumber(aDate) {
  return padZ(aDate.getMonth() + 1);
}

function paddedDayNumber(aDate) {
  return padZ(aDate.getDate());
}

function padddedHours(aDate) {
  return padZ(aDate.getHours());
}

function paddedMinutes(aDate) {
  return padZ(aDate.getMinutes());
}

function paddedSeconds(aDate) {
  return padZ(aDate.getSeconds());
}

export default function formatLocalDateTime(aDate) {
  if (isDate) {
    return yearAsString(aDate) + '-' +
      paddedMonthNumber(aDate) + '-' +
      paddedDayNumber(aDate) + ' ' +
      padddedHours(aDate) + ':' +
      paddedMinutes(aDate) + ':' +
      paddedSeconds(aDate);
  }
}
