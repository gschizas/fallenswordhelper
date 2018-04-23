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

var statList = [
  ['levelValue', 'level'],
  ['attackValue', 'attack'],
  ['attackBonus', 'bonus_attack'],
  ['defenseValue', 'defense'],
  ['defenseBonus', 'bonus_defense'],
  ['armorValue', 'armor'],
  ['armorBonus', 'bonus_armor'],
  ['damageValue', 'damage'],
  ['damageBonus', 'bonus_damage'],
  ['hpValue', 'hp'],
  ['hpBonus', 'bonus_hp'],
  ['killStreakValue', 'killstreak']
];

function importStats(obj, json) {
  statList.forEach(function(el) {
    obj[el[0]] = Number(json[el[1]]);
  });
}

var buffList = [
  ['counterAttackLevel', 'Counter Attack'],
  ['doublerLevel', 'Doubler'],
  ['deathDealerLevel', 'Death Dealer'],
  ['darkCurseLevel', 'Dark Curse'],
  ['holyFlameLevel', 'Holy Flame'],
  ['constitutionLevel', 'Constitution'],
  ['sanctuaryLevel', 'Sanctuary'],
  ['flinchLevel', 'Flinch'],
  ['nightmareVisageLevel', 'Nightmare Visage'],
  ['superEliteSlayerLevel', 'Super Elite Slayer'],
  ['fortitudeLevel', 'Fortitude'],
  ['chiStrikeLevel', 'Chi Strike'],
  ['terrorizeLevel', 'Terrorize'],
  ['barricadeLevel', 'Barricade'],
  ['reignOfTerrorLevel', 'Reign Of Terror'],
  ['anchoredLevel', 'Anchored'],
  ['severeConditionLevel', 'Severe Condition'],
  ['entrenchLevel', 'Entrench'],
  ['cloakLevel', 'Cloak']
];

function importBuffs(obj, buffs) {
  buffList.forEach(function(el) {
    obj[el[0]] = fallback(buffs[el[1]], 0);
  });
}

export default function playerDataObject(json) {
  var buffs = reduceBuffArray(json._skills);
  var obj = {};
  importStats(obj, json);
  importBuffs(obj, buffs);
  obj.superEliteSlayerMultiplier = Math.round(0.002 *
    obj.superEliteSlayerLevel * 100) / 100;
  if (obj.cloakLevel !== 0) {updateForCloak(obj);}
  return obj;
}
