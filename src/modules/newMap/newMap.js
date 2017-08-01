import assets from './assets';
import calf from '../support/calf';
import combatLogger from './combatLogger';
import injectButtons from './buttons';
import injectRelic from './relic/relic';
import prepareShop from './shop';
import readyViewCreature from './viewCreature/viewCreature';
import setupPref from './subLevel';
import startMonsterLog from './monsterLog';
import * as sendGold from './sendGold';
import * as system from '../support/system';

var def_afterUpdateActionlist = 'after-update.actionlist';

function hideGroupByType(type) { // jQuery
  $('#actionList li.creature-' + type.toString() + ' a.create-group').hide();
}

function hideGroupSubscribe(type) { // jQuery.min
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

function colorMonsters() {
  var act = document.getElementById('actionList');
  colorType(act, 'creature-1', 'fshGreen');
  colorType(act, 'creature-2', 'fshYellow');
  colorType(act, 'creature-3', 'fshRed');
}

function doMonsterColors() { // jQuery.min
  if (system.getValue('enableCreatureColoring')) {
    $.subscribe(def_afterUpdateActionlist, colorMonsters);
    colorMonsters();
  }
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

function fixDebuffQTip(e) { // jQuery.min
  $(e.target).qtip('hide');
}

function injectWorldNewMap(data) {
  sendGold.updateSendGoldOnWorld(data);
  if (data.realm && data.realm.name) {
    injectButtons(data);
    document.getElementById('buffList')
      .addEventListener('click', fixDebuffQTip);
    if (calf.hideSubLvlCreature) {GameData.fetch(256);}
  }
}

export default function subscribes() { // jQuery.min
  setupPref();
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

  //#if _DEV  //  "Your Lvl" does not update during combat #155
  $.subscribe('level.stats-player', function(e, data) {
    console.log('level.stats-player data', data); // eslint-disable-line no-console
  });
  //#endif

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
