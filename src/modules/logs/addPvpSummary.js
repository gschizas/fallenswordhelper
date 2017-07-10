import calf from '../support/calf';
import * as system from '../support/system';

function pvpXp(color, xpGain) { // Legacy
  var out = '';
  if (xpGain !== 0) {
    out = 'XP stolen:<span class="' + color + '">' +
      system.addCommas(xpGain) + ' </span>';
  }
  return out;
}

function pvpGoldGain(color, goldGain) { // Legacy
  var out = '';
  if (goldGain !== 0) {
    out = 'Gold lost:<span class="' + color + '">' +
      system.addCommas(goldGain) + ' </span>';
  }
  return out;
}

function pvpGoldStolen(color, goldStolen) { // Legacy
  var out = '';
  if (goldStolen !== 0) {
    out = 'Gold stolen:<span class="' + color + '">' +
      system.addCommas(goldStolen) + ' </span>';
  }
  return out;
}

function pvpPrestigeGain(color, prestigeGain) { // Legacy
  var out = '';
  if (prestigeGain !== 0) {
    out = 'Prestige gain:<span class="' + color + '">' +
      prestigeGain + ' </span>';
  }
  return out;
}

function pvpRating(color, pvpRatingChange) { // Legacy
  var out = '';
  if (pvpRatingChange !== 0) {
    out = 'PvP change:<span class="' + color + '">' +
    pvpRatingChange + ' </span>';
  }
  return out;
}

function retrievePvPCombatSummary(responseText, callback) { // Legacy
  var winner = callback.winner;
  var color;
  if (winner === 1) {
    color = 'fshGreen';
  } else {
    color = 'fshRed';
  }
  var xpGain = system.getIntFromRegExp(responseText,
    /var\s+xpGain=(-?[0-9]+);/i);
  var goldGain = system.getIntFromRegExp(responseText,
    /var\s+goldGain=(-?[0-9]+);/i);
  var prestigeGain = system.getIntFromRegExp(responseText,
    /var\s+prestigeGain=(-?[0-9]+);/i);
  var goldStolen = system.getIntFromRegExp(responseText,
    /var\s+goldStolen=(-?[0-9]+);/i);
  var pvpRatingChange = system.getIntFromRegExp(responseText,
    /var\s+pvpRatingChange=(-?[0-9]+);/i);
  var output = '<br> ';
  output += pvpXp(color, xpGain);
  output += pvpGoldGain(color, goldGain);
  output += pvpGoldStolen(color, goldStolen);
  output += pvpPrestigeGain(color, prestigeGain);
  output += pvpRating(color, pvpRatingChange);
  callback.target.innerHTML = output;
}

export default function addPvpSummary(aRow, messageType) { // Legacy
  // add PvP combat log summary
  if (messageType === 'Combat' &&
      aRow.cells[2] &&
      calf.showPvPSummaryInLog &&
      aRow.cells[2].innerHTML.indexOf('combat_id=') !== -1 &&
      aRow.cells[2].textContent.indexOf('(Guild Conflict)') === -1) {
    var combatID = /combat_id=(\d+)/.exec(aRow.cells[2].innerHTML)[1];
    var defeat = /You were defeated by/.exec(aRow.cells[2].innerHTML);
    var combatSummarySpan = document.createElement('SPAN');
    combatSummarySpan.style.color = 'gray';
    aRow.cells[2].appendChild(combatSummarySpan);
    system.xmlhttp('index.php?cmd=combat&subcmd=view&combat_id=' +
      combatID, retrievePvPCombatSummary,
      {
        target: combatSummarySpan,
        winner: defeat ? 0 : 1
      });
  }
}
