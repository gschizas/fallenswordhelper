import assets from './assets';
import calf from '../support/calf';
import * as buttons from './buttons';
import * as combatLogger from './combatLogger';
import * as monsterLog from './monsterLog';
import * as sendGold from './sendGold';
import * as shop from './shop';
import * as system from '../support/system';
import * as viewCreature from './viewCreature';

var showHuntingBuffs;
var huntingBuffs;
var huntingBuffsName;

function hideGroupButton() { // jQuery
  if (system.getValue('hideChampionsGroup')) {
    $.subscribe('after-update.actionlist',
      function() {$('#actionList li.creature-1 a.create-group').hide();});
    $('#actionList li.creature-1 a.create-group').hide();
  }
  if (system.getValue('hideElitesGroup')) {
    $.subscribe('after-update.actionlist',
      function() {$('#actionList li.creature-2 a.create-group').hide();});
    $('#actionList li.creature-2 a.create-group').hide();
  }
  if (system.getValue('hideSEGroup')) {
    $.subscribe('after-update.actionlist',
      function() {$('#actionList li.creature-3 a.create-group').hide();});
    $('#actionList li.creature-3 a.create-group').hide();
  }
  if (system.getValue('hideTitanGroup')) {
    $.subscribe('after-update.actionlist',
      function() {$('#actionList li.creature-4 a.create-group').hide();});
    $('#actionList li.creature-4 a.create-group').hide();
  }
  if (system.getValue('hideLegendaryGroup')) {
    $.subscribe('after-update.actionlist',
      function() {$('#actionList li.creature-5 a.create-group').hide();});
    $('#actionList li.creature-5 a.create-group').hide();
  }
}

function colorMonsters() { // jQuery
  $('#actionList li.creature-1').css('color', 'green');
  $('#actionList li.creature-2').css('color', 'yellow');
  $('#actionList li.creature-3').css('color', 'red');
}

function afterUpdateActionList() { // jQuery
  // color the critters in the do no kill list blue
  // TODO substring bug
  $('#actionList div.header').each(function() {
    if (calf.doNotKillList.indexOf(
        $(this).find('a.icon').data('name')) !== -1) {
      $(this).css('color', 'blue');
    }
  });
}

function interceptDoAction() { // jQuery
  var gameData = GameData;
  var hcs = window.HCS;
  var oldDoAction = gameData.doAction;
  gameData.doAction = function(actionCode, fetchFlags, data) {
    if (actionCode === hcs.DEFINES.ACTION.CREATURE_COMBAT) {
      // Do custom stuff e.g. do not kill list
      var creatureIcon = $('#actionList div.header')
        .eq(data.passback).find('a.icon');
      // TODO substring bug
      if (calf.doNotKillList.indexOf(
          creatureIcon.data('name')) !== -1) {
        creatureIcon.removeClass('loading');
        return;
      }
    }
    // Call standard action
    oldDoAction(actionCode, fetchFlags, data);
  };
}

function impIconColour() { // jQuery
  var imp = $('#actionlist-shield-imp');
  if (imp.length === 1) {
    imp.css('background-color',
      assets.colorHash[imp.text()] || '#ad8043');
  }
}

function dataEventsPlayerBuffs(evt, data) { // jQuery
  var buffHash = data.b.reduce(function(prev, curr) {
    prev[curr.name] = true;
    return prev;
  }, {});
  var missingBuffs = huntingBuffs.reduce(function(prev, curr) {
    if (!buffHash[curr.trim()]) {prev.push(curr);}
    return prev;
  }, []);
  var missingBuffsDiv = document.getElementById('missingBuffs');
  if (!missingBuffsDiv) {
    missingBuffsDiv = document.createElement('div');
    missingBuffsDiv.setAttribute('id', 'missingBuffs');
    var worldContainer = document.getElementById('worldContainerBelow');
    worldContainer.insertBefore(missingBuffsDiv, worldContainer.firstChild);
  }
  if (missingBuffs.length > 0) {
    missingBuffsDiv.innerHTML = 'You are missing some ' +
      huntingBuffsName + ' hunting buffs<br>(' +
      missingBuffs.join(', ') + ')';
  } else {missingBuffsDiv.innerHTML = '';}
}

function fixDebuffQTip(e) { // jQuery
  $(e.target).qtip('hide');
}

function injectWorldNewMap(data) { // Native
  if (data.player && system.getValue('sendGoldonWorld')) {
    sendGold.updateSendGoldOnWorld(data);
  }
  if (data.realm && data.realm.name) {
    buttons.injectButtons(data);
    document.getElementById('buffList')
      .addEventListener('click', fixDebuffQTip);
  }
}

function doHuntingBuffs() {
  showHuntingBuffs = system.getValue('showHuntingBuffs');
  if (!showHuntingBuffs) {return;}
  var enabledHuntingMode = system.getValue('enabledHuntingMode');
  if (enabledHuntingMode === '1') {
    huntingBuffs = system.getValue('huntingBuffs');
    huntingBuffsName = system.getValue('huntingBuffsName');
  }
  if (enabledHuntingMode === '2') {
    huntingBuffs = system.getValue('huntingBuffs2');
    huntingBuffsName = system.getValue('huntingBuffs2Name');
  }
  if (enabledHuntingMode === '3') {
    huntingBuffs = system.getValue('huntingBuffs3');
    huntingBuffsName = system.getValue('huntingBuffs3Name');
  }
  huntingBuffs = huntingBuffs.split(',');
  $.subscribe(window.DATA_EVENTS.PLAYER_BUFFS.ANY,
    dataEventsPlayerBuffs);
  if (window.initialGameData) {// HCS initial data
    dataEventsPlayerBuffs(null,
      {b: window.initialGameData.player.buffs});
  }
}

export function subscribes() { // jQuery

  if (system.getValue('sendGoldonWorld')) {
    sendGold.injectSendGoldOnWorld();
  }

  // Subscribes:
  calf.doNotKillList = system.getValue('doNotKillList');

  // subscribe to view creature events on the new map.
  $.subscribe('ready.view-creature', viewCreature.readyViewCreature);

  // Hide Create Group button
  hideGroupButton();

  if (system.getValue('enableCreatureColoring')) {
    $.subscribe('after-update.actionlist', colorMonsters);
    colorMonsters();
  }

  // add do-not-kill list functionality
  $.subscribe('after-update.actionlist', afterUpdateActionList);
  afterUpdateActionList();

  // add monster log functionality
  monsterLog.startMonsterLog();

  // then intercept the action call
  interceptDoAction();

  $.subscribe(window.DATA_EVENTS.PLAYER_BUFFS.ANY,
    impIconColour);

  doHuntingBuffs();

  $.subscribe('keydown.controls', function(e, key) {
    if (key === 'ACT_REPAIR') {GameData.fetch(387);}
  });

  combatLogger.init();
  // on world

  if (window.initialGameData) {// HCS initial data
    injectWorldNewMap(window.initialGameData);
    impIconColour(null,
      {b: window.initialGameData.player.buffs});
  }
  $.subscribe('-1-success.action-response 5-success.action-response',
    function(e, data) { // change of information
      injectWorldNewMap(data);
    }
  );

  // somewhere near here will be multi buy on shop
  shop.prepareShop();

}
