import assets from './assets';
import calf from '../support/calf';
import combatLogger from './combatLogger';
import {huntingBuffsHtml} from '../settings/worldPrefs';
import injectButtons from './buttons';
import injectRelic from './relic/relic';
import prepareShop from './shop';
import readyViewCreature from './viewCreature/viewCreature';
import {simpleCheckboxHtml} from '../settings/settingsPage';
import startMonsterLog from './monsterLog';
import * as sendGold from './sendGold';
import * as system from '../support/system';

var def_afterUpdateActionlist = 'after-update.actionlist';
var huntingBuffs;
var huntingBuffsName;
var hideSubLvlCreature;
var hidePlayerActions;
var missingBuffsDiv;

function getPrefs() {
  hideSubLvlCreature = system.getValue('hideSubLvlCreature');
  hidePlayerActions = system.getValue('hidePlayerActions');
  calf.showBuffs = system.getValue('showHuntingBuffs');
  calf.enabledHuntingMode = system.getValue('enabledHuntingMode');
  calf.buffs = system.shouldBeArray('huntingBuffs');
  calf.buffsName = system.getValue('huntingBuffsName');
  calf.buffs2 = system.shouldBeArray('huntingBuffs2');
  calf.buffs2Name = system.getValue('huntingBuffs2Name');
  calf.buffs3 = system.shouldBeArray('huntingBuffs3');
  calf.buffs3Name = system.getValue('huntingBuffs3Name');
  calf.doNotKillList = system.shouldBeArray('doNotKillList');
}

var buffLookup = {
  '1': function() {
    huntingBuffs = calf.buffs;
    huntingBuffsName = calf.buffsName;
  },
  '2': function() {
    huntingBuffs = calf.buffs2;
    huntingBuffsName = calf.buffs2Name;
  },
  '3': function() {
    huntingBuffs = calf.buffs3;
    huntingBuffsName = calf.buffs3Name;
  }
};

function setCurrentBuffList() {
  var tmpFn = buffLookup[calf.enabledHuntingMode];
  if (typeof tmpFn === 'function') {
    tmpFn();
  }
}

function toggleSubLvlCreature() {
  hideSubLvlCreature = !hideSubLvlCreature;
  system.setValue('hideSubLvlCreature', hideSubLvlCreature);
  GameData.fetch(256);
}

function toggleHidePlayerActions() {
  hidePlayerActions = !hidePlayerActions;
  system.setValue('hidePlayerActions', hidePlayerActions);
  GameData.fetch(256);
}

function toggleShowHuntingBuffs() {
  calf.showBuffs = !calf.showBuffs;
  system.setValue('showHuntingBuffs', calf.showBuffs);
  GameData.fetch(16);
}

function toggleEnabledHuntingMode(e) {
  if (e.target.name !== 'enabledHuntingMode') {return;}
  calf.enabledHuntingMode = e.target.value;
  system.setValue('enabledHuntingMode', calf.enabledHuntingMode);
  setCurrentBuffList();
  GameData.fetch(16);
}

var fshEvents = {
  hideSubLvlCreature: toggleSubLvlCreature,
  hidePlayerActions: toggleHidePlayerActions,
  showHuntingBuffs: toggleShowHuntingBuffs
};

function prefsClickEvent(e) {
  var tmpFn = fshEvents[e.target.name];
  if (typeof tmpFn === 'function') {
    e.target.blur();
    tmpFn(e);
  }
}

function buildFshDivs() {
  var fshDiv = document.createElement('div');
  fshDiv.className = 'fshCenter fshFten';
  var prefsDiv = document.createElement('div');
  prefsDiv.addEventListener('click', prefsClickEvent);
  prefsDiv.addEventListener('change', toggleEnabledHuntingMode);
  prefsDiv.insertAdjacentHTML('beforeend',
    simpleCheckboxHtml('hideSubLvlCreature') + '&nbsp;&nbsp;' +
    simpleCheckboxHtml('hidePlayerActions') + '&nbsp;&nbsp;' +
    huntingBuffsHtml());
  fshDiv.insertAdjacentElement('beforeend', prefsDiv);
  missingBuffsDiv = document.createElement('div');
  fshDiv.insertAdjacentElement('beforeend', missingBuffsDiv);
  var worldContainerBelow = document.getElementById('worldContainerBelow');
  worldContainerBelow.insertAdjacentElement('afterbegin', fshDiv);
}

function xhrDataFilter(data) {
  var myData = JSON.parse(data);
  if (!myData.actions || myData.actions.length === 0) {return data;}
  var realm = GameData.realm();
  myData.actions = myData.actions.filter(function(el) {
    if (el.type === 6) {return el.data.level >= realm.minlevel;}
    return true;
  });
  var ret = JSON.stringify(myData);
  return ret;
}

function xhrPreFilter(options, originalOptions) {
  if (!originalOptions.data || !hideSubLvlCreature) {return;}
  options.dataFilter = xhrDataFilter;
}

function interceptXHR() { // jQuery
  $.ajaxPrefilter('JSON', xhrPreFilter);
}

function hideGroupByType(type) { // jQuery
  $('#actionList li.creature-' + type.toString() + ' a.create-group').hide();
}

