import calf from '../../../support/calf';
import eventHandler5 from '../../../common/eventHandler5';
import fixTeleport from './fixTeleport';
import { getElementById } from '../../../common/getElement';
import getValue from '../../../system/getValue';
import hideQTip from '../../../common/hideQTip';
import insertElement from '../../../common/insertElement';
import insertElementBefore from '../../../common/insertElementBefore';
import makeToggleBtn from './makeToggleBtn';
import on from '../../../common/on';
import onclick from '../../../common/onclick';
import openQuickBuffByName from '../../../common/openQuickBuffByName';
import playerName from '../../../common/playerName';
import setText from '../../../common/setText';
import setValue from '../../../system/setValue';
import {
  createButton,
  createDiv,
  textSpan,
} from '../../../common/cElement';
import {
  def_playerLevel,
  def_realmUpdate,
  def_subcmd,
  guideUrl,
  worldUrl,
} from '../../../support/constants';

let buttonContainer;
let realmLvl;
let yourLvl;
let formGroup;
let quickBuff;
let realmMap;
let ufsgMap;
let soundCheck;
let huntCheck;

function doFormGroup(target) {
  hideQTip(target);
  GameData.doAction(12, 401, {}, 0);
}

function openQuickBuff() {
  openQuickBuffByName(playerName());
}

function openRealmMap() {
  window.open(`${worldUrl + def_subcmd}map`, 'fsMap');
}

function openUfsgMap() {
  const gameRealm = GameData.realm();
  window.open(
    `${guideUrl}realms${def_subcmd}view&realm_id=${gameRealm.id}`,
    'mapUfsg',
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
    id: 'fshWorldButtonContainer',
  });
}

function exists(val) {
  if (val) { return val.toString(); }
  return '?';
}

function minLvl() {
  const topDiv = createDiv({ textContent: 'Min Lvl: ' });
  realmLvl = textSpan(exists(GameData.realm().minlevel));
  insertElement(topDiv, realmLvl);
  return topDiv;
}

function yrLvl() {
  const btmDiv = createDiv({ textContent: 'Your Lvl: ' });
  yourLvl = textSpan(exists(GameData.player().level));
  insertElement(btmDiv, yourLvl);
  return btmDiv;
}

function doLevels(worldName) {
  const lvlDiv = createDiv({ className: 'fshFsty' });
  insertElement(lvlDiv, minLvl());
  insertElement(lvlDiv, yrLvl());
  insertElement(worldName, lvlDiv);
}

function doBtn(className, tip, worldName) {
  const btn = createButton({
    className: `fshCurveEle fshCurveBtn fshPoint tip-static ${className}`,
    dataset: { tipped: tip },
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
    const msgSounds = getValue('playNewMessageSound');
    soundCheck = makeToggleBtn({
      prefVal: msgSounds,
      checkId: 'fshSoundCheck',
      onClass: 'soundOn',
      onTip: 'Turn Off Sound when you have a new log message',
      offClass: 'soundOff',
      offTip: 'Turn On Sound when you have a new log message',
      worldName,
    });
  }
}

function showHuntMode(worldName) {
  const inHuntMode = calf.huntingMode;
  huntCheck = makeToggleBtn({
    prefVal: inHuntMode,
    checkId: 'fshHuntCheck',
    onClass: 'huntOn',
    onTip: 'Hunting mode is ON',
    offClass: 'huntOff',
    offTip: 'Hunting mode is OFF',
    worldName,
  });
}

function addButtons() {
  showQuickLinks(buttonContainer);
  showSpeakerOnWorld(buttonContainer);
  showHuntMode(buttonContainer);
}

const changeHdl = [
  [function (target) { return target === soundCheck; }, toggleSound],
  [function (target) { return target === huntCheck; }, toggleHuntMode],
];

const clickHdl = [
  [function (target) { return target === formGroup; }, doFormGroup],
  [function (target) { return target === quickBuff; }, openQuickBuff],
  [function (target) { return target === realmMap; }, openRealmMap],
  [function (target) { return target === ufsgMap; }, openUfsgMap],
];

function setupHandlers() {
  onclick(buttonContainer, eventHandler5(clickHdl));
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
