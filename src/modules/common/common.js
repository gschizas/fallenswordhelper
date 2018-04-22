import fallback from '../system/fallback';
import reduceBuffArray from './reduceBuffArray';

function cloakGuess(bonus, level) {
  if (bonus > level * 10 ||
      bonus < level) {
    return bonus;
  }
  return level * 10;
}

function updateForCloak(obj) {
  obj.attackValue = cloakGuess(obj.attackBonus, obj.levelValue);
  obj.defenseValue = cloakGuess(obj.defenseBonus, obj.levelValue);
  obj.armorValue = cloakGuess(obj.armorBonus, obj.levelValue);
  obj.damageValue = cloakGuess(obj.damageBonus, obj.levelValue);
  obj.hpValue = obj.hpBonus;
}

function importStats(obj, json) {
  obj.levelValue = json.level;
  obj.attackValue = json.attack;
  obj.attackBonus = json.bonus_attack;
  obj.defenseValue = json.defense;
  obj.defenseBonus = json.bonus_defense;
  obj.armorValue = json.armor;
  obj.armorBonus = json.bonus_armor;
  obj.damageValue = json.damage;
  obj.damageBonus = json.bonus_damage;
  obj.hpValue = json.hp;
  obj.hpBonus = json.bonus_hp;
  obj.killStreakValue = Number(json.killstreak);
}

function importBuffs(obj, buffs) {
  obj.counterAttackLevel = fallback(buffs['Counter Attack'], 0);
  obj.doublerLevel = fallback(buffs.Doubler, 0);
  obj.deathDealerLevel = fallback(buffs['Death Dealer'], 0);
  obj.darkCurseLevel = fallback(buffs['Dark Curse'], 0);
  obj.holyFlameLevel = fallback(buffs['Holy Flame'], 0);
  obj.constitutionLevel = fallback(buffs.Constitution, 0);
  obj.sanctuaryLevel = fallback(buffs.Sanctuary, 0);
  obj.flinchLevel = fallback(buffs.Flinch, 0);
  obj.nightmareVisageLevel = fallback(buffs['Nightmare Visage'], 0);
  obj.superEliteSlayerLevel = fallback(buffs['Super Elite Slayer'], 0);
  obj.fortitudeLevel = fallback(buffs.Fortitude, 0);
  obj.chiStrikeLevel = fallback(buffs['Chi Strike'], 0);
  obj.terrorizeLevel = fallback(buffs.Terrorize, 0);
  obj.barricadeLevel = fallback(buffs.Barricade, 0);
  obj.reignOfTerrorLevel = fallback(buffs['Reign Of Terror'], 0);
  obj.anchoredLevel = fallback(buffs.Anchored, 0);
  obj.severeConditionLevel = fallback(buffs['Severe Condition'], 0);
  obj.entrenchLevel = fallback(buffs.Entrench, 0);
  obj.cloakLevel = fallback(buffs.Cloak, 0);
}

export function playerDataObject(json) {
  var buffs = reduceBuffArray(json._skills);
  var obj = {};
  importStats(obj, json);
  importBuffs(obj, buffs);
  obj.superEliteSlayerMultiplier = Math.round(0.002 *
    obj.superEliteSlayerLevel * 100) / 100;
  if (obj.cloakLevel !== 0) {updateForCloak(obj);}
  return obj;
}
