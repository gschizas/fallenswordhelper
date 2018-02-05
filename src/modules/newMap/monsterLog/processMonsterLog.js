import fallback from '../../system/fallback';
import getForage from '../../ajax/getForage';
import getValue from '../../system/getValue';
import setForage from '../../ajax/setForage';
import {setValue} from '../../system/system';

export var showMonsterLog;
var monsterLog;

export function toggleShowMonsterLog() {
  showMonsterLog = !showMonsterLog;
  setValue('showMonsterLog', showMonsterLog);
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

function creatureHazEnhancements(creature) {
  return creature.enhancements && creature.enhancements.length > 0;
}

function doMonsterLog(creature) {
  monsterLog[creature.name] = fallback(monsterLog[creature.name], {});
  var logCreature = monsterLog[creature.name];
  logCreature.creature_class = fallback(logCreature.creature_class,
    creature.creature_class);
  logCreature.image_id = fallback(logCreature.image_id,
    creature.image_id);
  logCreature.level = fallback(logCreature.level,
    Number(creature.level));
  logCreature.type = fallback(logCreature.type, creature.type);
  logCreature.armor = updateMinMax(logCreature.armor,
    Number(creature.armor));
  logCreature.attack = updateMinMax(logCreature.attack,
    Number(creature.attack));
  logCreature.damage = updateMinMax(logCreature.damage,
    Number(creature.damage));
  logCreature.defense = updateMinMax(logCreature.defense,
    Number(creature.defense));
  logCreature.hp = updateMinMax(logCreature.hp,
    Number(creature.hp));
  if (creatureHazEnhancements(creature)) {
    logCreature.enhancements = fallback(logCreature.enhancements, {});
    var logEnh = logCreature.enhancements;
    creature.enhancements.forEach(function(e) {
      logEnh[e.name] = updateMinMax(logEnh[e.name], Number(e.value));
    });
  }
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
