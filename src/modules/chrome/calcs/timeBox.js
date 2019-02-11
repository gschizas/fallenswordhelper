import {months} from '../../support/constants';
import {now} from '../../support/now';
import padZ from '../../system/padZ';

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
