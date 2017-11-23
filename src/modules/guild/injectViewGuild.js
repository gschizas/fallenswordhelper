import add from '../support/task';
import {colouredDots} from '../support/layout';
import {getValue} from '../support/system';
import {lastActivityRE} from '../support/dataObj';
import {
  calculateBoundaries,
  gvgLowerLevel,
  gvgUpperLevel,
  pvpLowerLevel,
  pvpUpperLevel
} from '../common/levelHighlight';
import {guildXPLock, removeGuildAvyImgBorder} from './guildUtils';

var highlightPlayersNearMyLvl;
var highlightGvGPlayersNearMyLvl;

function highlightMembers(el) {
  var tipped = el.dataset.tipped;
  var lastActDays = lastActivityRE.exec(tipped)[1];
  var vlevel = Number(/VL:.+?(\d+)/.exec(tipped)[1]);
  var aRow = el.parentNode.parentNode;
  if (lastActDays < 7 &&
      highlightPlayersNearMyLvl &&
      vlevel >= pvpLowerLevel &&
      vlevel <= pvpUpperLevel) {
    aRow.classList.add('lvlHighlight');
  } else if (lastActDays < 7 &&
      highlightGvGPlayersNearMyLvl &&
      vlevel >= gvgLowerLevel &&
      vlevel <= gvgUpperLevel) {
    aRow.classList.add('lvlGvGHighlight');
  }
}

export default function injectViewGuild() {
  add(3, colouredDots);
  removeGuildAvyImgBorder();
  guildXPLock();
  highlightPlayersNearMyLvl = getValue('highlightPlayersNearMyLvl');
  highlightGvGPlayersNearMyLvl = getValue('highlightGvGPlayersNearMyLvl');
  if (!highlightPlayersNearMyLvl && !highlightGvGPlayersNearMyLvl) {return;}
  calculateBoundaries();
  var memList = document.querySelectorAll(
    '#pCC a[data-tipped*="<td>VL:</td>"]');
  Array.prototype.forEach.call(memList, highlightMembers);
}
