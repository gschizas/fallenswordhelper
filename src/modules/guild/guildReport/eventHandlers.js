import classHandler from '../../common/classHandler';
import equipItem from '../../ajax/equipItem';
import getElementsByTagName from '../../common/getElementsByTagName';
import hideQTip from '../../common/hideQTip';
import {imageServer} from '../../system/system';
import on from '../../common/on';
import {pCC} from '../../support/layout';
import partial from '../../common/partial';
import {queueRecallItem} from '../../ajaxQueue/queue';

var spinner = '<span class="guildReportSpinner" style="background-image: ' +
  'url(\'' + imageServer + '/skin/loading.gif\');"></span>';

function recalled(theTd, data) {
  if (data.r === 1) {return;}
  theTd.innerHTML = '<span class="fastWorn">' +
    'You successfully recalled the item</span>';
}

function recallInfObj(self, mode, href) {
  return {
    invId: href.match(/&id=(\d+)/)[1],
    playerId: href.match(/&player_id=(\d+)/)[1],
    mode: mode,
    action: self.getAttribute('action')
  };
}

function recallItem(self) { // jQuery
  hideQTip(self);
  var mode = self.getAttribute('mode');
  var theTd = self.parentNode.parentNode;
  if (mode === '0') {theTd = theTd.parentNode;}
  var href = theTd.children[0].href;
  if (!href) {return;}
  queueRecallItem(recallInfObj(self, mode, href))
    .done(partial(recalled, theTd));
  theTd.innerHTML = spinner;
}

function wornItem(theTd, data) {
  if (data.r === 1) {return;}
  theTd.innerHTML = '<span class="fastWorn">Worn</span>';
}

function wearItem(self) { // jQuery
  hideQTip(self);
  var theTd = self.parentNode.parentNode.parentNode;
  var href = theTd.children[0].href;
  if (!href) {return;}
  equipItem(href.match(/&id=(\d+)/)[1]).done(partial(wornItem, theTd));
  theTd.innerHTML = spinner;
}

function replyTo(self) {
  window.openQuickMsgDialog(self.getAttribute('target_player'));
}

var classEvts = [
  ['recall', recallItem],
  ['equip', wearItem],
  ['a-reply', replyTo]
];

export default function eventHandlers() {
  on(getElementsByTagName('table', pCC)[1], 'click', classHandler(classEvts));
}
