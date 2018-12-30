import isDate from './isDate';
import padZ from '../system/padZ';

export default function formatLocalDateTime(aDate) {
  if (isDate) {
    return aDate.getFullYear().toString() + '-' +
      padZ(aDate.getMonth() + 1) + '-' +
      padZ(aDate.getDate()) + ' ' +
      padZ(aDate.getHours()) + ':' +
      padZ(aDate.getMinutes()) + ':' +
      padZ(aDate.getSeconds());
  }
}
