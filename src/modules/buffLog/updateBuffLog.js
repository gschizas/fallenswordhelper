import buffList from '../support/buffObj';
import formatLocalDateTime from '../common/formatLocalDateTime';
import {getElementById} from '../common/getElement';
import getForage from '../ajax/getForage';
import getValue from '../system/getValue';
import setForage from '../ajax/setForage';

function rejected(timeStamp, buffsNotCast, buffLog) {
  if (buffsNotCast) {
    return timeStamp + ' <span style="color: red;">' +
      buffsNotCast[0] + '</span><br>' + buffLog;
  }
  return buffLog;
}

function getStamUsed(buffCast) {
  for (var j = 0; j < buffList.length; j += 1) {
    if (buffList[j].name === buffCast[1]) {
      return buffList[j].stam.toString();
    }
  }
  return '-';
}

function successfull(timeStamp, buffCast, buffLog) {
  if (buffCast) {
    return timeStamp + ' ' + buffCast[0] + ' (' + getStamUsed(buffCast) +
      ' stamina) <br>' + buffLog;
  }
  return buffLog;
}

function buffResult(_buffLog) {
  var buffLog = _buffLog;
  if (!buffLog) {buffLog = '';}
  var timeStamp = formatLocalDateTime(new Date());
  var buffsAttempted = getElementById('quickbuff-report')
    .innerHTML.split('<p>');
  var buffsNotCastRE = new RegExp('The skill ([\\w ]*) of current or' +
    ' higher level is currently active on \'(\\w*)\'');
  var buffsCastRE = new RegExp('Skill ([\\w ]*) level (\\d*) was ' +
    'activated on \'(\\w*)\'');
  for (var i = 0; i < buffsAttempted.length; i += 1) {
    var buffCast = buffsCastRE.exec(buffsAttempted[i]);
    var buffNotCast = buffsNotCastRE.exec(buffsAttempted[i]);
    buffLog = successfull(timeStamp, buffCast, buffLog);
    buffLog = rejected(timeStamp, buffNotCast, buffLog);
  }
  setForage('fsh_buffLog', buffLog);
}

export default function updateBuffLog() {
  if (!getValue('keepBuffLog')) {return;}
  getForage('fsh_buffLog').done(buffResult);
}
