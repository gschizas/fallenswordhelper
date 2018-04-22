import calf from '../../support/calf';
import {getElementById} from '../../common/getElement';
import getValue from '../../system/getValue';
import intValue from '../../system/intValue';
import setValue from '../../system/setValue';

export var showCreatureInfo;
var statLevel;
var statDefense;
var statAttack;
var statDamage;
var statArmor;
var statHp;

export function toggleShowCreatureInfo() {
  showCreatureInfo = !showCreatureInfo;
  setValue('showCreatureInfo', showCreatureInfo);
}

function getStatText(statTooltip, statClassName) {
  return statTooltip.getElementsByClassName(statClassName)[0]
    .nextElementSibling.textContent;
}

export function getMyStats() {
  statLevel = intValue(getStatText(
    getElementById('statbar-level-tooltip-general'), 'stat-level'));
  var statTooltip = getElementById('statbar-character-tooltip-stats');
  statDefense = getStatText(statTooltip, 'stat-defense');
  statAttack = getStatText(statTooltip, 'stat-attack');
  statDamage = getStatText(statTooltip, 'stat-damage');
  statArmor = getStatText(statTooltip, 'stat-armor');
  statHp = getStatText(statTooltip, 'stat-hp');
}

function doMouseOver(creature, monster) {
  var oneHitNumber = Math.ceil(creature.hp * calf.hpVariable + creature.armor *
    calf.generalVariable);
  var myLvlClas = 'fshYellow';
  if (statLevel > creature.level) {myLvlClas = 'fshRed';}
  var monsterTip = '<table><tr><td>' +
    '<img src="https://cdn.fallensword.com/creatures/' + creature.image_id +
    '.jpg" height="200" width="200"></td><td rowspan="2">' +
    '<table width="400"><tr>' +
    '<td class="header" colspan="4" class="fshCenter">Statistics</td></tr>' +
    '<tr><td>Class:&nbsp;</td><td width="40%">' + creature.creature_class +
    '</td><td>Level:&nbsp;</td><td width="40%">' + creature.level +
    ' (your level:<span class="' + myLvlClas + '">' +
    statLevel + '</span>)</td>' +
    '</tr><tr><td>Attack:&nbsp;</td><td width="40%">' + creature.attack +
    ' (your defense:<span class="fshYellow">' + statDefense + '</span>)</td>' +
    '<td>Defense:&nbsp;</td><td width="40%">' + creature.defense +
    ' (your attack:<span class="fshYellow">' + statAttack + '</span>)</td>' +
    '</tr><tr><td>Armor:&nbsp;</td><td width="40%">' + creature.armor +
    ' (your damage:<span class="fshYellow">' + statDamage + '</span>)</td>' +
    '<td>Damage:&nbsp;</td><td width="40%">' + creature.damage +
    ' (your armor:<span class="fshYellow">' + statArmor + '</span>)</td>' +
    '</tr><tr><td>HP:&nbsp;</td><td width="40%">' + creature.hp +
    ' (your HP:<span class="fshYellow">' + statHp + '</span>)' +
    '(1H: <span class="fshRed">' + oneHitNumber + '</span>)</td>' +
    '<td>Gold:&nbsp;</td><td width="40%">' + creature.gold + '</td></tr>' +
    '<tr><td colspan="4" height="5"></td></tr><tr>' +
    '<td class="header" colspan="4" class="fshCenter">Enhancements</td></tr>';

  if (!creature.enhancements) {
    monsterTip += '<tr><td colspan="4">[no enhancements]</td></tr>';
  } else {
    creature.enhancements.forEach(function(e) {
      monsterTip += '<tr><td colspan="2">' + e.name +
        ':</td><td colspan="2">' + e.value + '</td></tr>';
    });
  }

  monsterTip += '<tr><td colspan="4" height="5"></td></tr><tr>' +
    '<td class="header" colspan="4" class="fshCenter">Description</td>' +
    '</tr><tr><td colspan="4">' + creature.description + '</td></tr>' +
    '<tr><td colspan="4" height="5"></td></tr></table></td></tr>' +
    '<tr><td class="fshCenter"><b>' + creature.name + '</b></td></tr>' +
    '</table>';

  monster.dataset.tipped = monsterTip;
}

var bailOut = [
  function(data, actions) {
    return actions.length === 1 &&
      actions[0].classList.contains('hcs-state-disabled'); // In motion
  },
  function(data, actions) {
    return actions.length - 1 < data.passback; // Not enough actions
  },
  function(data) {
    return !GameData.actions()[data.passback];
  },
  function(data) {
    return data.response.data.id !==
      GameData.actions()[data.passback].data.id.toString(); // Different action list
  }
];

function doCreatureInfo(data) {
  var actions = getElementById('actionList').children;
  for (var i = 0; i < bailOut.length; i += 1) {
    if (bailOut[i](data, actions)) {return;}
  }
  // monster = 0;
  doMouseOver(data.response.data, actions[data.passback].firstElementChild
    .firstElementChild.firstElementChild);
}

export function processMouseOver(data) {
  if (showCreatureInfo) {doCreatureInfo(data);}
}

export function getCreaturePrefs() {
  showCreatureInfo = getValue('showCreatureInfo');
}
