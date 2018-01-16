import {afterUpdateActionList} from '../doNotKill';
import {bias} from '../assets';
import calf from '../../support/calf';
import evalAnalysis from './evalAnalysis';
import evalArmour from './evalArmour';
import evalAttack from './evalAttack';
import evalCa from './evalCa';
import evalDamage from './evalDamage';
import evalDefence from './evalDefence';
import evalExtraBuffs from './evalExtraBuffs';
import evalHtml from './evalHtml';
import {getElementById} from '../../common/getElement';
import {playerDataString} from '../../common/common';
import {
  createDocument,
  findNode,
  getValue,
  intValue,
  setValue,
  xmlhttp
} from '../../support/system';

function getBiasGeneral(combat) {
  if (bias[combat.combatEvaluatorBias]) {
    return bias[combat.combatEvaluatorBias].generalVariable;
  }
  return 1.1053;
}

function getBiasHp(combat) {
  if (bias[combat.combatEvaluatorBias]) {
    return bias[combat.combatEvaluatorBias].hpVariable;
  }
  return 1.1;
}

function creatureData(ses) { // jQuery
  var obj = {};
  obj.name = $('#dialog-viewcreature').find('h2.name').text();
  obj.class = $('#dialog-viewcreature')
    .find('span.classification')
    .text();
  obj.attack = intValue($('#dialog-viewcreature')
    .find('dd.attribute-atk').text());
  obj.defense = intValue($('#dialog-viewcreature')
    .find('dd.attribute-def').text());
  obj.armor = intValue($('#dialog-viewcreature')
    .find('dd.attribute-arm').text());
  obj.damage = intValue($('#dialog-viewcreature')
    .find('dd.attribute-dmg').text());
  obj.hp = intValue($('#dialog-viewcreature')
    .find('p.health-max').text());
  // reduce stats if critter is a SE and player has SES cast on them.
  if (obj.name.search('Super Elite') !== -1) {
    obj.attack -= Math.ceil(obj.attack * ses);
    obj.defense -= Math.ceil(obj.defense * ses);
    obj.armor -= Math.ceil(obj.armor * ses);
    obj.damage -= Math.ceil(obj.damage * ses);
    obj.hp -= Math.ceil(obj.hp * ses);
  }
  return obj;
}

function checkForCreatureEvaluatorGroup() { // Legacy
  if ($('#creatureEvaluatorGroup').length === 0) {
    $('#dialog-viewcreature')
      .append('<div id="creatureEvaluatorGroup" ' +
        'style="clear:both;"></div>');
  }
}

function checkForCreatureEvaluator() { // Legacy
  if ($('#creatureEvaluator').length === 0) {
    $('#dialog-viewcreature')
      .append('<div id="creatureEvaluator" ' +
        'style="clear:both;"></div>');
  }
}

function getCreaturePlayerData(responseText, callback) { // Legacy
  var combat = {};
  combat.callback = callback;
  // playerdata
  combat.player = playerDataString(responseText);
  combat.combatEvaluatorBias = getValue('combatEvaluatorBias');
  combat.attackVariable = 1.1053;
  combat.generalVariable = getBiasGeneral(combat);
  combat.hpVariable = getBiasHp(combat);
  combat.creature =
    creatureData(combat.player.superEliteSlayerMultiplier);
  combat = evalExtraBuffs(combat);
  combat = evalAttack(combat);
  combat = evalDamage(combat);
  combat = evalDefence(combat);
  combat = evalArmour(combat);
  combat = evalAnalysis(combat);
  combat = evalCa(combat);
  combat.evaluatorHTML = evalHtml(combat);
  var tempdata;
  if (callback.groupEvaluation) {
    checkForCreatureEvaluatorGroup();
    tempdata = combat.evaluatorHTML.replace(/'/g, '\\\'');
    $('#creatureEvaluatorGroup').html(tempdata);
  } else {
    checkForCreatureEvaluator();
    tempdata = combat.evaluatorHTML.replace(/'/g, '\\\'');
    $('#creatureEvaluator').html(tempdata);
  }
}

