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

function isPvpTarget(vlevel) {
  return highlightPlayersNearMyLvl &&
    vlevel >= pvpLowerLevel &&
    vlevel <= pvpUpperLevel;
}

function isGvgTarget(vlevel) {
  return highlightGvGPlayersNearMyLvl &&
    vlevel >= gvgLowerLevel &&
    vlevel <= gvgUpperLevel;
}

function isActive(el, tipped) {
  var vlevel = Number(/VL:.+?(\d+)/.exec(tipped)[1]);
  var aRow = el.parentNode.parentNode;
  if (isPvpTarget(vlevel)) {
    aRow.classList.add('lvlHighlight');
  } else if (isGvgTarget(vlevel)) {
    aRow.classList.add('lvlGvGHighlight');
  }
}

function highlightMembers(el) {
  var tipped = el.dataset.tipped;
  var lastActDays = lastActivityRE.exec(tipped)[1];
  if (lastActDays < 7) {isActive(el, tipped);}
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
