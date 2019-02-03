import add from '../support/task';
import buffLinks from './buffLinks';
import colouredDots from '../common/colouredDots';
import conflictInfo from './conflictInfo';
import getElementsByTagName from '../common/getElementsByTagName';
import getValue from '../system/getValue';
import guildTracker from './guildTracker/guildTracker';
import insertHtmlBeforeEnd from '../common/insertHtmlBeforeEnd';
import jQueryNotPresent from '../common/jQueryNotPresent';
import {pCC} from '../support/layout';
import partial from '../common/partial';
import playerName from '../common/playerName';
import {recallUserUrl} from '../support/constants';
import {getXpLock, guildXPLock, removeGuildAvyImgBorder} from './guildUtils';
import {logoToggle, statToggle, structureToggle} from './panelToggle';

function selfRecallLink(leftHandSideColumnTable) {
  // self recall
  var getLi = getElementsByTagName('li', leftHandSideColumnTable);
  var selfRecall = getLi[getLi.length - 1].parentNode;
  insertHtmlBeforeEnd(selfRecall,
    '<li><a href="' + recallUserUrl + playerName() +
    '" class="tip-static" data-tipped="Self Recall">Self Recall</a></li>');
}

function getLhsColTab() {
  return pCC.lastElementChild.rows[2].cells[0].children[0];
}

function lhsAdd(leftHandSideColumnTable, fn) {
  add(3, fn, [leftHandSideColumnTable]);
}

function lhsAdditions(leftHandSideColumnTable) {
  [
    logoToggle,
    statToggle,
    structureToggle,
    selfRecallLink
  ].forEach(partial(lhsAdd, leftHandSideColumnTable));
}

function ajaxStuff(leftHandSideColumnTable) {
  if (jQueryNotPresent()) {return;}
  // Detailed conflict information
  if (getValue('detailedConflictInfo')) {
    add(3, conflictInfo, [leftHandSideColumnTable]);
  }
  add(4, guildTracker);
}

function guildWidgets(xpLock) {
  add(3, colouredDots);
  add(3, removeGuildAvyImgBorder);
  add(3, guildXPLock, [xpLock]);

  var leftHandSideColumnTable = getLhsColTab();
  lhsAdditions(leftHandSideColumnTable);

  add(3, buffLinks);

  ajaxStuff(leftHandSideColumnTable);
}

export default function injectGuild() {
  var xpLock = getXpLock();
  if (xpLock) {guildWidgets(xpLock);}
}
