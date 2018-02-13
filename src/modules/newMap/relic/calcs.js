import addCommas from '../../system/addCommas';
import {defenderMultiplier} from '../../support/constants';
import fallback from '../../system/fallback';
import {playerDataObject} from '../../common/common';
import reduceBuffArray from '../../common/reduceBuffArray';
import {relicMultiplier} from './parseGuild';
import {
  armorBuffedElement,
  armorElement,
  attackBuffedElement,
  attackElement,
  damageBuffedElement,
  damageElement,
  dc175Element,
  dc225Element,
  defCloakedElement,
  defProcessedElement,
  defenseBuffedElement,
  defenseElement,
  groupArmorBuffedElement,
  groupArmorElement,
  groupAttackBuffedElement,
  groupAttackElement,
  groupDamageBuffedElement,
  groupDamageElement,
  groupDefenseBuffedElement,
  groupDefenseElement,
  groupHPBuffedElement,
  groupHPElement,
  hpBuffedElement,
  hpElement,
  lDCloakedElement,
  processingStatus
} from './secondaryElements';

var defRawAttack;
var defBuffedAttack;
var defRawDefense;
var defRawArmor;
var defRawDamage;
var defBuffedDamage;
var defRawHp;
var defCloaked;
var defProcessed;
var leadDefender;
var groupStats;
var mercStats;

function deductMercStats() {
  groupStats.attack -= mercStats.attack;
  groupStats.defense -= mercStats.defense;
  groupStats.armor -= mercStats.armor;
  groupStats.damage -= mercStats.damage;
  groupStats.hp -= mercStats.hp;
}

function updateDefValues() {
  attackElement.textContent = addCommas(defRawAttack);
  defenseElement.textContent = addCommas(defRawDefense);
  armorElement.textContent = addCommas(defRawArmor);
  damageElement.textContent = addCommas(defRawDamage);
  hpElement.textContent = addCommas(defRawHp);
  defCloakedElement.textContent = defCloaked.toString();
  defProcessed += 1;
  defProcessedElement.textContent = defProcessed.toString();
}

function calculateGroup() {
  processingStatus.textContent = 'Processing attacking group stats ... ';
  if (mercStats) {deductMercStats();}
  groupAttackElement.textContent = addCommas(groupStats.attack);
  groupDefenseElement.textContent = addCommas(groupStats.defense);
  groupArmorElement.textContent = addCommas(groupStats.armor);
  groupDamageElement.textContent = addCommas(groupStats.damage);
  groupHPElement.textContent = addCommas(groupStats.hp);

  var buffs = reduceBuffArray(GameData.player().buffs);

  var nightmareVisageEffect = Math.ceil(groupStats.attack *
    (fallback(buffs['Nightmare Visage'], 0) * 0.0025));
  groupStats.attack -= nightmareVisageEffect;

  var storedFlinchEffectValue = Math.ceil(groupStats.attack *
    leadDefender.flinchLevel * 0.001);
  groupAttackBuffedElement.textContent = addCommas(groupStats.attack -
    storedFlinchEffectValue);

  var defenseWithConstitution = Math.ceil(groupStats.defense *
    (1 + fallback(buffs.Constitution, 0) * 0.001));
  var totalDefense = defenseWithConstitution + nightmareVisageEffect;
  groupDefenseBuffedElement.textContent = addCommas(totalDefense);

  groupArmorBuffedElement.textContent = addCommas(groupStats.armor +
    Math.floor(groupStats.armor * fallback(buffs.Sanctuary, 0) * 0.001));

  var fortitudeBonusHP = Math.ceil(defenseWithConstitution *
    fallback(buffs.Fortitude, 0) * 0.001);
  var chiStrikeBonusDamage = Math.ceil((groupStats.hp + fortitudeBonusHP) *
    fallback(buffs['Chi Strike'], 0) * 0.001);
  var storedTerrorizeEffectValue = Math.ceil(
    groupStats.damage * leadDefender.terrorizeLevel * 0.001);
  groupDamageBuffedElement.textContent = addCommas(groupStats.damage +
    chiStrikeBonusDamage - storedTerrorizeEffectValue);
  groupHPBuffedElement.textContent = addCommas(groupStats.hp +
    fortitudeBonusHP);

  // Effect on defending group from Flinch on attacking group.
  var flinchEffectValue = Math.ceil(defBuffedAttack *
    fallback(buffs.Flinch, 0) * 0.001);
  defenseBuffedElement.textContent = addCommas(defBuffedAttack -
    flinchEffectValue);
  var terrorizeEffectValue = Math.ceil(defBuffedDamage *
    fallback(buffs.Terrorize, 0) * 0.001);
  damageBuffedElement.textContent = addCommas(defBuffedDamage -
    terrorizeEffectValue);

  processingStatus.textContent = 'Done.';
}

