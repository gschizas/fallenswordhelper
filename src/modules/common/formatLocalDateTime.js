import formatDateTime from './formatDateTime';
import isDate from './isDate';
import padZ from '../system/padZ';

function localDateParts(aDate) {
  return [
    aDate.getFullYear().toString(),
    padZ(aDate.getMonth() + 1),
    padZ(aDate.getDate()),
    padZ(aDate.getHours()),
    padZ(aDate.getMinutes()),
    padZ(aDate.getSeconds())
  ];
}

export default function formatLocalDateTime(aDate) {
  if (isDate(aDate)) {
    return formatDateTime(localDateParts(aDate));
  }
}
