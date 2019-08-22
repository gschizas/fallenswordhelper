import './guildReport.postcss';
import {cdn} from '../../system/system';
import classHandler from '../../common/classHandler';
import classPair from '../../common/classPair';
import equipItem from '../../ajax/equipItem';
import getElementsByTagName from '../../common/getElementsByTagName';
import itemId from './itemId';
import on from '../../common/on';
import {pCC} from '../../support/layout';
import partial from '../../common/partial';
import {playerIDRE} from '../../support/constants';
import playerId from '../../common/playerId';
import {queueRecallItem} from '../../ajaxQueue/queue';
import {sendEvent} from '../../support/fshGa';

var spinner = '<span class="guildReportSpinner" style="background-image: ' +
  'url(\'' + cdn + 'ui/misc/spinner.gif\');"></span>';

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

function targetPlayerId(href) {
  return href.match(playerIDRE)[1];
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
  queueRecallItem(itemId(href), targetPlayerId(href), mode, action)
    .then(partial(recallResult, action, theTd));
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
    equipItem(itemId(href)).then(partial(wornItem, theTd));
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
  if (!theTd) {return;}
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
