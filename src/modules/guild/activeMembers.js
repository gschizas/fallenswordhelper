import addCommas from '../system/addCommas';
import contains from '../common/contains';
import getArrayByTagName from '../common/getArrayByTagName';
import lastActivityMins from '../common/lastActivityMins';
import {lastActivityRE} from '../support/constants';
import {pCC} from '../support/layout';
import querySelectorArray from '../common/querySelectorArray';

var ACTIVE = 0;
var STAMINA = 1;

function countActive(prev, curr) {
  var lastActivity = lastActivityRE.exec(curr.dataset.tipped);
  var mins = lastActivityMins({
    min: lastActivity[3],
    hour: lastActivity[2],
    day: lastActivity[1]
  });
  if (mins < 44640) {
    prev[ACTIVE] += 1;
    prev[STAMINA] +=
      Number(/Stamina:<\/td><td>(\d+)/.exec(curr.dataset.tipped)[1]);
  }
  return prev;
}

function getActive(dots) {
  return dots.reduce(countActive, [0, 0]);
}

export default function activeMembers() {
  var members = getArrayByTagName('b', pCC).find(contains('Members'));
  if (members) {
    var dots = querySelectorArray('#pCC a[data-tipped*="Last Activity"]');
    var memberStats = getActive(dots);
    members.classList.add('tip-static');
    members.dataset.tipped = 'Active: ' + memberStats[ACTIVE] + '<br>' +
      'Stamina: ' + addCommas(memberStats[STAMINA]);
  }
}
