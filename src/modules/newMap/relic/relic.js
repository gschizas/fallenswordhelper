import assets from './assets';
import {doBuffLinks} from '../../support/layout';
import {getElementById} from '../../common/getElement';
import getGroupStats from '../../ajax/getGroupStats';
import getMembrList from '../../ajax/getMembrList';
import getMercStats from '../../ajax/getMercStats';
import getProfile from '../../ajax/getProfile';
import {playerDataObject} from '../../common/common';
import reduceBuffArray from '../../common/reduceBuffArray';
import retryAjax from '../../ajax/retryAjax';
import {
  addCommas,
  createDocument,
  fallback,
  getValue
} from '../../support/system';
import {createButton, createDiv} from '../../common/cElement';
import {defenderMultiplier, nowSecs} from '../../support/dataObj';

var relicData;
var containerDiv;
var leftDiv;
var fetchStatsBtn;
var midDiv;
var rightDiv;
var hideRelicOffline;
var player;
var guildMemberList;
var myDefenders;
var twoMinutes;
var sevenDays;
var memberExclusions = [
  function(key) {return key === 'lastUpdate';},
  function(key) {return myDefenders.indexOf(key) !== -1;},
  function(key) {return !guildMemberList[key].last_login;},
  function(key) {return Number(guildMemberList[key].last_login) >= twoMinutes;},
  function(key) {return Number(guildMemberList[key].last_login) <= sevenDays;},
  function(key) {
    return guildMemberList[key].level >= 400 &&
      guildMemberList[key].level <= 421;
  },
  function(key) {
    return guildMemberList[key].level >= 441 &&
      guildMemberList[key].level <= 450;
  }
];
var relicCount;
var relicMultiplier;
var processingStatus;
var attackElement;
var defRawAttack;
var attackBuffedElement;
var defBuffedAttack;
var defenseElement;
var defRawDefense;
var defenseBuffedElement;
var armorElement;
var defRawArmor;
var armorBuffedElement;
var damageElement;
var defRawDamage;
var damageBuffedElement;
var defBuffedDamage;
var hpElement;
var defRawHp;
var hpBuffedElement;
var defCloaked;
var defCloakedElement;
var defProcessedElement;
var defProcessed;
var dc225Element;
var dc175Element;
var groupAttackElement;
var groupAttackBuffedElement;
var groupDefenseElement;
var groupDefenseBuffedElement;
var groupArmorElement;
var groupArmorBuffedElement;
var groupDamageElement;
var groupDamageBuffedElement;
var groupHPElement;
var groupHPBuffedElement;
var leadDefender;
var groupStats;
var mercStats;

