import equipItem from '../ajax/equipItem';
import {imageServer} from '../support/system';
import {queueRecallItem} from '../ajaxQueue/queue';

var spinner = '<span class="guildReportSpinner" style="background-image: ' +
  'url(\'' + imageServer + '/skin/loading.gif\');"></span>';

function recallItem(evt) { // jQuery
  $(evt.target).qtip('hide');
  var mode = evt.target.getAttribute('mode');
  var theTd = evt.target.parentNode.parentNode;
  if (mode === '0') {theTd = theTd.parentNode;}
  var href = theTd.firstElementChild.href;
  queueRecallItem({
    invId: href.match(/&id=(\d+)/)[1],
    playerId: href.match(/&player_id=(\d+)/)[1],
    mode: mode,
    action: evt.target.getAttribute('action')
  })
    .done(function(data) {
      if (data.r === 1) {return;}
      theTd.innerHTML = '<span class="fastWorn">' +
        'You successfully recalled the item</span>';
    });
  theTd.innerHTML = spinner;
}

function wearItem(evt) { // jQuery
  $(evt.target).qtip('hide');
  var theTd = evt.target.parentNode.parentNode.parentNode;
  var href = theTd.firstElementChild.href;
  equipItem(href.match(/&id=(\d+)/)[1]).done(function(data) {
    if (data.r === 1) {return;}
    theTd.innerHTML = '<span class="fastWorn">Worn</span>';
  });
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