function getCreatureGroupData(responseText) { // Legacy
  var doc = createDocument(responseText);
  var groupAttackValue = Number(findNode('//table[@width="400"]/tbody' +
    '/tr/td[contains(.,"Attack:")]', doc).nextSibling.textContent
    .replace(/,/, ''));
  var groupDefenseValue = Number(findNode('//table[@width="400"]/tbody' +
    '/tr/td[contains(.,"Defense:")]', doc).nextSibling.textContent
    .replace(/,/, ''));
  var groupArmorValue = Number(findNode('//table[@width="400"]/tbody' +
    '/tr/td[contains(.,"Armor:")]', doc).nextSibling.textContent
    .replace(/,/, ''));
  var groupDamageValue = Number(findNode('//table[@width="400"]/tbody' +
    '/tr/td[contains(.,"Damage:")]', doc).nextSibling.textContent
    .replace(/,/, ''));
  var groupHPValue = Number(findNode('//table[@width="400"]/tbody' +
    '/tr/td[contains(.,"HP:")]', doc).nextSibling.textContent
    .replace(/,/, ''));
  xmlhttp('index.php?no_mobile=1&cmd=profile', getCreaturePlayerData, {
    groupExists: true,
    groupAttackValue: groupAttackValue,
    groupDefenseValue: groupDefenseValue,
    groupArmorValue: groupArmorValue,
    groupDamageValue: groupDamageValue,
    groupHPValue: groupHPValue,
    groupEvaluation: true
  });
}

function checkIfGroupExists(responseText) { // Hybrid
  var doc = createDocument(responseText);
  var groupExistsIMG = $(doc)
    .find('img[title="Disband Group (Cancel Attack)"]');
  if (groupExistsIMG.length > 0) {
    var groupHref = groupExistsIMG.parents('td:first').find('a:first')
      .attr('href');
    xmlhttp(groupHref, getCreatureGroupData);
  }
}

function addRemoveCreatureToDoNotKillList(evt) {
  var creatureName = evt.target.getAttribute('creatureName');
  var ind = calf.doNotKillList.indexOf(creatureName);
  if (ind !== -1) {
    calf.doNotKillList.splice(ind, 1);
    evt.target.innerHTML = 'Add to the do not kill list';
  } else {
    calf.doNotKillList.push(creatureName);
    evt.target.innerHTML = 'Remove from do not kill list';
  }
  setValue('doNotKillList', calf.doNotKillList.join());
  // refresh the action list
  afterUpdateActionList();
}

export default function readyViewCreature() { // Hybrid
  $('#creatureEvaluator').html('');
  $('#creatureEvaluatorGroup').html('');

  xmlhttp('index.php?no_mobile=1&cmd=profile', getCreaturePlayerData, {
    groupExists: false,
    groupAttackValue: 0,
    groupDefenseValue: 0,
    groupArmorValue: 0,
    groupDamageValue: 0,
    groupHPValue: 0,
    groupEvaluation: false
  });
  xmlhttp('index.php?no_mobile=1&cmd=guild&subcmd=groups',
    checkIfGroupExists);

  $('#addRemoveCreatureToDoNotKillList').html('');
  if ($('#addRemoveCreatureToDoNotKillList').length === 0) {
    var doNotKillElement = '<div id="addRemoveCreatureToDo' +
      'NotKillList"" class="description" style="cursor:' +
      'pointer;text-decoration:underline;color:blue;"></div>';
    $(doNotKillElement).insertAfter($('#dialog-viewcreature')
      .find('p.description'));
  }
  var creatureName = $('#dialog-viewcreature').find('h2.name')
    .text();
  $('#addRemoveCreatureToDoNotKillList')
    .attr('creatureName', creatureName);
  var extraText = 'Add to the do not kill list';
  if (calf.doNotKillList.indexOf(creatureName) !== -1) {
    extraText = 'Remove from do not kill list';
  }
  $('#addRemoveCreatureToDoNotKillList').html(extraText);
  getElementById('addRemoveCreatureToDoNotKillList')
    .addEventListener('click',
      addRemoveCreatureToDoNotKillList, true);
}
