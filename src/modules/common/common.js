import {createDocument} from '../system/system';
import fallback from '../system/fallback';
import intValue from '../system/intValue';
import reduceBuffArray from './reduceBuffArray';

function getStat(stat, doc) { // jQuery
  // 'Hidden' returns NaN
  return intValue(
    $(stat, doc)
      .contents()
      .filter(function(i, e) {
        return e.nodeType === 3;
      })[0].nodeValue
  );
}

function getBuffLevel(doc, buff) { // jQuery
  var hasBuff = $('img.tip-static[data-tipped*="b>' + buff + '</b"]', doc)
    .data('tipped');
  // var re = new RegExp('</b> \\(Level: (\\d+)\\)');
  var test = /<\/b> \(Level: (\d+)\)/.exec(hasBuff);
  if (test) {return intValue(test[1]);}
  return 0;
}

function getBonus(stat, doc) { // jQuery
  var target = $(stat, doc);
  var children = target.children();
  if (children.length === 0) {
    children = target.next();
  }
  return intValue(children.text().slice(2, -1));
}

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

function attackValueIsNumber(atk) {
  return typeof atk === 'number' && !isNaN(atk);
}

export function playerDataString(responseText) {
  var doc = createDocument(responseText);
  var obj = {
    levelValue: getStat('#stat-vl', doc),
    attackValue: getStat('#stat-attack', doc),
    attackBonus: getBonus('#stat-attack', doc),
    defenseValue: getStat('#stat-defense', doc),
    defenseBonus: getBonus('#stat-defense', doc),
    armorValue: getStat('#stat-armor', doc),
    armorBonus: getBonus('#stat-armor', doc),
    damageValue: getStat('#stat-damage', doc),
    damageBonus: getBonus('#stat-damage', doc),
    hpValue: getStat('#stat-hp', doc),
    hpBonus: getBonus('#stat-hp', doc),
    killStreakValue: getStat('#stat-kill-streak', doc),
    // get buffs here later ... DD, CA, DC, Constitution, etc
    counterAttackLevel: getBuffLevel(doc, 'Counter Attack'),
    doublerLevel: getBuffLevel(doc, 'Doubler'),
    deathDealerLevel: getBuffLevel(doc, 'Death Dealer'),
    darkCurseLevel: getBuffLevel(doc, 'Dark Curse'),
    holyFlameLevel: getBuffLevel(doc, 'Holy Flame'),
    constitutionLevel: getBuffLevel(doc, 'Constitution'),
    sanctuaryLevel: getBuffLevel(doc, 'Sanctuary'),
    flinchLevel: getBuffLevel(doc, 'Flinch'),
    nightmareVisageLevel: getBuffLevel(doc, 'Nightmare Visage'),
    superEliteSlayerLevel: getBuffLevel(doc, 'Super Elite Slayer'),
    fortitudeLevel: getBuffLevel(doc, 'Fortitude'),
    chiStrikeLevel: getBuffLevel(doc, 'Chi Strike'),
    terrorizeLevel: getBuffLevel(doc, 'Terrorize'),
    barricadeLevel: getBuffLevel(doc, 'Barricade'),
    reignOfTerrorLevel: getBuffLevel(doc, 'Reign Of Terror'),
    anchoredLevel: getBuffLevel(doc, 'Anchored'),
    severeConditionLevel: getBuffLevel(doc, 'Severe Condition'),
    entrenchLevel: getBuffLevel(doc, 'Entrench'),
    cloakLevel: getBuffLevel(doc, 'Cloak')
  };
  obj.superEliteSlayerMultiplier = Math.round(0.002 *
    obj.superEliteSlayerLevel * 100) / 100;

  if (obj.cloakLevel === 0 ||
      attackValueIsNumber(obj.attackValue)) {
    return obj;
  }

  updateForCloak(obj);
  return obj;
}

function getBuffLvl(buffs, buff) {
  return fallback(buffs[buff], 0);
}

export function playerDataObject(json) {
  var buffs = reduceBuffArray(json._skills);
  var obj = {
    levelValue: json.level,
    attackValue: json.attack,
    attackBonus: json.bonus_attack,
    defenseValue: json.defense,
    defenseBonus: json.bonus_defense,
    armorValue: json.armor,
    armorBonus: json.bonus_armor,
    damageValue: json.damage,
    damageBonus: json.bonus_damage,
    hpValue: json.hp,
    hpBonus: json.bonus_hp,
    killStreakValue: intValue(json.killstreak),
    // get buffs here later ... DD, CA, DC, Constitution, etc
    counterAttackLevel: getBuffLvl(buffs, 'Counter Attack'),
    doublerLevel: getBuffLvl(buffs, 'Doubler'),
    deathDealerLevel: getBuffLvl(buffs, 'Death Dealer'),
    darkCurseLevel: getBuffLvl(buffs, 'Dark Curse'),
    holyFlameLevel: getBuffLvl(buffs, 'Holy Flame'),
    constitutionLevel: getBuffLvl(buffs, 'Constitution'),
    sanctuaryLevel: getBuffLvl(buffs, 'Sanctuary'),
    flinchLevel: getBuffLvl(buffs, 'Flinch'),
    nightmareVisageLevel: getBuffLvl(buffs, 'Nightmare Visage'),
    superEliteSlayerLevel: getBuffLvl(buffs, 'Super Elite Slayer'),
    fortitudeLevel: getBuffLvl(buffs, 'Fortitude'),
    chiStrikeLevel: getBuffLvl(buffs, 'Chi Strike'),
    terrorizeLevel: getBuffLvl(buffs, 'Terrorize'),
    barricadeLevel: getBuffLvl(buffs, 'Barricade'),
    reignOfTerrorLevel: getBuffLvl(buffs, 'Reign Of Terror'),
    anchoredLevel: getBuffLvl(buffs, 'Anchored'),
    severeConditionLevel: getBuffLvl(buffs, 'Severe Condition'),
    entrenchLevel: getBuffLvl(buffs, 'Entrench'),
    cloakLevel: getBuffLvl(buffs, 'Cloak')
  };
  if (obj.cloakLevel !== 0) {updateForCloak(obj);}
  return obj;
}
