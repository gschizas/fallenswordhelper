import calf from '../../support/calf';
import {createDiv} from '../../common/cElement';
import {def_suffixSuccessActionResponse} from '../../support/constants';
import evalAnalysis from './evalAnalysis';
import evalArmour from './evalArmour';
import evalAttack from './evalAttack';
import evalCA from './evalCa';
import evalDamage from './evalDamage';
import evalDefence from './evalDefence';
import evalExtraBuffs from './evalExtraBuffs';
import evalHTML from './evalHtml';
import {getElementById} from '../../common/getElement';
import groupsView from '../../app/guild/groups/view';
import groupsViewStats from '../../app/guild/groups/viewStats';
import insertElement from '../../common/insertElement';
import makeDoNotKillLink from './makeDoNotKillLink';
import myStats from '../../ajax/myStats';
import playerDataObject from '../../common/playerDataObject';
import playerName from '../../common/playerName';

var dialogViewCreature;
var combatEvalContainer;
var combatEvaluator;
var groupEvaluator;

function getDialogViewCreature() {
  if (!dialogViewCreature) {
    dialogViewCreature = getElementById('dialog-viewcreature');
  }
}

function getCombatEvalContainer() {
  if (!combatEvalContainer) {
    combatEvalContainer = createDiv();
    insertElement(dialogViewCreature, combatEvalContainer);
    insertElement(dialogViewCreature, createDiv({
      innerHTML: '<span class="fshFooter">' +
        '*Does include CA, DD, HF, DC, Flinch, Super Elite Slayer, NMV, ' +
        'Sanctuary, Constitution, Fortitude, Chi Strike and ' +
        'Terrorize (if active) and allow for randomness (1.1053). ' +
        'Constitution, NMV, Fortitude and Chi Strike apply to group ' +
        'stats.</span>'
    }));
  }
}

function getCombatEvaluator() {
  if (!combatEvaluator) {
    getCombatEvalContainer();
    combatEvaluator = createDiv();
    insertElement(combatEvalContainer, combatEvaluator);
  }
}

function getGroupEvaluator() {
  if (!groupEvaluator) {
    getCombatEvaluator();
    groupEvaluator = createDiv();
    insertElement(combatEvalContainer, groupEvaluator);
  }
}

function setCombatEvaluator(html) {
  getCombatEvaluator();
  combatEvaluator.innerHTML = html;
}

function setGroupEvalalutor(html) {
  getGroupEvaluator();
  groupEvaluator.innerHTML = html;
}

function creatureData(creature, ses) {
  var obj = {};
  obj.name = creature.name;
  obj.class = creature.creature_class;
  obj.attack = Number(creature.attack);
  obj.defense = Number(creature.defense);
  obj.armor = Number(creature.armor);
  obj.damage = Number(creature.damage);
  obj.hp = Number(creature.hp);
  // reduce stats if critter is a SE and player has SES cast on them.
  if (obj.name.search('Super Elite') !== -1) { // TODO type
    obj.attack -= Math.ceil(obj.attack * ses);
    obj.defense -= Math.ceil(obj.defense * ses);
    obj.armor -= Math.ceil(obj.armor * ses);
    obj.damage -= Math.ceil(obj.damage * ses);
    obj.hp -= Math.ceil(obj.hp * ses);
  }
  return obj;
}

function doCombatEval(data, playerJson, groupData) {
  var combat = {};
  combat.callback = groupData;
  // playerdata
  combat.player = playerDataObject(playerJson);
  combat.combatEvaluatorBias = calf.combatEvaluatorBias;
  combat.attackVariable = 1.1053;
  combat.generalVariable = calf.generalVariable;
  combat.hpVariable = calf.hpVariable;
  combat.creature = creatureData(data.response.data,
    combat.player.superEliteSlayerMultiplier);
  evalExtraBuffs(combat);
  evalAttack(combat);
  evalDamage(combat);
  evalDefence(combat);
  evalArmour(combat);
  evalAnalysis(combat);
  evalCA(combat);
  combat.evaluatorHTML = evalHTML(combat);
  if (groupData.groupExists) {
    setGroupEvalalutor(combat.evaluatorHTML);
  } else {
    setCombatEvaluator(combat.evaluatorHTML);
  }
}

function myGroup(el) {
  return el.members[0].name === playerName();
}

function getGroupId(json) {
  return json.r.find(myGroup).id;
}

function getGroupStats(data, playerJson, groupId) {
  groupsViewStats(groupId).done(function(groupJson) {
    var attr = groupJson.r.attributes;
    doCombatEval(data, playerJson, {
      groupExists: true,
      groupAttackValue: attr[0].value,
      groupDefenseValue: attr[1].value,
      groupArmorValue: attr[2].value,
      groupDamageValue: attr[3].value,
      groupHPValue: attr[4].value
    });
  });
}

function processGroup(data, playerJson) {
  groupsView().pipe(getGroupId).done(function(groupId) {
    getGroupStats(data, playerJson, groupId);
  });
}

function processPlayer(data, playerJson) {
  if (data.player.hasGroup) {processGroup(data, playerJson);}
  doCombatEval(data, playerJson, {groupExists: false});
}

function processCreature(e, data) {
  getDialogViewCreature();
  if (!dialogViewCreature) {return;}
  setCombatEvaluator('');
  setGroupEvalalutor('');
  makeDoNotKillLink(data.response.data.name, dialogViewCreature);
  myStats(true).done(function(playerJson) {processPlayer(data, playerJson);});
}

export default function viewCreature() {
  $.subscribe('1' + def_suffixSuccessActionResponse, processCreature);
}
