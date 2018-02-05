import {padZ} from '../system/system';

export default function formatLocalDateTime(aDate) {
  if (Object.prototype.toString.call(aDate) === '[object Date]' &&
      !isNaN(aDate.getTime())) {
    var yyyy = aDate.getFullYear().toString();
    var mon = padZ(aDate.getMonth() + 1);
    var dd = padZ(aDate.getDate());
    var hh = padZ(aDate.getHours());
    var mm = padZ(aDate.getMinutes());
    var ss = padZ(aDate.getSeconds());
    return yyyy + '-' + mon + '-' + dd + ' ' + hh + ':' + mm + ':' + ss;
  }
}
