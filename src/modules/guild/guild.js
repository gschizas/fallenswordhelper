import add from '../support/task';
import buffLinks from './buffLinks';
import {colouredDots} from '../common/colouredDots';
import conflictInfo from './conflictInfo';
import getValue from '../system/getValue';
import guildTracker from './guildTracker/guildTracker';
import insertHtmlBeforeEnd from '../common/insertHtmlBeforeEnd';
import jQueryNotPresent from '../common/jQueryNotPresent';
import {pCC} from '../support/layout';
import playerName from '../common/playerName';
import {getXpLock, guildXPLock, removeGuildAvyImgBorder} from './guildUtils';
import {logoToggle, statToggle, structureToggle} from './panelToggle';

function selfRecallLink(leftHandSideColumnTable) {
  // self recall
  var getLi = leftHandSideColumnTable.getElementsByTagName('LI');
  var selfRecall = getLi[getLi.length - 1].parentNode;
  insertHtmlBeforeEnd(selfRecall,
    '<li><a href="index.php?cmd=guild&subcmd=inventory&subcmd2=report&' +
    'user=' + playerName() +
    '" class="tip-static" data-tipped="Self Recall">Self Recall</a></li>');
}

function guildWidgets(xpLock) {
  add(3, colouredDots);
  add(3, removeGuildAvyImgBorder);
  add(3, guildXPLock, [xpLock]);
  var leftHandSideColumnTable = pCC
    .lastElementChild.rows[2].cells[0].firstElementChild;
  add(3, logoToggle, [leftHandSideColumnTable]);
  add(3, statToggle, [leftHandSideColumnTable]);
  add(3, structureToggle, [leftHandSideColumnTable]);
  add(3, buffLinks);
  add(3, selfRecallLink, [leftHandSideColumnTable]);
  if (jQueryNotPresent()) {return;}
  // Detailed conflict information
  if (getValue('detailedConflictInfo')) {
    add(3, conflictInfo, [leftHandSideColumnTable]);
  }
  add(4, guildTracker);
}

export default function injectGuild() {
  var xpLock = getXpLock();
  if (xpLock) {guildWidgets(xpLock);}
}
