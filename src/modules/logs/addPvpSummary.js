import calf from '../support/calf';
import {createSpan} from '../common/cElement';
import {
  addCommas,
  createDocument,
  getIntFromRegExp,
  xmlhttp
} from '../support/system';

function getCombatStat(responseText, label) {
  var statRe = new RegExp('var\\s+' + label + '=(-?[0-9]+);', 'i');
  return getIntFromRegExp(responseText, statRe);
}

function result(stat, desc, color) {
  if (stat !== 0) {
    return desc + ':<span class="' + color + '">' +
      addCommas(stat) + ' </span>';
  }
  return '';
}

function retrievePvPCombatSummary(responseText, callback) { // Legacy
  var winner = callback.winner;
  var color = 'fshRed';
  if (winner === 1) {
    color = 'fshGreen';
  }
  var xpGain = getCombatStat(responseText, 'xpGain');
  var goldGain = getCombatStat(responseText, 'goldGain');
  var prestigeGain = getCombatStat(responseText, 'prestigeGain');
  var goldStolen = getCombatStat(responseText, 'goldStolen');
  var pvpRatingChange = getCombatStat(responseText, 'pvpRatingChange');
  var output = '<br> ';
  output += result(xpGain, 'XP stolen', color);
  output += result(goldGain, 'Gold lost', color);
  output += result(goldStolen, 'Gold stolen', color);
  output += result(prestigeGain, 'Prestige gain', color);
  output += result(pvpRatingChange, 'PvP change', color);
  // TODO did I initiate the attack?
  var specials = createDocument(responseText)
    .querySelectorAll('#specialsDiv');
  Array.prototype.forEach.call(specials, function(el) {
    if (/mesmerized|leeched/.test(el.textContent)) {
      output += '<br>' + el.innerHTML;
    }
  });
  callback.target.innerHTML = output;
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

function processCombatRow(aRow) {
  var combatID = /combat_id=(\d+)/.exec(aRow.cells[2].innerHTML)[1];
  var _winner = parseCombatWinner(aRow.cells[2]);
  if (_winner === 0 || _winner === 1) {
    var combatSummarySpan = createSpan({style: {color: 'gray'}});
    aRow.cells[2].appendChild(combatSummarySpan);
    xmlhttp(
      'index.php?no_mobile=1&cmd=combat&subcmd=view&combat_id=' + combatID,
      retrievePvPCombatSummary,
      {target: combatSummarySpan, winner: _winner}
    );
  }
}

export default function addPvpSummary(aRow, messageType) { // Legacy
  // add PvP combat log summary
  if (isCombatRow(aRow, messageType)) {processCombatRow(aRow);}
}
