import assets from './assets';
import * as ajax from '../../support/ajax';
import * as common from '../../common/common';
import * as dataObj from '../../support/dataObj';
import * as layout from '../../support/layout';
import * as system from '../../support/system';

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
  function(key) {return guildMemberList[key].last_login >= twoMinutes;},
  function(key) {return guildMemberList[key].last_login <= sevenDays;},
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
  attackElement.textContent = system.addCommas(defRawAttack);
  defenseElement.textContent = system.addCommas(defRawDefense);
  armorElement.textContent = system.addCommas(defRawArmor);
  damageElement.textContent = system.addCommas(defRawDamage);
  hpElement.textContent = system.addCommas(defRawHp);
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
  groupAttackElement.textContent = system.addCommas(groupStats.attack);
  groupDefenseElement.textContent = system.addCommas(groupStats.defense);
  groupArmorElement.textContent = system.addCommas(groupStats.armor);
  groupDamageElement.textContent = system.addCommas(groupStats.damage);
  groupHPElement.textContent = system.addCommas(groupStats.hp);

  var buffs = common.reduceBuffArray(player.buffs);

  var nightmareVisageEffect = Math.ceil(groupStats.attack *
    (system.fallback(buffs['Nightmare Visage'], 0) * 0.0025));
  groupStats.attack -= nightmareVisageEffect;

  var storedFlinchEffectValue = Math.ceil(groupStats.attack *
    leadDefender.flinchLevel * 0.001);
  groupAttackBuffedElement.textContent = system.addCommas(groupStats.attack -
    storedFlinchEffectValue);

  var defenseWithConstitution = Math.ceil(groupStats.defense *
    (1 + system.fallback(buffs.Constitution, 0) * 0.001));
  var totalDefense = defenseWithConstitution + nightmareVisageEffect;
  groupDefenseBuffedElement.textContent = system.addCommas(totalDefense);

  groupArmorBuffedElement.textContent = system.addCommas(groupStats.armor +
    Math.floor(groupStats.armor * system.fallback(buffs.Sanctuary, 0) * 0.001));

  var fortitudeBonusHP = Math.ceil(defenseWithConstitution *
    system.fallback(buffs.Fortitude, 0) * 0.001);
  var chiStrikeBonusDamage = Math.ceil((groupStats.hp + fortitudeBonusHP) *
    system.fallback(buffs['Chi Strike'], 0) * 0.001);
  var storedTerrorizeEffectValue = Math.ceil(
    groupStats.damage * leadDefender.terrorizeLevel * 0.001);
  groupDamageBuffedElement.textContent = system.addCommas(groupStats.damage +
    chiStrikeBonusDamage - storedTerrorizeEffectValue);
  groupHPBuffedElement.textContent = system.addCommas(groupStats.hp +
    fortitudeBonusHP);

  // Effect on defending group from Flinch on attacking group.
  var flinchEffectValue = Math.ceil(defBuffedAttack *
    system.fallback(buffs.Flinch, 0) * 0.001);
  defenseBuffedElement.textContent = system.addCommas(defBuffedAttack -
    flinchEffectValue);
  var terrorizeEffectValue = Math.ceil(defBuffedDamage *
    system.fallback(buffs.Terrorize, 0) * 0.001);
  damageBuffedElement.textContent = system.addCommas(defBuffedDamage -
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
  attackBuffedElement.textContent = system.addCommas(defBuffedAttack);
  defenseBuffedElement.textContent = system.addCommas(defBuffedDefense);
  dc225Element.textContent = system.addCommas(Math.ceil(
    defBuffedDefense * 0.55));
  dc175Element.textContent = system.addCommas(Math.ceil(
    defBuffedDefense * 0.65));
  armorBuffedElement.textContent = system.addCommas(defRawArmor +
    Math.floor(defRawArmor * leadDefender.sanctuaryLevel * 0.001));
  defBuffedDamage = defRawDamage + chiStrikeBonusDamage;
  damageBuffedElement.textContent = system.addCommas(defBuffedDamage);
  hpBuffedElement.textContent = system.addCommas(defBuffedHp);

  if (leadDefender.cloakLevel !== 0) {
    document.getElementById('LDCloaked').textContent = 'Yes';
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
  var now = Date.now() / 1000;
  twoMinutes = now - 120;
  sevenDays = now - 604800;
  var filtered = myMembers.reduce(function(prev, key) {
    for (var i = 0; i < memberExclusions.length; i += 1) {
      if (memberExclusions[i](key)) {return prev;}
    }
    prev.push('<a href="index.php?cmd=profile&player_id=' +
      guildMemberList[key].id + '">' + key + '</a>');
    return prev;
  }, []);
  containerDiv.insertAdjacentHTML('beforeend',
    '<div class="fshFloatLeft lowDiv"><table class="relicT"><tbody>' +
    '<tr><td class="headr">Offline guild members not at relic:</td></tr>' +
    '<tr><td>' + filtered.join(' ') + '</td></tr></tbody></table></div>');
}

function setDefVars() {
  attackElement = document.getElementById('attackValue');
  attackBuffedElement = document.getElementById('attackValueBuffed');
  defenseElement = document.getElementById('defenseValue');
  defenseBuffedElement = document.getElementById('defenseValueBuffed');
  armorElement = document.getElementById('armorValue');
  armorBuffedElement = document.getElementById('armorValueBuffed');
  damageElement = document.getElementById('damageValue');
  damageBuffedElement = document.getElementById('damageValueBuffed');
  hpElement = document.getElementById('hpValue');
  hpBuffedElement = document.getElementById('hpValueBuffed');
  defCloakedElement = document.getElementById('defendersCloaked');
  defProcessedElement = document.getElementById('defendersProcessed');
}

function setAtkVars() {
  dc225Element = document.getElementById('DC225');
  dc175Element = document.getElementById('DC175');
  groupAttackElement = document.getElementById('GroupAttack');
  groupAttackBuffedElement = document.getElementById('GroupAttackBuffed');
  groupDefenseElement = document.getElementById('GroupDefense');
  groupDefenseBuffedElement = document.getElementById('GroupDefenseBuffed');
  groupArmorElement = document.getElementById('GroupArmor');
  groupArmorBuffedElement = document.getElementById('GroupArmorBuffed');
  groupDamageElement = document.getElementById('GroupDamage');
  groupDamageBuffedElement = document.getElementById('GroupDamageBuffed');
  groupHPElement = document.getElementById('GroupHP');
  groupHPBuffedElement = document.getElementById('GroupHPBuffed');
}

function prepareDivs() {
  fetchStatsBtn.classList.add('fshHide');
  hideRelicOffline = system.getValue('hideRelicOffline');
  if (relicData.is_owner && !hideRelicOffline) {
    ajax.getMembrList(false).done(missingMembers);
  }
  leftDiv.insertAdjacentHTML('beforeend', assets.proc);
  processingStatus = document.getElementById('ProcessingStatus');
  midDiv = document.createElement('div');
  midDiv.className = 'fshFloatLeft midDiv';
  midDiv.insertAdjacentHTML('beforeend', assets.defStats);
  containerDiv.appendChild(midDiv);
  setDefVars();
  rightDiv = document.createElement('div');
  rightDiv.className = 'fshFloatLeft rightDiv';
  rightDiv.insertAdjacentHTML('beforeend', assets.atkStats);
  containerDiv.appendChild(rightDiv);
  setAtkVars();
}

function getGuild() {
  return $.ajax({
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
  var doc = system.createDocument(html);
  var nodeList = doc.querySelectorAll('#pCC img[src*="/relics/"]');
  relicCount = nodeList.length;
  document.getElementById('relicCount').textContent = relicCount.toString();
  relicMultiplier = calcRelicMultiplier(relicCount);
  document.getElementById('LDPercentage').textContent =
    (relicMultiplier * 100).toString() + '%';
}

function parseDefender(json) {
  var defender = common.playerDataObject(json);
  defRawAttack += Math.round(defender.attackValue * dataObj.defenderMultiplier);
  defRawDefense += Math.round(defender.defenseValue *
    dataObj.defenderMultiplier);
  defRawArmor += Math.round(defender.armorValue * dataObj.defenderMultiplier);
  defRawDamage += Math.round(defender.damageValue * dataObj.defenderMultiplier);
  defRawHp += Math.round(defender.hpValue * dataObj.defenderMultiplier);
  if (defender.cloakLevel !== 0) {defCloaked += 1;}
  updateDefValues();
}

function storeLeadDefender(json) {
  leadDefender = common.playerDataObject(json);
}

function getGroups() {
  return $.ajax({
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
  var doc = system.createDocument(html);
  var disband = doc.querySelector('#pCC a[href*="confirmDisband"]');
  var viewStats = disband.previousElementSibling.href;
  var prm = [ajax.getGroupStats(viewStats).done(storeGroupStats)];
  var hasMerc = disband.parentNode.parentNode.previousElementSibling
    .previousElementSibling.innerHTML.indexOf('"#000099"') !== -1;
  if (hasMerc) {
    prm.push(ajax.getMercStats().done(storeMercStats));
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
    prm.push(ajax.getProfile(myDefenders[i]).done(parseDefender)
      .fail(ajaxFailure));
  }
  prm.push(ajax.getProfile(myDefenders[0]).done(storeLeadDefender));
  $.when.apply($, prm).done(doCalculations);
}

function setup() {
  myDefenders = relicData.defenders.map(function(x) {
    return x.player_name;
  });
  if (containerDiv) {
    containerDiv.innerHTML = '';
  } else {
    containerDiv = document.createElement('div');
    containerDiv.className = 'body';
  }
  leftDiv = document.createElement('div');
  leftDiv.className = 'fshFloatLeft leftDiv';
  containerDiv.appendChild(leftDiv);
  if (relicData.is_owner) {
    leftDiv.appendChild(layout.doBuffLinks(myDefenders));
  }
  fetchStatsBtn = document.createElement('button');
  fetchStatsBtn.className = 'custombutton';
  fetchStatsBtn.textContent = 'Fetch Stats';
  fetchStatsBtn.addEventListener('click', getStats);
  leftDiv.appendChild(fetchStatsBtn);
  var dialogRelic = document.getElementById('dialog-relic');
  dialogRelic.appendChild(containerDiv);
}

function viewRelic(e, data) {
  relicData = data.response.data;
  if (relicData.defenders.length > 0) {setup();}
}

export default function injectRelic() {
  $.subscribe('9-success.action-response', viewRelic);
}
