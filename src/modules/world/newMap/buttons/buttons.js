import calf from '../../../support/calf';
import eventHandler from '../../../common/eventHandler';
import fixTeleport from './fixTeleport';
import {getElementById} from '../../../common/getElement';
import getValue from '../../../system/getValue';
import insertElement from '../../../common/insertElement';
import insertElementBefore from '../../../common/insertElementBefore';
import on from '../../../common/on';
import openQuickBuffByName from '../../../common/openQuickBuffByName';
import playerName from '../../../common/playerName';
import setValue from '../../../system/setValue';
import {
  createButton,
  createDiv,
  createInput,
  createLabel,
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

function getMinLevel() {
  var minLevel = GameData.realm().minlevel;
  if (minLevel) {return minLevel.toString();}
  return '?';
}

function doLevels(worldName) {
  var lvlDiv = createDiv({className: 'fshFsty'});
  var topDiv = createDiv({textContent: 'Min Lvl: '});
  realmLvl = textSpan(getMinLevel());
  insertElement(topDiv, realmLvl);
  insertElement(lvlDiv, topDiv);
  var btmDiv = createDiv({textContent: 'Your Lvl: '});
  yourLvl = textSpan(GameData.player().level.toString());
  insertElement(btmDiv, yourLvl);
  insertElement(lvlDiv, btmDiv);
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

function createLbl(className, tip, htmlFor) {
  return createLabel({
    className: 'fshCurveEle fshCurveLbl fshPoint tip-static ' + className,
    dataset: {tipped: tip},
    htmlFor: htmlFor
  });
}

function makeToggleBtn(o) {
  var btnDiv = createDiv({className: 'fshToggle'});
  var btnCheck = createInput({
    checked: o.prefVal,
    id: o.checkId,
    type: 'checkbox'
  });
  insertElement(btnDiv, btnCheck);
  var onLbl = createLbl(o.onClass, o.onTip, o.checkId);
  insertElement(btnDiv, onLbl);
  var offLbl = createLbl(o.offClass, o.offTip, o.checkId);
  insertElement(btnDiv, offLbl);
  insertElement(o.worldName, btnDiv);
  return btnCheck;
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

function injectButtons() {
  if (!buttonContainer) {
    buttonContainer = makeButtonContainer();
    showQuickLinks(buttonContainer);
    showSpeakerOnWorld(buttonContainer);
    showHuntMode(buttonContainer);
    on(buttonContainer, 'click', eventHandler(clickHdl));
    on(buttonContainer, 'change', eventHandler(changeHdl));
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
