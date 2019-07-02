import addCommas from '../../system/addCommas';
import calf from '../../support/calf';
import combatView from '../../ajax/combatView';
import createDocument from '../../system/createDocument';
import daViewCombat from '../../_dataAccess/daViewCombat';
import getForage from '../../ajax/getForage';
import getText from '../../common/getText';
import getTextTrim from '../../common/getTextTrim';
import insertElement from '../../common/insertElement';
import {nowSecs} from '../../support/now';
import parseDateAsTimestamp from '../../system/parseDateAsTimestamp';
import partial from '../../common/partial';
import playerId from '../../common/playerId';
import querySelectorAll from '../../common/querySelectorAll';
import {sendEvent} from '../../support/fshGa';
import setForage from '../../ajax/setForage';
import {specials} from '../../support/specials';
import {createDiv, createSpan} from '../../common/cElement';

var combatCache = {};

function result(stat, desc, color) {
  if (stat !== 0) {
    return desc + ':<span class="' + color + '">' +
      addCommas(stat) + ' </span>';
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

function highlightSpecials(prev, el) {
  if (el.id === 18) {
    return prev + '<br><span class="fshRed fshBold">' + el.params[0] +
      ' leeched the buff \'' + el.params[1] + '\'.</span>';
  }
  if (el.id === 21) {
    return prev + '<br><span class="fshRed fshBold">' + el.params[0] +
      ' was mesmerized by Spell Breaker, losing the \'' + el.params[1] +
      '\' buff.</span>';
  }
  return prev;
}

function parseCombat(combatSummary, json) {
  if (!json.s) {return;}
  var color = iWon(json);
  combatSummary.innerHTML = result(json.r.xp_gain, 'XP stolen', color) +
    result(json.r.gold_gain, 'Gold lost', color) +
    result(json.r.gold_stolen, 'Gold stolen', color) +
    result(json.r.pvp_prestige_gain, 'Prestige gain', color) +
    result(json.r.pvp_rating_change, 'PvP change', color) +
    json.r.specials.reduce(highlightSpecials, '');
}

function inSpecialsList(el) {
  return el.id in specials;
}

function check(specialHtml, el, i) {
  if (!inSpecialsList(el)) {
    var label = JSON.stringify(el) + ' ' + getText(specialHtml[i]);
    //#if _DEV  //  PvP missing Special
    console.log(label); // eslint-disable-line no-console
    //#endif
    sendEvent('Logs', 'Missing PvP Special', label);
  }
}

function whatsMissing(json, html) {
  var specialHtml = querySelectorAll('#specialsDiv', createDocument(html));
  json.r.specials.forEach(partial(check, specialHtml));
}

function unknownSpecials(json) {
  if (!json.r.specials.every(inSpecialsList)) {
    combatView(json.r.id).then(partial(whatsMissing, json));
  }
}

function cacheCombat(aRow, json) {
  if (json.s) {
    json.logTime = parseDateAsTimestamp(getTextTrim(aRow.cells[1])) / 1000;
    combatCache[json.r.id] = json;
    setForage('fsh_pvpCombat', combatCache);
    unknownSpecials(json);
  }
  return json;
}

function processCombat(aRow) {
  var combatID = /combat_id=(\d+)/.exec(aRow.cells[2].innerHTML)[1];
  var combatSummary = createDiv({style: {color: 'gray'}});
  insertElement(aRow.cells[2], combatSummary);
  if (combatCache[combatID] && combatCache[combatID].logTime) {
    parseCombat(combatSummary, combatCache[combatID]);
  } else {
    daViewCombat(combatID).then(partial(cacheCombat, aRow))
      .then(partial(parseCombat, combatSummary));
  }
}

function replaceLeadingText(msgCell, newHtml) {
  var replaceText = createSpan({innerHTML: newHtml});
  msgCell.replaceChild(replaceText, msgCell.firstChild); // Text Node
}

function parseCombatWinner(msgCell) {
  var victory = /You were victorious over/.test(msgCell.innerHTML);
  if (victory) {
    replaceLeadingText(msgCell,
      'You were <span class="fshGreen">victorious</span> over ');
    return 1;
  }
  var defeat = /You were defeated by/.test(msgCell.innerHTML);
  if (defeat) {
    replaceLeadingText(msgCell,
      'You were <span class="fshRed">defeated</span> by ');
    return 0;
  }
}

function processCombatRow(aRow) {
  var winner = parseCombatWinner(aRow.cells[2]);
  if ([0, 1].includes(winner)) {processCombat(aRow);}
}

var combatRowTests = [
  function(aRow, messageType) {return messageType === 'Combat';},
  function() {return calf.showPvPSummaryInLog;},
  function(aRow) {
    return aRow.cells[2] && /combat_id=/.test(aRow.cells[2].innerHTML);
  },
  function(aRow) {
    return !/\(Guild Conflict\)/.test(getText(aRow.cells[2]));
  }
];

function condition(aRow, messageType, e) {return e(aRow, messageType);}

function isCombatRow(aRow, messageType) {
  return combatRowTests.every(partial(condition, aRow, messageType));
}

export function addPvpSummary(aRow, messageType) {
  // add PvP combat log summary
  if (isCombatRow(aRow, messageType)) {processCombatRow(aRow);}
}

function currentCombatRecord(data, combatId, sevenDays) {
  return combatId === 'lastCheck' || data[combatId].logTime &&
    data[combatId].logTime > sevenDays;
}

function keepRecent(data, sevenDays, prev, combatId) {
  if (currentCombatRecord(data, combatId, sevenDays)) {
    prev[combatId] = data[combatId];
  }
  return prev;
}

function cleanCache(data) {
  var sevenDays = nowSecs - 7 * 24 * 60 * 60;
  combatCache = Object.keys(data)
    .reduce(partial(keepRecent, data, sevenDays), {});
  combatCache.lastCheck = nowSecs;
  setForage('fsh_pvpCombat', combatCache);
}

function prepareCache(data) {
  var oneDay = nowSecs - 24 * 60 * 60;
  if (!data.lastCheck || data.lastCheck < oneDay) {
    cleanCache(data);
  } else {
    combatCache = data;
  }
}

function checkCache(data) {
  if (data) {prepareCache(data);}
}

export function initCache() {
  return getForage('fsh_pvpCombat').then(checkCache);
}
