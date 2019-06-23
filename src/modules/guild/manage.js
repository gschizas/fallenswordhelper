import add from '../support/task';
import buffLinks from './buffLinks';
import conflictInfo from './conflictInfo';
import contains from '../common/contains';
import getArrayByTagName from '../common/getArrayByTagName';
import getElementsByTagName from '../common/getElementsByTagName';
import getValue from '../system/getValue';
import guildTracker from './guildTracker/guildTracker';
//#if _DEV  //  guildTrackerV2
import guildTrackerV2 from './guildTrackerV2/guildTracker';
//#endif
import insertHtmlBeforeEnd from '../common/insertHtmlBeforeEnd';
import jQueryNotPresent from '../common/jQueryNotPresent';
import {pCC} from '../support/layout';
import partial from '../common/partial';
import playerName from '../common/playerName';
import progressBar from './progressBar';
import {guildSubcmdUrl, recallUserUrl} from '../support/constants';
import {logoToggle, statToggle, structureToggle} from './panelToggle';

function relicControl(leftHandSideColumnTable) {
  const relic = getArrayByTagName('b', leftHandSideColumnTable)
    .filter(contains('Relics'));
  if (relic.length !== 1) {return;}
  const thisFont = relic[0].parentNode.nextElementSibling.children[0];
  thisFont.innerHTML = '[ <a href="' + guildSubcmdUrl +
    'reliclist">Control</a> ]&nbsp;';
}

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
    relicControl,
    selfRecallLink
  ].forEach(partial(lhsAdd, leftHandSideColumnTable));
}

function doGuildTracker() {
  const test = 0;
  if (test === 0) {
    add(4, guildTracker);
    //#if _DEV  //  guildTrackerV2
  } else {
    add(4, guildTrackerV2);
    //#endif
  }
}

function ajaxStuff(leftHandSideColumnTable) {
  if (jQueryNotPresent()) {return;}
  // Detailed conflict information
  if (getValue('detailedConflictInfo')) {
    add(3, conflictInfo, [leftHandSideColumnTable]);
  }
  doGuildTracker();
}

export default function manage() {
  var leftHandSideColumnTable = getLhsColTab();
  lhsAdditions(leftHandSideColumnTable);
  add(3, buffLinks);
  ajaxStuff(leftHandSideColumnTable);
  progressBar();
}
