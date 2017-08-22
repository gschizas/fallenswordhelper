import calf from '../support/calf';
import {createSpan} from '../common/cElement';
import * as system from '../support/system';

function result(stat, desc, color) {
  if (stat !== 0) {
    return desc + ':<span class="' + color + '">' +
      system.addCommas(stat) + ' </span>';
  }
  return '';
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
  output += result(xpGain, 'XP stolen', color);
  output += result(goldGain, 'Gold lost', color);
  output += result(goldStolen, 'Gold stolen', color);
  output += result(prestigeGain, 'Prestige gain', color);
  output += result(pvpRatingChange, 'PvP change', color);
  // TODO did I initiate the attack?
  var specials = system.createDocument(responseText)
    .querySelectorAll('#specialsDiv');
  Array.prototype.forEach.call(specials, function(el) {
    if (/mesmerized|leeched/.test(el.textContent)) {
      output += '<br>' + el.innerHTML;
    }
  });
  callback.target.innerHTML = output;
}

export default function addPvpSummary(aRow, messageType) { // Legacy
  // add PvP combat log summary
  if (messageType === 'Combat' &&
      aRow.cells[2] &&
      calf.showPvPSummaryInLog &&
      /combat_id=/.test(aRow.cells[2].innerHTML) &&
      !/\(Guild Conflict\)/.test(aRow.cells[2].textContent)) {
    var combatID = /combat_id=(\d+)/.exec(aRow.cells[2].innerHTML)[1];
    var defeat = /You were defeated by/.test(aRow.cells[2].innerHTML);
    var _winner = 1;
    if (defeat) {_winner = 0;}
    var combatSummarySpan = createSpan({style: {color: 'gray'}});
    aRow.cells[2].appendChild(combatSummarySpan);
    system.xmlhttp('index.php?cmd=combat&subcmd=view&combat_id=' + combatID,
      retrievePvPCombatSummary,
      {
        target: combatSummarySpan,
        winner: _winner
      }
    );
  }
}
