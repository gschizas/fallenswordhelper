import compressHistory from './compressHistory';
import currentGuildId from '../common/currentGuildId';
import getUrlParameter from '../system/getUrlParameter';
import getValue from '../system/getValue';
import { lastActivityRE } from '../support/constants';
import querySelectorArray from '../common/querySelectorArray';
import {
  calculateBoundaries,
  gvgLowerLevel,
  gvgUpperLevel,
  pvpLowerLevel,
  pvpUpperLevel,
} from '../common/levelHighlight';

let highlightPlayersNearMyLvl;
let highlightGvGPlayersNearMyLvl;

function isPvpTarget(vlevel) {
  return highlightPlayersNearMyLvl
    && vlevel >= pvpLowerLevel
    && vlevel <= pvpUpperLevel;
}

function isGvgTarget(vlevel) {
  return highlightGvGPlayersNearMyLvl
    && vlevel >= gvgLowerLevel
    && vlevel <= gvgUpperLevel;
}

function isActive(el, tipped) {
  const vlevel = Number(/VL:.+?(\d+)/.exec(tipped)[1]);
  const aRow = el.parentNode.parentNode;
  if (isPvpTarget(vlevel)) {
    aRow.classList.add('lvlHighlight');
  } else if (isGvgTarget(vlevel)) {
    aRow.classList.add('lvlGvGHighlight');
  }
}

function highlightMembers(el) {
  const { tipped } = el.dataset;
  const lastActDays = lastActivityRE.exec(tipped)[1];
  if (lastActDays < 7) { isActive(el, tipped); }
}

function shouldHighlight() {
  return Number(getUrlParameter('guild_id')) !== currentGuildId()
    && (highlightPlayersNearMyLvl || highlightGvGPlayersNearMyLvl);
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
  if (getValue('enableHistoryCompressor')) { compressHistory(); }
}
