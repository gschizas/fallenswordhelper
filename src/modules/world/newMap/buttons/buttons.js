import calf from '../../../support/calf';
import eventHandler5 from '../../../common/eventHandler5';
import fixTeleport from './fixTeleport';
import {getElementById} from '../../../common/getElement';
import getValue from '../../../system/getValue';
import hideQTip from '../../../common/hideQTip';
import insertElement from '../../../common/insertElement';
import insertElementBefore from '../../../common/insertElementBefore';
import makeToggleBtn from './makeToggleBtn';
import on from '../../../common/on';
import openQuickBuffByName from '../../../common/openQuickBuffByName';
import playerName from '../../../common/playerName';
import setText from '../../../common/setText';
import setValue from '../../../system/setValue';
import {
  createButton,
  createDiv,
  textSpan
} from '../../../common/cElement';
import {
  def_playerLevel,
  def_realmUpdate,
  def_subcmd,
  guideUrl,
  worldUrl
} from '../../../support/constants';

var buttonContainer;
var realmLvl;
var yourLvl;
var formGroup;
var quickBuff;
var realmMap;
var ufsgMap;
var soundCheck;
var huntCheck;

function doFormGroup(self) {
  hideQTip(self);
  GameData.doAction(12, 401, {}, 0);
}

function openQuickBuff() {
  openQuickBuffByName(playerName());
}

function openRealmMap() {
  window.open(worldUrl + def_subcmd + 'map', 'fsMap');
}

function openUfsgMap() {
  var gameRealm = GameData.realm();
  window.open(
    guideUrl + 'realms' + def_subcmd + 'view&realm_id=' + gameRealm.id,
    'mapUfsg'
  );
}

function toggleSound() {
  // Doesn't actually work in New World...
  setValue('playNewMessageSound', !getValue('playNewMessageSound'));
}

function toggleHuntMode() {
  calf.huntingMode = !calf.huntingMode;
  setValue('huntingMode', calf.huntingMode);
}

function makeButtonContainer() {
  return createDiv({
    className: 'fshCurveContainer',
    id: 'fshWorldButtonContainer'
  });
}

function exists(val) {
  if (val) {return val.toString();}
  return '?';
}

function minLvl() {
  var topDiv = createDiv({textContent: 'Min Lvl: '});
  realmLvl = textSpan(exists(GameData.realm().minlevel));
  insertElement(topDiv, realmLvl);
  return topDiv;
}

function yrLvl() {
  var btmDiv = createDiv({textContent: 'Your Lvl: '});
  yourLvl = textSpan(exists(GameData.player().level));
  insertElement(btmDiv, yourLvl);
  return btmDiv;
}

function doLevels(worldName) {
  var lvlDiv = createDiv({className: 'fshFsty'});
  insertElement(lvlDiv, minLvl());
  insertElement(lvlDiv, yrLvl());
  insertElement(worldName, lvlDiv);
}

function doBtn(className, tip, worldName) {
  var btn = createButton({
    className: 'fshCurveEle fshCurveBtn fshPoint tip-static ' + className,
    dataset: {tipped: tip}
  });
  insertElement(worldName, btn);
  return btn;
}

function showQuickLinks(worldName) {
  doLevels(worldName);
  formGroup = doBtn('fshFormGroup', 'Quick Create Attack Group', worldName);
  quickBuff = doBtn('fshQuickBuff', 'Open Quick Buff Popup', worldName);
  realmMap = doBtn('fshRealmMap', 'Open Realm Map', worldName);
  ufsgMap = doBtn('fshTempleOne', 'Search map in Ultimate FSG', worldName);
}

function showSpeakerOnWorld(worldName) {
  if (getValue('showSpeakerOnWorld')) {
    var msgSounds = getValue('playNewMessageSound');
    soundCheck = makeToggleBtn({
      prefVal: msgSounds,
      checkId: 'fshSoundCheck',
      onClass: 'soundOn',
      onTip: 'Turn Off Sound when you have a new log message',
      offClass: 'soundOff',
      offTip: 'Turn On Sound when you have a new log message',
      worldName: worldName
    });
  }
}

function showHuntMode(worldName) {
  var inHuntMode = calf.huntingMode;
  huntCheck = makeToggleBtn({
    prefVal: inHuntMode,
    checkId: 'fshHuntCheck',
    onClass: 'huntOn',
    onTip: 'Hunting mode is ON',
    offClass: 'huntOff',
    offTip: 'Hunting mode is OFF',
    worldName: worldName
  });
}

function addButtons() {
  showQuickLinks(buttonContainer);
  showSpeakerOnWorld(buttonContainer);
  showHuntMode(buttonContainer);
}

var changeHdl = [
  [function(self) {return self === soundCheck;}, toggleSound],
  [function(self) {return self === huntCheck;}, toggleHuntMode]
];

var clickHdl = [
  [function(self) {return self === formGroup;}, doFormGroup],
  [function(self) {return self === quickBuff;}, openQuickBuff],
  [function(self) {return self === realmMap;}, openRealmMap],
  [function(self) {return self === ufsgMap;}, openUfsgMap]
];

function setupHandlers() {
  on(buttonContainer, 'click', eventHandler5(clickHdl));
  on(buttonContainer, 'change', eventHandler5(changeHdl));
}

function injectButtons() {
  if (!buttonContainer) {
    buttonContainer = makeButtonContainer();
    addButtons();
    setupHandlers();
    insertElementBefore(buttonContainer, getElementById('worldCoord'));
  }
}

function realmUpdate(e, data) {
  if (realmLvl && data.b.minlevel) {
    fixTeleport();
    setText(data.b.minlevel, realmLvl);
  }
}

function levelStats(e, data) {
  if (yourLvl) {
    setText(data.b, yourLvl);
  }
}

export default function initButtons() {
  injectButtons();
  $.subscribe(def_realmUpdate, realmUpdate);
  $.subscribe(def_playerLevel, levelStats);
}
