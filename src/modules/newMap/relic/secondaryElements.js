import {createDiv} from '../../common/cElement';
import {getElementById} from '../../common/getElement';
import getMembrList from '../../ajax/getMembrList';
import getValue from '../../system/getValue';
import insertHtmlBeforeEnd from '../../common/insertHtmlBeforeEnd';
import {nowSecs} from '../../support/constants';
import {atkStats, defStats, proc} from './assets';
import {
  containerDiv,
  fetchStatsBtn,
  leftDiv,
  myDefenders
} from './primaryElements';

var guildMemberList;
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
export var relicCountElement;
export var lDPercentageElement;
export var lDCloakedElement;
export var attackElement;
export var attackBuffedElement;
export var defenseElement;
export var defenseBuffedElement;
export var armorElement;
export var armorBuffedElement;
export var damageElement;
export var damageBuffedElement;
export var hpElement;
export var hpBuffedElement;
export var defCloakedElement;
export var defProcessedElement;
export var dc225Element;
export var dc175Element;
export var groupAttackElement;
export var groupAttackBuffedElement;
export var groupDefenseElement;
export var groupDefenseBuffedElement;
export var groupArmorElement;
export var groupArmorBuffedElement;
export var groupDamageElement;
export var groupDamageBuffedElement;
export var groupHPElement;
export var groupHPBuffedElement;
export var processingStatus;

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
  insertHtmlBeforeEnd(containerDiv,
    '<div class="fshFloatLeft fshRelicLowDiv"><table class="relicT">' +
    '<thead><tr><th>Offline guild members not at relic:</th></tr></thead>' +
    '<tbody><tr><td>' + filtered.join(' ') + '</td></tr></tbody>' +
    '</table></div>');
}

function setDefVars() {
  relicCountElement = getElementById('relicCount');
  lDPercentageElement = getElementById('LDPercentage');
  lDCloakedElement = getElementById('LDCloaked');
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

export function prepareSecondaryDivs(relicData) {
  fetchStatsBtn.classList.add('fshHide');
  var hideRelicOffline = getValue('hideRelicOffline');
  if (relicData.is_owner && !hideRelicOffline) {
    getMembrList(false).done(missingMembers);
  }
  insertHtmlBeforeEnd(leftDiv, proc);
  processingStatus = getElementById('ProcessingStatus');
  var midDiv = createDiv({
    className: 'fshFloatLeft fshRelicMidDiv',
    innerHTML: defStats
  });
  containerDiv.appendChild(midDiv);
  setDefVars();
  var rightDiv = createDiv({
    className: 'fshFloatLeft fshRelicRightDiv',
    innerHTML: atkStats
  });
  containerDiv.appendChild(rightDiv);
  setAtkVars();
}
