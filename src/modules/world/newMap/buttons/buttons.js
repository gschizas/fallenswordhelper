import calf from '../../../support/calf';
import eventHandler from '../../../common/eventHandler';
import fixTeleport from './fixTeleport';
import {getElementById} from '../../../common/getElement';
import getValue from '../../../system/getValue';
import insertElement from '../../../common/insertElement';
import insertElementBefore from '../../../common/insertElementBefore';
import makeToggleBtn from './makeToggleBtn';
import on from '../../../common/on';
import openQuickBuffByName from '../../../common/openQuickBuffByName';
import playerName from '../../../common/playerName';
import setValue from '../../../system/setValue';
import {
  createButton,
  createDiv,
  textSpan
} from '../../../common/cElement';
import {
  def_playerLevel,
  def_realmUpdate,
  guideUrl
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

function doFormGroup(self) { // jQuery.min
  $(self).qtip('hide');
  GameData.doAction(12, 401, {}, 0);
}

function openQuickBuff() {
  openQuickBuffByName(playerName());
}

function openRealmMap() {
  window.open('index.php?cmd=world&subcmd=map', 'fsMap');
}

function openUfsgMap() {
  var gameRealm = GameData.realm();
  window.open(guideUrl + 'realms&subcmd=view&realm_id=' + gameRealm.id,
    'mapUfsg');
}

function toggleSound() {
  // Doesn't actually work in New World...
  setValue('playNewMessageSound', !getValue('playNewMessageSound'));
}

function toggleHuntMode() {
  calf.huntingMode = !calf.huntingMode;
  setValue('huntingMode', calf.huntingMode);
}

var changeHdl = [
  {
    test: function(self) {return self === soundCheck;},
    act: toggleSound
  },
  {
    test: function(self) {return self === huntCheck;},
    act: toggleHuntMode
  }
];

var clickHdl = [
  {
    test: function(self) {return self === formGroup;},
    act: doFormGroup
  },
  {
    test: function(self) {return self === quickBuff;},
    act: openQuickBuff
  },
  {
    test: function(self) {return self === realmMap;},
    act: openRealmMap
  },
  {
    test: function(self) {return self === ufsgMap;},
    act: openUfsgMap
  }
];

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

function setupHandlers() {
  on(buttonContainer, 'click', eventHandler(clickHdl));
  on(buttonContainer, 'change', eventHandler(changeHdl));
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
    realmLvl.textContent = data.b.minlevel.toString();
  }
}

function levelStats(e, data) {
  if (yourLvl) {
    yourLvl.textContent = data.b;
  }
}

export default function initButtons() {
  injectButtons();
  $.subscribe(def_realmUpdate, realmUpdate);
  $.subscribe(def_playerLevel, levelStats);
}
