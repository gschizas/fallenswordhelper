import fallback from '../../system/fallback';
import getForage from '../../ajax/getForage';
import getValue from '../../system/getValue';
import setForage from '../../ajax/setForage';
import setValue from '../../system/setValue';

export var showMonsterLog;
var monsterLog;

export function toggleShowMonsterLog() {
  showMonsterLog = !showMonsterLog;
  setValue('showMonsterLog', showMonsterLog);
}

function storeDescription(creature, logCreature) {
  logCreature.creature_class = fallback(logCreature.creature_class,
    creature.creature_class);
  logCreature.image_id = fallback(logCreature.image_id, creature.image_id);
  logCreature.level = fallback(logCreature.level, Number(creature.level));
  logCreature.type = fallback(logCreature.type, creature.type);
}

function updateMinMax(_logStat, creatureStat) {
  var logStat = fallback(_logStat, {});
  if (logStat.min) {
    logStat.min = Math.min(logStat.min, creatureStat);
  } else {
    logStat.min = creatureStat;
  }
  if (logStat.max) {
    logStat.max = Math.max(logStat.max, creatureStat);
  } else {
    logStat.max = creatureStat;
  }
  return logStat;
}

var stats = ['attack', 'armor', 'damage', 'defense', 'hp'];

function storeStats(creature, logCreature) {
  stats.forEach(function(stat) {
    logCreature[stat] = updateMinMax(logCreature[stat], Number(creature[stat]));
  });
}

function creatureHazEnhancements(creature) {
  return creature.enhancements && creature.enhancements.length > 0;
}

function storeEnhancements(creature, logCreature) {
  if (creatureHazEnhancements(creature)) {
    logCreature.enhancements = fallback(logCreature.enhancements, {});
    var logEnh = logCreature.enhancements;
    creature.enhancements.forEach(function(e) {
      logEnh[e.name] = updateMinMax(logEnh[e.name], Number(e.value));
    });
  }
}

function doMonsterLog(creature) {
  if (!monsterLog) {monsterLog = {};}
  monsterLog[creature.name] = fallback(monsterLog[creature.name], {});
  var logCreature = monsterLog[creature.name];
  storeDescription(creature, logCreature);
  storeStats(creature, logCreature);
  storeEnhancements(creature, logCreature);
  setForage('fsh_monsterLog', monsterLog);
}

export function processMonsterLog(creature) {
  if (showMonsterLog) {doMonsterLog(creature);}
}

export function getMonsterPrefs() {
  showMonsterLog = getValue('showMonsterLog');
  getForage('fsh_monsterLog').done(function(data) {
    monsterLog = data || {};
  });
}
