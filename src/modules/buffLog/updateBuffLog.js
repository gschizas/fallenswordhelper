import buffList from '../support/buffObj';
import getForage from '../ajax/getForage';
import setForage from '../ajax/setForage';
import * as system from '../support/system';

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
      return buffList[j].stamina.toString();
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

function formatDateTime(aDate) { // Native
  var yyyy = aDate.getFullYear().toString();
  var mon = system.padZ(aDate.getMonth() + 1);
  var dd = system.padZ(aDate.getDate());
  var hh = system.padZ(aDate.getHours());
  var mm = system.padZ(aDate.getMinutes());
  var ss = system.padZ(aDate.getSeconds());
  return yyyy + '-' + mon + '-' + dd + ' ' + hh + ':' + mm + ':' + ss;
}

function buffResult(_buffLog) { // Native
  var buffLog = _buffLog;
  if (!buffLog) {buffLog = '';}
  var timeStamp = formatDateTime(new Date());
  var buffsAttempted = document.getElementById('quickbuff-report')
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

export default function updateBuffLog() { // Native
  if (!system.getValue('keepBuffLog')) {return;}
  getForage('fsh_buffLog').done(buffResult);
}
