import * as ajax from '../support/ajax';
import * as system from '../support/system';

// Taking the Not Save in case they add new enhancements.
var notSave = ['Breaker', 'Protection', 'Master Thief', 'Protect Gold',
  'Disarm', 'Duelist', 'Thievery', 'Master Blacksmith', 'Master Crafter',
  'Fury Caster', 'Master Inventor', 'Sustain'];
var combatLog = [];

function combatResponse(e, data) { // Native
  // If bad response do nothing.
  if (data.response.response !== 0) {return;}
  var l;
  var i;
  var combatData = {};
  combatData.combat = data.response.data;
  if (combatData.combat.inventory_id) {
    combatData.combat.drop = combatData.combat.item.id;
  }

  combatData.player = {};
  combatData.player.buffs = {};
  combatData.player.enhancements = {};
  l = data.player.buffs.length;
  for (i = 0; i < l; i += 1) { // loop through buffs, only need to keep CA and Doubler 54 = ca, 26 = doubler */
    var buff = data.player.buffs[i];
    if (buff.id === 54 || buff.id === 26) {
      combatData.player.buffs[buff.id] = parseInt(buff.level, 10);
    }
  }
  if (data.player.enhancements) {
    l = data.player.enhancements.length;
    for (i = 0; i < l; i += 1) { // loop through enhancements
      var enh = data.player.enhancements[i];
      if (notSave.indexOf(enh.name) === -1) {
        combatData.player.enhancements[enh.name] = enh.value;
      }
    }
  }
  combatData.time = data.time;
  combatLog.push(combatData);
  ajax.setForage('fsh_combatLog', combatLog);
}

function gotCombatLog(data) { // jQuery.min
  if (data) {combatLog = data;}
  $.subscribe('2-success.action-response', combatResponse);
}

export function init() { // jQuery.min
  if (system.getValue('keepLogs')) {
    ajax.getForage('fsh_combatLog').done(gotCombatLog);
  }
}