function hideGroupSubscribe(type) { // jQuery
  $.subscribe(def_afterUpdateActionlist, hideGroupByType.bind(null, type));
}

var hideGroupTypes = [
  'hideChampionsGroup',
  'hideElitesGroup',
  'hideSEGroup',
  'hideTitanGroup',
  'hideLegendaryGroup'
];

function hideGroupButton() {
  hideGroupTypes.forEach(function(el, i) {
    if (system.getValue(el)) {
      hideGroupSubscribe(i + 1);
      hideGroupByType(i + 1);
    }
  });
}

function colorType(actionList, creatureClass, colorClass) {
  var creatures = actionList.getElementsByClassName(creatureClass);
  Array.prototype.forEach.call(creatures, function(el) {
    el.classList.add(colorClass);
  });
}

function colorMonsters() { // jQuery
  var act = document.getElementById('actionList');
  colorType(act, 'creature-1', 'fshGreen');
  colorType(act, 'creature-2', 'fshYellow');
  colorType(act, 'creature-3', 'fshRed');
}

function doMonsterColors() { // jQuery
  if (system.getValue('enableCreatureColoring')) {
    $.subscribe(def_afterUpdateActionlist, colorMonsters);
    colorMonsters();
  }
}

function doHidePlayerActions() {
  if (!hidePlayerActions) {return;}
  var act = document.getElementById('actionList');
  var players = act.getElementsByClassName('player');
  Array.prototype.forEach.call(players, function(el) {
    var verbs = el.getElementsByClassName('verbs');
    if (verbs && verbs.length === 1) {
      verbs[0].classList.add('fshHide');
    }
  });
}

function afterUpdateActionList() {
  // color the critters in the do no kill list blue
  var act = document.getElementById('actionList');
  var creatures = act.getElementsByClassName('creature');
  Array.prototype.forEach.call(creatures, function(el) {
    if (calf.doNotKillList.indexOf(el.textContent) !== -1) {
      el.classList.add('fshBlue');
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
      if (calf.doNotKillList.indexOf(creatureIcon.data('name')) !== -1) {
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

function huntingBuffsEnabled(evt, data) {
  if (!calf.showBuffs) {
    missingBuffsDiv.innerHTML = '';
    return;
  }
  var buffHash = data.b.reduce(function(prev, curr) {
    prev[curr.name] = true;
    return prev;
  }, {});
  var missingBuffs = huntingBuffs.reduce(function(prev, curr) {
    if (!buffHash[curr.trim()]) {prev.push(curr);}
    return prev;
  }, []);
  if (missingBuffs.length > 0) {
    missingBuffsDiv.innerHTML = 'You are missing some ' +
      huntingBuffsName + ' hunting buffs<br>(' +
      missingBuffs.join(', ') + ')';
  } else {missingBuffsDiv.innerHTML = '';}
}

function dataEventsPlayerBuffs(evt, data) {
  if (huntingBuffs) {huntingBuffsEnabled(evt, data);}
}

function fixDebuffQTip(e) { // jQuery
  $(e.target).qtip('hide');
}

function injectWorldNewMap(data) {
  sendGold.updateSendGoldOnWorld(data);
  if (data.realm && data.realm.name) {
    injectButtons(data);
    document.getElementById('buffList')
      .addEventListener('click', fixDebuffQTip);
    if (hideSubLvlCreature) {GameData.fetch(256);}
  }
}

function doHuntingBuffs() { // jQuery
  setCurrentBuffList();
  $.subscribe(window.DATA_EVENTS.PLAYER_BUFFS.ANY,
    dataEventsPlayerBuffs);
  if (calf.showBuffs && window.initialGameData) { // HCS initial data
    dataEventsPlayerBuffs(null,
      {b: window.initialGameData.player.buffs});
  }
}

function setupPref() {
  getPrefs();
  buildFshDivs();
}

export function subscribes() { // jQuery
  setupPref();
  interceptXHR();
  doHuntingBuffs();
  $.subscribe(def_afterUpdateActionlist, doHidePlayerActions);
  doHidePlayerActions();
  sendGold.injectSendGoldOnWorld();
  // subscribe to view creature events on the new map.
  $.subscribe('ready.view-creature', readyViewCreature);
  hideGroupButton(); // Hide Create Group button
  doMonsterColors();
  // add do-not-kill list functionality
  $.subscribe(def_afterUpdateActionlist, afterUpdateActionList);
  afterUpdateActionList();
  // add monster log functionality
  startMonsterLog();
  // then intercept the action call
  interceptDoAction();
  $.subscribe(window.DATA_EVENTS.PLAYER_BUFFS.ANY,
    impIconColour);
  $.subscribe('keydown.controls', function(e, key) {
    if (key === 'ACT_REPAIR') {GameData.fetch(403);}
  });
  combatLogger();
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
  prepareShop();
  injectRelic();
}

/* fetchFlags = {
  playerStats : 1,
  playerBackpackCount : 2,
  playerBackpackItems : 4,
  playerPrefs : 8,

  playerBuffs : 16,
  worldDefines : 32,
  worldRealmStatic : 64,
  worldRealmDynamic : 128,

  worldRealmActions : 256,
  PLAYER_EQUIPMENT : 512,
  PLAYER_NOTIFICATIONS : 1024,

  all : 2047
}; */
