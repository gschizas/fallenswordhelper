import {padZ} from '../system/system';

export default function formatUtcDateTime(aDate) {
  if (Object.prototype.toString.call(aDate) === '[object Date]' &&
      !isNaN(aDate.getTime())) {
    var yyyy = aDate.getUTCFullYear().toString();
    var mon = padZ(aDate.getUTCMonth() + 1);
    var dd = padZ(aDate.getUTCDate());
    var hh = padZ(aDate.getUTCHours());
    var mm = padZ(aDate.getUTCMinutes());
    var ss = padZ(aDate.getUTCSeconds());
    return yyyy + '-' + mon + '-' + dd + ' ' + hh + ':' + mm + ':' + ss;
  }
}
