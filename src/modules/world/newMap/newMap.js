import {buffInfo} from './buffInfo/buffInfo';
import combatLogger from './combatLogger';
import {createStyle} from '../../common/cElement';
import doNotKill from './doNotKill/doNotKill';
import executeAll from '../../common/executeAll';
import {getElementById} from '../../common/getElement';
import getValue from '../../system/getValue';
import hideQTip from '../../common/hideQTip';
import initButtons from './buttons/buttons';
import injectRelic from './relic/relic';
import {injectSendGoldOnWorld} from './sendGold';
import insertElement from '../../common/insertElement';
import on from '../../common/on';
import onWorld from './onWorld';
import partial from '../../common/partial';
import prepareShop from './shop';
// import querySelectorArray from '../../common/querySelectorArray';
import startMonsterLog from './monsterLog/monsterLog';
import viewCreature from './viewCreature/viewCreature';
import worldPrefs from './worldPrefs/worldPrefs';
import {
  //#if _DEV  //  hide titan combat results
  def_PvE,
  //#endif
  def_afterUpdateActionlist,
  def_controlsKeydown,
  def_fetch_playerBackpackCount,
  def_fetch_playerBuffs,
  def_fetch_worldRealmActions,
  def_fetch_worldRealmDynamic
} from '../../support/constants';

//#if _DEV  //  hide titan combat results
function didNotExist(data) {
  return data.response && data.response.msg &&
    data.response.msg === 'Creature did not exist at that location ' +
      '(may have been killed by another player).';
}

function removeAction(data) {
  if (didNotExist(data)) {
    GameData.fetch(
      def_fetch_worldRealmDynamic +
      def_fetch_worldRealmActions
    );
  }
}

function hideTitanViewCombat(e, data) {
  // console.log('data', data);
  removeAction(data);
  // querySelectorArray('.creature-4 > .quickCombat > .verbs')
  //   .forEach(function(el) {el.remove();});
}

function hideTitanCombatResults() {
  $.subscribe(def_PvE, hideTitanViewCombat); // TODO Pref
}

//#endif
function hideGroupByType(type) { // jQuery
  $('#actionList li.creature-' + type.toString() + ' a.create-group').hide();
}

function hideGroupSubscribe(type) { // jQuery.min
  $.subscribe(def_afterUpdateActionlist, partial(hideGroupByType, type));
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

function injectMonsterStyle() {
  insertElement(document.body, createStyle(
    '#actionList .creature-1 {color: green;}\n' +
    '#actionList .creature-2 {color: yellow;}\n' +
    '#actionList .creature-3 {color: red;}'
  ));
}

function doMonsterColors() {
  if (getValue('enableCreatureColoring')) {injectMonsterStyle();}
}

function doRepair(e, key) {
  if (key === 'ACT_REPAIR') {
    GameData.fetch(
      def_fetch_playerBackpackCount +
      def_fetch_playerBuffs +
      def_fetch_worldRealmDynamic +
      def_fetch_worldRealmActions
    );
  }
}

function repairButton() {
  $.subscribe(def_controlsKeydown, doRepair);
}

function msgCenterOffset() {
  $('#messageCenter').worldMessageCenter({offset: '0 60'});
}

function hideMapTooltip() {
  hideQTip('#mapTooltip');
}

function fixDebuffQTip(e) {
  hideQTip(e.target);
}

function fixDebuff() {
  on(getElementById('buffList'), 'click', fixDebuffQTip);
}

export default function subscribes() {
  executeAll([
    worldPrefs,
    injectSendGoldOnWorld,
    viewCreature,
    hideGroupButton,
    doMonsterColors,
    doNotKill,
    startMonsterLog,
    repairButton,
    combatLogger,
    onWorld,
    prepareShop,
    injectRelic,
    msgCenterOffset,
    hideMapTooltip,
    initButtons,
    buffInfo,
    fixDebuff,
    //#if _DEV  //  hide titan combat results
    hideTitanCombatResults
    //#endif
  ]);
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