export function doCalculations() {
  processingStatus.textContent = 'Processing defending guild stats ... ';

  defRawAttack += Math.round(leadDefender.attackValue * relicMultiplier);
  var nightmareVisageEffect = Math.ceil(defRawAttack *
    (leadDefender.nightmareVisageLevel * 0.0025));

  defRawDefense += Math.round(leadDefender.defenseValue * relicMultiplier);
  var defenseWithConstitution = Math.ceil(defRawDefense *
    (1 + leadDefender.constitutionLevel * 0.001));
  var defBuffedDefense = defenseWithConstitution + nightmareVisageEffect;

  defRawArmor += Math.round(leadDefender.armorValue * relicMultiplier);

  defRawDamage += Math.round(leadDefender.damageValue * relicMultiplier);
  defRawHp += Math.round(leadDefender.hpValue * relicMultiplier);
  var fortitudeBonusHP = Math.ceil(defenseWithConstitution *
    leadDefender.fortitudeLevel * 0.001);
  var defBuffedHp = defRawHp + fortitudeBonusHP;
  var chiStrikeBonusDamage = Math.ceil(defBuffedHp *
    leadDefender.chiStrikeLevel * 0.001);

  updateDefValues();

  defBuffedAttack = defRawAttack - nightmareVisageEffect;
  attackBuffedElement.textContent = addCommas(defBuffedAttack);
  defenseBuffedElement.textContent = addCommas(defBuffedDefense);
  dc225Element.textContent = addCommas(Math.ceil(
    defBuffedDefense * 0.55));
  dc175Element.textContent = addCommas(Math.ceil(
    defBuffedDefense * 0.65));
  armorBuffedElement.textContent = addCommas(defRawArmor +
    Math.floor(defRawArmor * leadDefender.sanctuaryLevel * 0.001));
  defBuffedDamage = defRawDamage + chiStrikeBonusDamage;
  damageBuffedElement.textContent = addCommas(defBuffedDamage);
  hpBuffedElement.textContent = addCommas(defBuffedHp);

  if (leadDefender.cloakLevel !== 0) {
    lDCloakedElement.textContent = 'Yes';
  }

  if (GameData.player().hasGroup) {
    calculateGroup();
  } else {
    processingStatus.textContent = 'Done.';
  }

}

export function parseDefender(json) {
  var defender = playerDataObject(json);
  defRawAttack += Math.round(defender.attackValue * defenderMultiplier);
  defRawDefense += Math.round(defender.defenseValue *
    defenderMultiplier);
  defRawArmor += Math.round(defender.armorValue * defenderMultiplier);
  defRawDamage += Math.round(defender.damageValue * defenderMultiplier);
  defRawHp += Math.round(defender.hpValue * defenderMultiplier);
  if (defender.cloakLevel !== 0) {defCloaked += 1;}
  updateDefValues();
}

export function storeLeadDefender(json) {
  leadDefender = playerDataObject(json);
}

export function storeGroupStats(obj) {
  groupStats = obj;
}

export function storeMercStats(obj) {
  mercStats = obj;
}

export function resetCounters() {
  defRawAttack = 0;
  defRawDefense = 0;
  defRawArmor = 0;
  defRawDamage = 0;
  defRawHp = 0;
  defCloaked = 0;
  defProcessed = 0;
}
