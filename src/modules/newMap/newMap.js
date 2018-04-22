import combatLogger from './combatLogger';
import {def_afterUpdateActionlist} from '../support/constants';
import doNotKill from './doNotKill';
import {getElementById} from '../common/getElement';
import getValue from '../system/getValue';
import injectRelic from './relic/relic';
import onWorld from './onWorld';
import prepareShop from './shop';
import startMonsterLog from './monsterLog/monsterLog';
import viewCreature from './viewCreature/viewCreature';
import worldPrefs from './worldPrefs/worldPrefs';

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
  if (key === 'ACT_REPAIR') {GameData.fetch(402);}
}

export default function subscribes() { // jQuery.min
  worldPrefs();
  viewCreature();
  hideGroupButton(); // Hide Create Group button
  doMonsterColors();
  doNotKill(); // add do-not-kill list functionality
  startMonsterLog(); // add monster log functionality
  $.subscribe('keydown.controls', doRepair);
  combatLogger();
  onWorld(); // on world
  prepareShop();
  injectRelic();
  $('#messageCenter').worldMessageCenter({offset: '0 60'});
  $('#mapTooltip').qtip('hide');
}

// -1 = world page
// 0 = quest responce
// 1 = view creature
// 2 = attack creature
// 3 = attack player
// 4 = move
// 5 = use stair
// 6 = use chest
// 7 = take portal
// 9 = view relic
// 10 = empower relic
// 11 = take relic
// 12 = create group
// 13 = view shop
// 14 = purchase item
// 15 = repair
// 17 = login
// 18 = username not found
