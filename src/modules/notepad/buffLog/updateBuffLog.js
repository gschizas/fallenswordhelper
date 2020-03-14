import buffReportParser from './buffReportParser.js';
import formatLocalDateTime from '../../common/formatLocalDateTime';
import {fshBuffLog} from '../../support/constants';
import {getStamAsString} from '../../common/buffUtils.js';
import getValue from '../../system/getValue';
import partial from '../../common/partial';
import {get, set} from '../../system/idb.js';

const success = e => ' ' + e[0] + ' (' + getStamAsString(e[1]) +
  ' stamina)<br>';
const reject = e => ' <span class="fshRed">' + e[0] + '</span><br>';

function logFormat(timeStamp, el) {
  let result;
  if (el[1]) {
    result = success(el);
  } else {
    result = reject(el);
  }
  return timeStamp + result;
}

function buffResult(buffLog) {
  var timeStamp = formatLocalDateTime(new Date());
  const buffsAttempted = buffReportParser(document)
    .map(partial(logFormat, timeStamp));
  set(fshBuffLog, buffsAttempted.reverse().join('') + buffLog);
}

export default function updateBuffLog() {
  if (!getValue('keepBuffLog')) {return;}
  get(fshBuffLog).then(buffResult);
}
