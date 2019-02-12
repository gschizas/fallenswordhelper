//#if _DEV  //  compress history
import compressHistory from './compressHistory';
//#endif
import currentGuildId from '../common/currentGuildId';
import getUrlParameter from '../system/getUrlParameter';
import getValue from '../system/getValue';
import {lastActivityRE} from '../support/constants';
import querySelectorArray from '../common/querySelectorArray';
import {
  calculateBoundaries,
  gvgLowerLevel,
  gvgUpperLevel,
  pvpLowerLevel,
  pvpUpperLevel
} from '../common/levelHighlight';

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

function shouldHighlight() {
  return Number(getUrlParameter('guild_id')) !== currentGuildId() &&
    (highlightPlayersNearMyLvl || highlightGvGPlayersNearMyLvl);
}

function doHighlights() {
  if (shouldHighlight()) {
    calculateBoundaries();
    querySelectorArray('#pCC a[data-tipped*="<td>VL:</td>"]')
      .forEach(highlightMembers);
  }
}

export default function injectViewGuild() {
  highlightPlayersNearMyLvl = getValue('highlightPlayersNearMyLvl');
  highlightGvGPlayersNearMyLvl = getValue('highlightGvGPlayersNearMyLvl');
  doHighlights();
  //#if _DEV  //  compress history
  compressHistory();
  //#endif
}
