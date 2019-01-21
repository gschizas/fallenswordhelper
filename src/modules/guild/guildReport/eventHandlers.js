import classHandler from '../../common/classHandler';
import classPair from '../../common/classPair';
import equipItem from '../../ajax/equipItem';
import getElementsByTagName from '../../common/getElementsByTagName';
import {imageServer} from '../../system/system';
import on from '../../common/on';
import {pCC} from '../../support/layout';
import partial from '../../common/partial';
import playerId from '../../common/playerId';
import {queueRecallItem} from '../../ajaxQueue/queue';
import {sendEvent} from '../../support/fshGa';

var spinner = '<span class="guildReportSpinner" style="background-image: ' +
  'url(\'' + imageServer + '/skin/loading.gif\');"></span>';

function recalled(theTd) {
  theTd.innerHTML = '<span class="fastWorn">' +
    'You successfully recalled the item</span>';
}

function wornItem(theTd) {
  theTd.innerHTML = '<span class="fastWorn">Worn</span>';
}

function replyTo(self) {
  window.openQuickMsgDialog(self.getAttribute('target_player'));
}

function itemId(href) {
  return href.match(/&id=(\d+)/)[1];
}

function targetPlayerId(href) {
  return href.match(/&player_id=(\d+)/)[1];
}

function recallResult(action, theTd, data) {
  if (data.r === 1) {return;}
  if (action === 'recall') {
    recalled(theTd);
  } else {
    wornItem(theTd);
  }
}

function doRecall(theTd, href, mode, action) {
  queueRecallItem({
    invId: itemId(href),
    playerId: targetPlayerId(href),
    mode: mode,
    action: action
  }).done(partial(recallResult, action, theTd));
}

function recallTo(theTd, href, mode) {
  doRecall(theTd, href, mode, 'recall');
}

function doFastBp(theTd, href) {
  sendEvent('GuildReport', 'Fast BP');
  recallTo(theTd, href, 0);
}

function doFastGs(theTd, href) {
  sendEvent('GuildReport', 'Fast GS');
  recallTo(theTd, href, 1);
}

function doFastWear(theTd, href) {
  sendEvent('GuildReport', 'Fast Wear');
  if (Number(targetPlayerId(href)) === playerId()) {
    equipItem(itemId(href)).done(partial(wornItem, theTd));
  } else {
    doRecall(theTd, href, 0, 'wear');
  }
}

var subClass = [
  ['fast-bp', doFastBp],
  ['fast-gs', doFastGs],
  ['fast-wear', doFastWear]
];

function doFastRecall(self) {
  var theTd = self.parentNode.parentNode;
  var href = theTd.children[0].href;
  if (!href) {return;}
  subClass.find(partial(classPair, self))[1](theTd, href);
  theTd.innerHTML = spinner;
}

var classEvts = [
  ['sendLink', doFastRecall],
  ['a-reply', replyTo]
];

export default function eventHandlers() {
  on(getElementsByTagName('table', pCC)[1], 'click', classHandler(classEvts));
}
