import calf from '../support/calf';
import eventHandler from '../common/eventHandler';
import {getElementById} from '../common/getElement';
import getValue from '../system/getValue';
import {guideUrl} from '../support/constants';
import insertElement from '../common/insertElement';
import on from '../common/on';
import openQuickBuffByName from '../common/openQuickBuffByName';
import playerName from '../common/playerName';
import setValue from '../system/setValue';
import {
  createButton,
  createDiv,
  createInput,
  createLabel,
  textSpan
} from '../common/cElement';

var buttonContainer;
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

function fixTeleport() {
  if (window.GameController && GameController.Realm) {
    GameController.Realm.footprintTileList = []; // BUGFIX - in case of teleporting in new realm with footprints turned on
  }
}

function makeButtonContainer() {
  if (buttonContainer) {buttonContainer.remove();}
  return createDiv({
    className: 'fshCurveContainer',
    id: 'fshWorldButtonContainer'
  });
}

function doLevels(data, worldName) {
  var lvlDiv = createDiv({
    className: 'fshFsty',
    innerHTML: '<div>Min Lvl: ' + data.realm.minlevel + '</div>'
  });
  var btmDiv = createDiv({textContent: 'Your Lvl: '});
  yourLvl = textSpan(data.player.level.toString());
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

function showQuickLinks(worldName, data) {
  doLevels(data, worldName);
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

export function injectButtons(data) {
  fixTeleport();
  buttonContainer = makeButtonContainer();
  showQuickLinks(buttonContainer, data);
  showSpeakerOnWorld(buttonContainer);
  showHuntMode(buttonContainer);
  on(buttonContainer, 'click', eventHandler(clickHdl));
  on(buttonContainer, 'change', eventHandler(changeHdl));
  getElementById('worldContainer')
    .insertBefore(buttonContainer, getElementById('worldCoord'));
}

export function levelStats(e, data) {
  if (yourLvl) {
    yourLvl.textContent = data.b;
  }
}
