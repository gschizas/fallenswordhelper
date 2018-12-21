import addCommas from '../../../system/addCommas';
import {defenderMultiplier} from '../../../support/constants';
import fallback from '../../../system/fallback';
import playerDataObject from '../../../common/playerDataObject';
import reduceBuffArray from '../../../common/reduceBuffArray';
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

function withRelicMultiplier(val) {
  return Math.round(val * relicMultiplier);
}

function updateDefenderValues() {
  defRawAttack += withRelicMultiplier(leadDefender.attackValue);
  defRawDefense += withRelicMultiplier(leadDefender.defenseValue);
  defRawArmor += withRelicMultiplier(leadDefender.armorValue);
  defRawDamage += withRelicMultiplier(leadDefender.damageValue);
  defRawHp += withRelicMultiplier(leadDefender.hpValue);
}

function updateDefenderElements() {
  attackElement.textContent = addCommas(defRawAttack);
  defenseElement.textContent = addCommas(defRawDefense);
  armorElement.textContent = addCommas(defRawArmor);
  damageElement.textContent = addCommas(defRawDamage);
  hpElement.textContent = addCommas(defRawHp);
  defCloakedElement.textContent = defCloaked.toString();
  defProcessed += 1;
  defProcessedElement.textContent = defProcessed.toString();
}

function updateGroupValues() {
  if (!groupStats) {return;}
  groupAttackElement.textContent = addCommas(groupStats.attack);
  groupDefenseElement.textContent = addCommas(groupStats.defense);
  groupArmorElement.textContent = addCommas(groupStats.armor);
  groupDamageElement.textContent = addCommas(groupStats.damage);
  groupHPElement.textContent = addCommas(groupStats.hp);
}

function calcNmvEffect(buffs) {
  return Math.ceil(groupStats.attack *
    (fallback(buffs['Nightmare Visage'], 0) * 0.0025));
}

function doGroupAttackBuffedElement() {
  var storedFlinchEffectValue = Math.ceil(groupStats.attack *
    leadDefender.flinchLevel * 0.001);
  groupAttackBuffedElement.textContent = addCommas(groupStats.attack -
    storedFlinchEffectValue);
}

function calcDefWithConst(buffs) {
  return Math.ceil(groupStats.defense *
    (1 + fallback(buffs.Constitution, 0) * 0.001));
}

function doGroupDefenseBuffedElement(nmv, defConst) {
  groupDefenseBuffedElement.textContent = addCommas(defConst + nmv);
}

function doGroupArmorBuffedElement(buffs) {
  groupArmorBuffedElement.textContent = addCommas(groupStats.armor +
    Math.floor(groupStats.armor * fallback(buffs.Sanctuary, 0) * 0.001));
}

function calcFortitudeBonusHP(buffs, defenseWithConstitution) {
  return Math.ceil(defenseWithConstitution *
    fallback(buffs.Fortitude, 0) * 0.001);
}

function doGroupHPBuffedElement(fortitudeBonusHP) {
  groupHPBuffedElement.textContent = addCommas(groupStats.hp +
    fortitudeBonusHP);
}

function doGroupDamageBuffedElement(buffs, fortitudeBonusHP) {
  var chiStrikeBonusDamage = Math.ceil((groupStats.hp + fortitudeBonusHP) *
    fallback(buffs['Chi Strike'], 0) * 0.001);
  var storedTerrorizeEffectValue = Math.ceil(
    groupStats.damage * leadDefender.terrorizeLevel * 0.001);
  groupDamageBuffedElement.textContent = addCommas(groupStats.damage +
    chiStrikeBonusDamage - storedTerrorizeEffectValue);
}

