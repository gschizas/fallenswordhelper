import assets from './assets';
import calf from '../support/calf';
import evalAnalysis from './evalAnalysis';
import evalArmour from './evalArmour';
import evalAttack from './evalAttack';
import evalCa from './evalCa';
import evalDamage from './evalDamage';
import evalDefence from './evalDefence';
import evalExtraBuffs from './evalExtraBuffs';
import evalHtml from './evalHtml';
import * as common from '../common/common';
import * as system from '../support/system';

function getBiasGeneral(combat) { // Native
  if (assets.bias[combat.combatEvaluatorBias]) {
    return assets.bias[combat.combatEvaluatorBias].generalVariable;
  }
  return 1.1053;
}

function getBiasHp(combat) { // Native
  if (assets.bias[combat.combatEvaluatorBias]) {
    return assets.bias[combat.combatEvaluatorBias].hpVariable;
  }
  return 1.1;
}

function creatureData(ses) { // jQuery
  var obj = {};
  obj.name = $('#dialog-viewcreature').find('h2.name').text();
  obj.class = $('#dialog-viewcreature')
    .find('span.classification')
    .text();
  obj.attack = system.intValue($('#dialog-viewcreature')
    .find('dd.attribute-atk').text());
  obj.defense = system.intValue($('#dialog-viewcreature')
    .find('dd.attribute-def').text());
  obj.armor = system.intValue($('#dialog-viewcreature')
    .find('dd.attribute-arm').text());
  obj.damage = system.intValue($('#dialog-viewcreature')
    .find('dd.attribute-dmg').text());
  obj.hp = system.intValue($('#dialog-viewcreature')
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
  combat.player = common.playerData(responseText);
  combat.combatEvaluatorBias = system.getValue('combatEvaluatorBias');
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
  var doc = system.createDocument(responseText);
  var groupAttackValue = Number(system.findNode('//table[@width="400"]/tbody' +
    '/tr/td[contains(.,"Attack:")]', doc).nextSibling.textContent
    .replace(/,/, ''));
  var groupDefenseValue = Number(system.findNode('//table[@width="400"]/tbody' +
    '/tr/td[contains(.,"Defense:")]', doc).nextSibling.textContent
    .replace(/,/, ''));
  var groupArmorValue = Number(system.findNode('//table[@width="400"]/tbody' +
    '/tr/td[contains(.,"Armor:")]', doc).nextSibling.textContent
    .replace(/,/, ''));
  var groupDamageValue = Number(system.findNode('//table[@width="400"]/tbody' +
    '/tr/td[contains(.,"Damage:")]', doc).nextSibling.textContent
    .replace(/,/, ''));
  var groupHPValue = Number(system.findNode('//table[@width="400"]/tbody' +
    '/tr/td[contains(.,"HP:")]', doc).nextSibling.textContent
    .replace(/,/, ''));
  system.xmlhttp('index.php?cmd=profile', getCreaturePlayerData, {
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
  var doc = system.createDocument(responseText);
  var groupExistsIMG = $(doc)
    .find('img[title="Disband Group (Cancel Attack)"]');
  if (groupExistsIMG.length > 0) {
    var groupHref = groupExistsIMG.parents('td:first').find('a:first')
      .attr('href');
    system.xmlhttp(groupHref, getCreatureGroupData);
  }
}

function addRemoveCreatureToDoNotKillList(evt) { // Native
  var creatureName = evt.target.getAttribute('creatureName');
  var ind = calf.doNotKillList.indexOf(creatureName);
  if (ind !== -1) {
    calf.doNotKillList.splice(ind, 1);
    evt.target.innerHTML = 'Add to the do not kill list';
  } else {
    calf.doNotKillList.push(creatureName);
    evt.target.innerHTML = 'Remove from do not kill list';
  }
  system.setValue('doNotKillList', calf.doNotKillList.join());
  // refresh the action list
  window.GameData.doAction(-1);
}

export function readyViewCreature() { // Hybrid
  $('#creatureEvaluator').html('');
  $('#creatureEvaluatorGroup').html('');

  system.xmlhttp('index.php?cmd=profile', getCreaturePlayerData, {
    groupExists: false,
    groupAttackValue: 0,
    groupDefenseValue: 0,
    groupArmorValue: 0,
    groupDamageValue: 0,
    groupHPValue: 0,
    groupEvaluation: false
  });
  system.xmlhttp('index.php?cmd=guild&subcmd=groups',
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
  document.getElementById('addRemoveCreatureToDoNotKillList')
    .addEventListener('click',
      addRemoveCreatureToDoNotKillList, true);
}
