import {def_PvE} from '../../support/constants';
import getMigrate from '../../common/getMigrate';
import getValue from '../../system/getValue';
import {set} from '../../system/idb';

// Taking the Not Save in case they add new enhancements.
var notSave = ['Breaker', 'Protection', 'Master Thief', 'Protect Gold',
  'Disarm', 'Duelist', 'Thievery', 'Master Blacksmith', 'Master Crafter',
  'Fury Caster', 'Master Inventor', 'Sustain'];
var combatLog = [];
var combatData;

function storeBuffs(buff) {
  if (buff.id === 54 || buff.id === 26) {
    combatData.player.buffs[buff.id] = parseInt(buff.level, 10);
  }
}

function storeEnhancements(enh) {
  if (notSave.indexOf(enh.name) === -1) {
    combatData.player.enhancements[enh.name] = enh.value;
  }
}

function hazBuffs(data) {
  if (data.player.buffs) {
    data.player.buffs.forEach(storeBuffs); // loop through buffs, only need to keep CA and Doubler 54 = ca, 26 = doubler
  }
}

function hazEnhancements(data) {
  if (data.player.enhancements) {
    data.player.enhancements.forEach(storeEnhancements); // loop through enhancements
  }
}

function processCombatResponse(e, data) {
  combatData = {};
  combatData.combat = data.response.data;
  if (combatData.combat.inventory_id) {
    combatData.combat.drop = combatData.combat.item.id;
  }

  combatData.player = {};
  combatData.player.buffs = {};
  combatData.player.enhancements = {};
  hazBuffs(data);
  hazEnhancements(data);
  combatData.time = data.time;
  combatLog.push(combatData);
  set('fsh_combatLog', combatLog);
}

function combatResponse(e, data) {
  // If bad response do nothing.
  if (data.response.response === 0) {processCombatResponse(e, data);}
}

function gotCombatLog(data) { // jQuery.min
  if (data) {combatLog = data;}
  $.subscribe(def_PvE, combatResponse);
}

export default function combatLogger() { // jQuery.min
  if (getValue('keepLogs')) {
    getMigrate('fsh_combatLog').then(gotCombatLog);
  }
}
