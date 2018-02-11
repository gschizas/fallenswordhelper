import addCommas from '../system/addCommas';
import calf from '../support/calf';
import {createDocument} from '../system/system';
import getForage from '../ajax/getForage';
import {nowSecs} from '../support/dataObj';
import parseDateAsTimestamp from '../system/parseDateAsTimestamp';
import retryAjax from '../ajax/retryAjax';
import {sendEvent} from '../support/fshGa';
import setForage from '../ajax/setForage';
import {specials} from '../support/specials';
import viewCombat from '../app/combat/view';
import {createDiv, createSpan} from '../common/cElement';

var combatCache = {};

function result(stat, desc, color) {
  if (stat !== 0) {
    return desc + ':<span class="' + color + '">' +
      addCommas(stat) + ' </span>';
  }
  return '';
}

function iDefended(json) {
  return json.r.is_defender && json.r.winner === 1;
}

function iAttacked(json) {
  return !json.r.is_defender && json.r.winner === 0;
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

function whatsMissing(json, html) {
  var specialHtml = createDocument(html).querySelectorAll('#specialsDiv');
  json.r.specials.forEach(function(el, i) {
    if (!inSpecialsList(el)) {
      //#if _DEV  //  PvP missing Special
      console.log(JSON.stringify(el) + ' ' + specialHtml[i].textContent); // eslint-disable-line no-console
      //#endif
      sendEvent('Logs', 'Missing PvP Special',
        JSON.stringify(el) + ' ' + specialHtml[i].textContent);
    }
  });
}

function unknownSpecials(json) {
  if (!json.r.specials.every(inSpecialsList)) {
    retryAjax('index.php?cmd=combat&subcmd=view&combat_id=' + json.r.id)
      .done(whatsMissing.bind(null, json));
  }
}

function cacheCombat(aRow, json) {
  if (!json.s) {return;}
  var cellContents = aRow.cells[1].textContent;
  json.logTime = parseDateAsTimestamp(cellContents) / 1000;
  combatCache[json.r.id] = json;
  setForage('fsh_pvpCombat', combatCache);
  unknownSpecials(json);
}

function processCombat(aRow) {
  var combatID = /combat_id=(\d+)/.exec(aRow.cells[2].innerHTML)[1];
  var combatSummary = createDiv({style: {color: 'gray'}});
  aRow.cells[2].appendChild(combatSummary);
  if (combatCache[combatID] && combatCache[combatID].logTime) {
    parseCombat(combatSummary, combatCache[combatID]);
  } else {
    viewCombat(combatID).done(cacheCombat.bind(null, aRow))
      .done(parseCombat.bind(null, combatSummary));
  }
}

function replaceLeadingText(msgCell, newHtml) {
  var replaceText = createSpan({innerHTML: newHtml});
  msgCell.replaceChild(replaceText, msgCell.firstChild);
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
    return !/\(Guild Conflict\)/.test(aRow.cells[2].textContent);
  }
];

function isCombatRow(aRow, messageType) {
  return combatRowTests.every(function(e) {return e(aRow, messageType);});
}

export function addPvpSummary(aRow, messageType) {
  // add PvP combat log summary
  if (isCombatRow(aRow, messageType)) {processCombatRow(aRow);}
}

function currentCombatRecord(data, combatId, sevenDays) {
  return combatId === 'lastCheck' || data[combatId].logTime &&
    data[combatId].logTime > sevenDays;
}

function cleanCache(data) {
  var sevenDays = nowSecs - 7 * 24 * 60 * 60;
  combatCache = Object.keys(data).reduce(function(prev, combatId) {
    if (currentCombatRecord(data, combatId, sevenDays)) {
      prev[combatId] = data[combatId];
    }
    return prev;
  }, {});
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
  return getForage('fsh_pvpCombat').done(checkCache);
}
