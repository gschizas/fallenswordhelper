import equipItem from '../../ajax/equipItem';
import hideQTip from '../../common/hideQTip';
import {imageServer} from '../../system/system';
import partial from '../../common/partial';
import {queueRecallItem} from '../../ajaxQueue/queue';

var spinner = '<span class="guildReportSpinner" style="background-image: ' +
  'url(\'' + imageServer + '/skin/loading.gif\');"></span>';

function recalled(theTd, data) {
  if (data.r === 1) {return;}
  theTd.innerHTML = '<span class="fastWorn">' +
    'You successfully recalled the item</span>';
}

function recallInfObj(evt, mode, href) {
  return {
    invId: href.match(/&id=(\d+)/)[1],
    playerId: href.match(/&player_id=(\d+)/)[1],
    mode: mode,
    action: evt.target.getAttribute('action')
  };
}

function recallItem(evt) { // jQuery
  hideQTip(evt.target);
  var mode = evt.target.getAttribute('mode');
  var theTd = evt.target.parentNode.parentNode;
  if (mode === '0') {theTd = theTd.parentNode;}
  var href = theTd.children[0].href;
  if (!href) {return;}
  queueRecallItem(recallInfObj(evt, mode, href)).done(partial(recalled, theTd));
  theTd.innerHTML = spinner;
}

function wornItem(theTd, data) {
  if (data.r === 1) {return;}
  theTd.innerHTML = '<span class="fastWorn">Worn</span>';
}

function wearItem(evt) { // jQuery
  hideQTip(evt.target);
  var theTd = evt.target.parentNode.parentNode.parentNode;
  var href = theTd.children[0].href;
  if (!href) {return;}
  equipItem(href.match(/&id=(\d+)/)[1]).done(partial(wornItem, theTd));
  theTd.innerHTML = spinner;
}

var events = [
  {test: 'recall', fn: recallItem},
  {test: 'equip', fn: wearItem},
  {
    test: 'a-reply',
    fn: function(evt) {
      window.openQuickMsgDialog(evt.target.getAttribute('target_player'));
    }
  }
];

export default function eventHandlers(evt) {
  for (var i = 0; i < events.length; i += 1) {
    if (evt.target.classList.contains(events[i].test)) {
      events[i].fn(evt);
      return;
    }
  }
}
