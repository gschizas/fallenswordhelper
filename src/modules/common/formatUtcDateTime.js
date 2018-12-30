import isDate from './isDate';
import padZ from '../system/padZ';

export default function formatUtcDateTime(aDate) {
  if (isDate) {
    return aDate.getUTCFullYear().toString() + '-' +
      padZ(aDate.getUTCMonth() + 1) + '-' +
      padZ(aDate.getUTCDate()) + ' ' +
      padZ(aDate.getUTCHours()) + ':' +
      padZ(aDate.getUTCMinutes()) + ':' +
      padZ(aDate.getUTCSeconds());
  }
}
