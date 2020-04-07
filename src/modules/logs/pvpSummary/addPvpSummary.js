import addCommas from '../../system/addCommas';
import calf from '../../support/calf';
import { daViewCombat } from '../../_dataAccess/_dataAccess';
import getText from '../../common/getText';
import insertElement from '../../common/insertElement';
import partial from '../../common/partial';
import playerId from '../../common/playerId';
import setInnerHtml from '../../dom/setInnerHtml';
import { cacheCombat, combatCache } from './combatCache';
import { createDiv, createSpan } from '../../common/cElement';

function result(stat, desc, color) {
  if (stat !== 0) {
    return `${desc}:<span class="${color}">${
      addCommas(stat)} </span>`;
  }
  return '';
}

function iDefended(json) {
  return json.r.defender.id === playerId() && json.r.winner === 1;
}

function iAttacked(json) {
  return json.r.attacker.id === playerId() && json.r.winner === 0;
}

function iWon(json) {
  if (iDefended(json) || iAttacked(json)) {
    return 'fshGreen';
  }
  return 'fshRed';
}

function highlightSpecials(acc, el) {
  if (el.id === 18) {
    return `${acc}<br><span class="fshRed fshBold">${
      el.params[0]} leeched the buff '${el.params[1]}'.</span>`;
  }
  if (el.id === 21) {
    return `${acc}<br><span class="fshRed fshBold">${
      el.params[0]} was mesmerized by Spell Breaker, losing the '${
      el.params[1]}' buff.</span>`;
  }
  return acc;
}

function parseCombat(combatSummary, json) {
  if (!json.s) { return; }
  const color = iWon(json);
  setInnerHtml(result(json.r.xp_gain, 'XP stolen', color)
    + result(json.r.gold_gain, 'Gold lost', color)
    + result(json.r.gold_stolen, 'Gold stolen', color)
    + result(json.r.pvp_prestige_gain, 'Prestige gain', color)
    + result(json.r.pvp_rating_change, 'PvP change', color)
    + json.r.specials.reduce(highlightSpecials, ''), combatSummary);
}

function processCombat(aRow) {
  const combatID = /combat_id=(\d+)/.exec(aRow.cells[2].innerHTML)[1];
  const combatSummary = createDiv({ style: { color: 'gray' } });
  insertElement(aRow.cells[2], combatSummary);
  if (combatCache[combatID] && combatCache[combatID].logTime) {
    parseCombat(combatSummary, combatCache[combatID]);
  } else {
    daViewCombat(combatID).then(partial(cacheCombat, aRow))
      .then(partial(parseCombat, combatSummary));
  }
}

function replaceLeadingText(msgCell, newHtml) {
  const replaceText = createSpan({ innerHTML: newHtml });
  msgCell.replaceChild(replaceText, msgCell.firstChild); // Text Node
}

function parseCombatWinner(msgCell) {
  const victory = /You were victorious over/.test(msgCell.innerHTML);
  if (victory) {
    replaceLeadingText(msgCell,
      'You were <span class="fshGreen">victorious</span> over ');
    return 1;
  }
  const defeat = /You were defeated by/.test(msgCell.innerHTML);
  if (defeat) {
    replaceLeadingText(msgCell,
      'You were <span class="fshRed">defeated</span> by ');
    return 0;
  }
}

function processCombatRow(aRow) {
  const winner = parseCombatWinner(aRow.cells[2]);
  if ([0, 1].includes(winner)) { processCombat(aRow); }
}

const combatRowTests = [
  (aRow, messageType) => messageType === 'Combat',
  () => calf.showPvPSummaryInLog,
  (aRow) => aRow.cells[2] && /combat_id=/.test(aRow.cells[2].innerHTML),
  (aRow) => !/\(Guild Conflict\)/.test(getText(aRow.cells[2])),
];

function isCombatRow(aRow, messageType) {
  return combatRowTests.every((e) => e(aRow, messageType));
}

export default function addPvpSummary(aRow, messageType) {
  // add PvP combat log summary
  if (isCombatRow(aRow, messageType)) { processCombatRow(aRow); }
}
