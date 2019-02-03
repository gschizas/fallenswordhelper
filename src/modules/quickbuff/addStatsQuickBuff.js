import {createSpan} from '../common/cElement';
import formatLastActivity from '../system/formatLastActivity';
import getElementsByTagName from '../common/getElementsByTagName';
import insertElementAfter from '../common/insertElementAfter';
import querySelector from '../common/querySelector';

function getActivitySpan(myPlayer) {
  var activity = querySelector('span.fshLastActivity', myPlayer);
  if (!activity) {
    activity = createSpan({className: 'fshLastActivity'});
    var player = getElementsByTagName('h1', myPlayer)[0];
    insertElementAfter(activity, player);
  }
  return activity;
}

export default function addStatsQuickBuff(data) {
  var myPlayer = querySelector('div.player[data-username="' +
    data.username + '"]');
  var activity = getActivitySpan(myPlayer);
  activity.innerHTML = 'Last Activity: ' +
    formatLastActivity(data.last_login) +
    '<br>Stamina: ' + data.current_stamina + ' / ' +
    data.stamina + ' ( ' + Math.floor(data.current_stamina /
    data.stamina * 100) + '% )';
}
