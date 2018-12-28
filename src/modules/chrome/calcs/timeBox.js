import padZ from '../../system/padZ';
import {months, now} from '../../support/constants';

var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function formatShortDate(aDate) {
  return padZ(aDate.getHours()) + ':' +
    padZ(aDate.getMinutes()) + ' ' +
    days[aDate.getDay()] + ' ' +
    padZ(aDate.getDate()) + '/' +
    months[aDate.getMonth()] + '/' +
    aDate.getFullYear();
}

export default function timeBox(nextGainTime, hrsToGo) {
  var nextGain = /([0-9]+)m ([0-9]+)s/.exec(nextGainTime);
  if (!nextGain) {return;}
  return '<dd>' +
    formatShortDate(new Date(now +
    (hrsToGo * 60 * 60 + parseInt(nextGain[1], 10) * 60 +
    parseInt(nextGain[2], 10)) * 1000)) + '</dd>';
}