function ajaxFailure(jqXHR) {
  processingStatus.textContent = jqXHR.status.toString() + ' ' +
    jqXHR.statusText;
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

function deductMercStats() {
  groupStats.attack -= mercStats.attack;
  groupStats.defense -= mercStats.defense;
  groupStats.armor -= mercStats.armor;
  groupStats.damage -= mercStats.damage;
  groupStats.hp -= mercStats.hp;
}

function calculateGroup() {
  processingStatus.textContent = 'Processing attacking group stats ... ';
  if (mercStats) {deductMercStats();}
  groupAttackElement.textContent = addCommas(groupStats.attack);
  groupDefenseElement.textContent = addCommas(groupStats.defense);
  groupArmorElement.textContent = addCommas(groupStats.armor);
  groupDamageElement.textContent = addCommas(groupStats.damage);
  groupHPElement.textContent = addCommas(groupStats.hp);

  var buffs = reduceBuffArray(player.buffs);

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

function doCalculations() {
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
    getElementById('LDCloaked').textContent = 'Yes';
  }

  if (player.hasGroup) {
    calculateGroup();
  } else {
    processingStatus.textContent = 'Done.';
  }

}

function missingMembers(membrList) {
  guildMemberList = membrList;
  var myMembers = Object.keys(guildMemberList);
  twoMinutes = nowSecs - 120;
  sevenDays = nowSecs - 604800;
  var filtered = myMembers.reduce(function(prev, key) {
    for (var i = 0; i < memberExclusions.length; i += 1) {
      if (memberExclusions[i](key)) {return prev;}
    }
    prev.push('<a href="index.php?cmd=profile&player_id=' +
      guildMemberList[key].id + '">' + key + '</a>');
    return prev;
  }, []);
  containerDiv.insertAdjacentHTML('beforeend',
    '<div class="fshFloatLeft fshRelicLowDiv"><table class="relicT">' +
    '<thead><tr><th>Offline guild members not at relic:</th></tr></thead>' +
    '<tbody><tr><td>' + filtered.join(' ') + '</td></tr></tbody>' +
    '</table></div>');
}

function setDefVars() {
  attackElement = getElementById('attackValue');
  attackBuffedElement = getElementById('attackValueBuffed');
  defenseElement = getElementById('defenseValue');
  defenseBuffedElement = getElementById('defenseValueBuffed');
  armorElement = getElementById('armorValue');
  armorBuffedElement = getElementById('armorValueBuffed');
  damageElement = getElementById('damageValue');
  damageBuffedElement = getElementById('damageValueBuffed');
  hpElement = getElementById('hpValue');
  hpBuffedElement = getElementById('hpValueBuffed');
  defCloakedElement = getElementById('defendersCloaked');
  defProcessedElement = getElementById('defendersProcessed');
}

function setAtkVars() {
  dc225Element = getElementById('DC225');
  dc175Element = getElementById('DC175');
  groupAttackElement = getElementById('GroupAttack');
  groupAttackBuffedElement = getElementById('GroupAttackBuffed');
  groupDefenseElement = getElementById('GroupDefense');
  groupDefenseBuffedElement = getElementById('GroupDefenseBuffed');
  groupArmorElement = getElementById('GroupArmor');
  groupArmorBuffedElement = getElementById('GroupArmorBuffed');
  groupDamageElement = getElementById('GroupDamage');
  groupDamageBuffedElement = getElementById('GroupDamageBuffed');
  groupHPElement = getElementById('GroupHP');
  groupHPBuffedElement = getElementById('GroupHPBuffed');
}

function prepareDivs() {
  fetchStatsBtn.classList.add('fshHide');
  hideRelicOffline = getValue('hideRelicOffline');
  if (relicData.is_owner && !hideRelicOffline) {
    getMembrList(false).done(missingMembers);
  }
  leftDiv.insertAdjacentHTML('beforeend', assets.proc);
  processingStatus = getElementById('ProcessingStatus');
  midDiv = createDiv({
    className: 'fshFloatLeft fshRelicMidDiv',
    innerHTML: assets.defStats
  });
  containerDiv.appendChild(midDiv);
  setDefVars();
  rightDiv = createDiv({
    className: 'fshFloatLeft fshRelicRightDiv',
    innerHTML: assets.atkStats
  });
  containerDiv.appendChild(rightDiv);
  setAtkVars();
}

function getGuild() {
  return retryAjax({
    url: 'index.php',
    data: {
      cmd: 'guild',
      subcmd: 'view',
      guild_id: relicData.controlled_by.guild_id
    }
  });
}

function calcRelicMultiplier(rels) {
  if (rels === 1) {return 1.5;}
  return Math.round((1 - rels / 10) * 100) / 100;
}

function parseGuild(html) {
  var doc = createDocument(html);
  var nodeList = doc.querySelectorAll('#pCC img[src*="/relics/"]');
  relicCount = nodeList.length;
  getElementById('relicCount').textContent = relicCount.toString();
  relicMultiplier = calcRelicMultiplier(relicCount);
  getElementById('LDPercentage').textContent =
    (relicMultiplier * 100).toString() + '%';
}

function parseDefender(json) {
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

function storeLeadDefender(json) {
  leadDefender = playerDataObject(json);
}

function getGroups() {
  return retryAjax({
    url: 'index.php',
    data: {
      cmd: 'guild',
      subcmd: 'groups'
    }
  });
}

function storeGroupStats(obj) {
  groupStats = obj;
}

function storeMercStats(obj) {
  mercStats = obj;
}

function parseGroups(html) {
  var doc = createDocument(html);
  var disband = doc.querySelector('#pCC a[href*="confirmDisband"]');
  var viewStats = disband.previousElementSibling.href;
  var prm = [getGroupStats(viewStats).done(storeGroupStats)];
  var hasMerc = disband.parentNode.parentNode.previousElementSibling
    .previousElementSibling.innerHTML.indexOf('"#000099"') !== -1;
  if (hasMerc) {
    prm.push(getMercStats().done(storeMercStats));
  }
  return $.when.apply($, prm);
}

function resetCounters() {
  defRawAttack = 0;
  defRawDefense = 0;
  defRawArmor = 0;
  defRawDamage = 0;
  defRawHp = 0;
  defCloaked = 0;
  defProcessed = 0;
}

function getStats() {
  prepareDivs();
  resetCounters();
  player = GameData.player();
  var prm = [];
  prm.push(getGuild().done(parseGuild));
  if (player.hasGroup) {
    prm.push(getGroups().pipe(parseGroups));
  }
  for (var i = 1; i < myDefenders.length; i += 1) {
    prm.push(getProfile(myDefenders[i]).done(parseDefender)
      .fail(ajaxFailure));
  }
  prm.push(getProfile(myDefenders[0]).done(storeLeadDefender));
  $.when.apply($, prm).done(doCalculations);
}

function setup() {
  myDefenders = relicData.defenders.map(function(x) {
    return x.player_name;
  });
  if (containerDiv) {
    containerDiv.innerHTML = '';
  } else {
    containerDiv = createDiv({className: 'body'});
  }
  leftDiv = createDiv({className: 'fshFloatLeft fshRelicLeftDiv'});
  containerDiv.appendChild(leftDiv);
  if (relicData.is_owner) {
    leftDiv.appendChild(doBuffLinks(myDefenders));
  }
  fetchStatsBtn = createButton({
    className: 'custombutton',
    textContent: 'Fetch Stats'
  });
  fetchStatsBtn.addEventListener('click', getStats);
  leftDiv.appendChild(fetchStatsBtn);
  var dialogRelic = getElementById('dialog-relic');
  dialogRelic.appendChild(containerDiv);
}

function viewRelic(e, data) {
  relicData = data.response.data;
  if (relicData.defenders.length > 0) {setup();}
}

export default function injectRelic() {
  $.subscribe('9-success.action-response', viewRelic);
}
