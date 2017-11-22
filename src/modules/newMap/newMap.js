import combatLogger from './combatLogger';
import {def_afterUpdateActionlist} from '../support/dataObj';
import doNotKill from './doNotKill';
import {getElementById} from '../common/getElement';
import {getValue} from '../support/system';
import injectRelic from './relic/relic';
import onWorld from './onWorld';
import prepareShop from './shop';
import readyViewCreature from './viewCreature/viewCreature';
import setupPref from './subLevel';
import startMonsterLog from './monsterLog';

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
    if (getValue(el)) {
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
  var act = getElementById('actionList');
  colorType(act, 'creature-1', 'fshGreen');
  colorType(act, 'creature-2', 'fshYellow');
  colorType(act, 'creature-3', 'fshRed');
}

function doMonsterColors() { // jQuery.min
  if (getValue('enableCreatureColoring')) {
    $.subscribe(def_afterUpdateActionlist, colorMonsters);
    colorMonsters();
  }
}

function doRepair(e, key) {
  if (key === 'ACT_REPAIR') {GameData.fetch(403);}
}

export default function subscribes() { // jQuery.min
  setupPref();
  // subscribe to view creature events on the new map.
  $.subscribe('ready.view-creature', readyViewCreature);
  hideGroupButton(); // Hide Create Group button
  doMonsterColors();
  doNotKill(); // add do-not-kill list functionality
  startMonsterLog(); // add monster log functionality
  $.subscribe('keydown.controls', doRepair);
  combatLogger();
  onWorld(); // on world
  // somewhere near here will be multi buy on shop
  prepareShop();
  injectRelic();
  $('#messageCenter').worldMessageCenter({offset: '0 60'});
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