function doGroupAttributeElements(buffs) {
  var nightmareVisageEffect = calcNmvEffect(buffs);
  groupStats.attack -= nightmareVisageEffect; // <-- important
  doGroupAttackBuffedElement();
  var defenseWithConstitution = calcDefWithConst(buffs);
  doGroupDefenseBuffedElement(nightmareVisageEffect, defenseWithConstitution);
  doGroupArmorBuffedElement(buffs);
  var fortitudeBonusHP = calcFortitudeBonusHP(buffs, defenseWithConstitution);
  doGroupHPBuffedElement(fortitudeBonusHP);
  doGroupDamageBuffedElement(buffs, fortitudeBonusHP);
}

function flinchEffectOnDefenders(buffs) {
  var flinchEffectValue = Math.ceil(defBuffedAttack *
    fallback(buffs.Flinch, 0) * 0.001);
  attackBuffedElement.textContent = addCommas(defBuffedAttack -
    flinchEffectValue);
}

function terrorizeEffectOnDefenders(buffs) {
  var terrorizeEffectValue = Math.ceil(defBuffedDamage *
    fallback(buffs.Terrorize, 0) * 0.001);
  damageBuffedElement.textContent = addCommas(defBuffedDamage -
    terrorizeEffectValue);
}

function calculateGroup() {
  processingStatus.textContent = 'Processing attacking group stats ... ';
  if (mercStats) {deductMercStats();}
  updateGroupValues();
  var buffs = reduceBuffArray(GameData.player().buffs);
  doGroupAttributeElements(buffs);
  flinchEffectOnDefenders(buffs); // Effect on defending group from Flinch on attacking group.
  terrorizeEffectOnDefenders(buffs);
  processingStatus.textContent = 'Done.';
}

function calcDefenderNmvEffect() {
  return Math.ceil(defRawAttack * (leadDefender.nightmareVisageLevel * 0.0025));
}

function calcDefenderDefenseWithConst() {
  return Math.ceil(defRawDefense *
    (1 + leadDefender.constitutionLevel * 0.001));
}

function updateDefenderBuffedAttack(nmvEffect) {
  defBuffedAttack = defRawAttack - nmvEffect;
  attackBuffedElement.textContent = addCommas(defBuffedAttack);
}

function updateDefenderBuffedDefense(nmv, defWithConst) {
  var defBuffedDefense = defWithConst + nmv;
  defenseBuffedElement.textContent = addCommas(defBuffedDefense);
  dc225Element.textContent = addCommas(Math.ceil(
    defBuffedDefense * 0.55));
  dc175Element.textContent = addCommas(Math.ceil(
    defBuffedDefense * 0.65));
}

function updateDefenderBuffedArmor() {
  armorBuffedElement.textContent = addCommas(defRawArmor +
    Math.floor(defRawArmor * leadDefender.sanctuaryLevel * 0.001));
}

function calcDefenderFortitudeBonusHp(defWithConst) {
  return Math.ceil(defWithConst * leadDefender.fortitudeLevel * 0.001);
}

function updateDefenderBuffedDamage(defBuffedHp) {
  var chiStrikeBonusDamage = Math.ceil(defBuffedHp *
    leadDefender.chiStrikeLevel * 0.001);
  defBuffedDamage = defRawDamage + chiStrikeBonusDamage;
  damageBuffedElement.textContent = addCommas(defBuffedDamage);
}

function isLeadDefenderCloaked() {
  if (leadDefender.cloakLevel !== 0) {
    lDCloakedElement.textContent = 'Yes';
  }
}

export function doCalculations() {
  processingStatus.textContent = 'Processing defending guild stats ... ';
  updateDefenderValues();
  updateDefenderElements();
  var nmvEffect = calcDefenderNmvEffect();
  updateDefenderBuffedAttack(nmvEffect);
  var defWithConst = calcDefenderDefenseWithConst();
  updateDefenderBuffedDefense(nmvEffect, defWithConst);
  updateDefenderBuffedArmor();
  var defBuffedHp = defRawHp + calcDefenderFortitudeBonusHp(defWithConst);
  hpBuffedElement.textContent = addCommas(defBuffedHp);
  updateDefenderBuffedDamage(defBuffedHp);
  isLeadDefenderCloaked();
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
  updateDefenderElements();
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
