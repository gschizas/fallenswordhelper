import { c as calf, b as createDiv, y as getElementById, z as setText, i as insertElement, s as partial, ae as defFetchPlayerBuffs, f as insertHtmlBeforeEnd, o as onclick, O as isArray, af as defPlayerBuffs, ag as defPlayerUpdate, ah as defTeleport, V as setValue, ai as defPvE, G as getValue, B as getText, aj as isUndefined, ak as isFunction, al as defAfterUpdateActionlist, am as defFetchWorldRealmDynamic, an as defFetchWorldRealmActions, E as querySelectorArray, ao as hideQTip, ap as worldUrl, aq as defSubcmd, ar as guideUrl, k as on, as as defRealmUpdate, at as defPlayerLevel, A as setInnerHtml, a1 as playerIdUrl, T as nowSecs, au as keys, t as createDocument, ab as querySelectorAll, a3 as fallback, av as defenderMultiplier, D as querySelector, u as indexAjaxData, P as once, aw as defRelicView, ax as doSendGold, ay as defPlayerGold, az as initSendGoldOnWorld, aA as sendGoldonWorld, aB as retryAjax, q as extend, a as add, I as getElementsByClassName, aC as defStatAttack, aD as defStatDefense, aE as defStatArmor, aF as defStatDamage, aG as defStatHp, aH as cdn, M as arrayFrom, W as sendEvent, h as hasClass, a6 as now, aI as months, aJ as defRefreshActionList, aK as defStairway, aL as defShopPrompt, aM as defViewCreature, aN as jsonParse, aO as defFetchPlayerBackpackCount, aP as defControlsKeydown } from './calfSystem-d357ca6f.js';
import { n as numberIsNaN } from './numberIsNaN-fa7d637d.js';
import { r as round } from './round-6850c0fc.js';
import { r as roundToString } from './roundToString-16988956.js';
import { p as playerName$1 } from './playerName-35237fe6.js';
import { c as createInput } from './createInput-1c302e98.js';
import { i as insertTextBeforeEnd } from './insertTextBeforeEnd-aa5dcf23.js';
import './testRange-e43cb031.js';
import { t as testQuant } from './testQuant-8065b1d8.js';
import { a as addCommas } from './addCommas-508f0c08.js';
import { c as createLabel } from './createLabel-bffcab0e.js';
import { i as insertElementBefore } from './insertElementBefore-1b96a575.js';
import { c as createStyle } from './createStyle-902bfd70.js';
import './currentGuildId-bcd6f2c1.js';
import './intValue-e8157483.js';
import { v as valueText } from './valueText-6e721c40.js';
import './fshOpen-3e1a5fea.js';
import { o as openQuickBuffByName } from './openQuickBuffByName-9578347f.js';
import './createUl-59f2f9ee.js';
import { s as set, g as get } from './idb-255a2314.js';
import './isChecked-6167b36b.js';
import { b as simpleCheckboxHtml } from './simpleCheckbox-9f95c1f3.js';
import { c as createTable } from './createTable-337c0681.js';
import { p as padZ } from './padZ-bd3dfcf9.js';
import { c as createButton } from './createButton-5b3775c7.js';
import './createLi-f67322bc.js';
import { c as createSpan } from './createSpan-46429624.js';
import { h as hideElement } from './hideElement-f7381055.js';
import { e as executeAll } from './executeAll-be2ac0ec.js';
import './chunk-c85463de.js';
import './indexAjaxJson-e70729f5.js';
import './cmdExport-a9059769.js';
import './csvSplit-1d6bbc93.js';
import { s as shouldBeArray } from './shouldBeArray-9565f7ee.js';
import { g as getArrayByClassName } from './getArrayByClassName-e9f21d77.js';
import { t as toggleForce } from './toggleForce-c034bc71.js';
import { a as all } from './all-36f83e81.js';
import { e as eventHandler5 } from './eventHandler5-3a0f728c.js';
import { h as hasClasses } from './hasClasses-93c8a11a.js';
import { i as insertElementAfter } from './insertElementAfter-db315247.js';
import { g as getProfile } from './getProfile-4c52e27c.js';
import { m as myStats } from './myStats-87c887c9.js';
import { g as guild } from './guild-6076bd6b.js';
import { a as allthen } from './allthen-7d061027.js';
import './isSelected-9a0f1276.js';
import { r as rnd } from './rnd-309b2e54.js';
import { g as getMembrList } from './getMembrList-572d1f40.js';
import { d as doBuffLinks, g as getGroupStats$1 } from './getGroupStats-b7a118f1.js';
import './groupViewStats-c155e3cc.js';
import { g as getMercStats } from './getMercStats-c756d234.js';
import { b as bitwiseAnd } from './bitwiseAnd-af4dee83.js';
import { r as reduceBuffArray } from './reduceBuffArray-77073669.js';
import { g as getKillsPct, a as getTitanString } from './getTitanString-6b80cb43.js';
import { q as quickbuffSuccess, d as daQuickbuff } from './quickbuffSuccess-ed32bd89.js';
import { a as huntingBuffsHtml } from './huntingBuffs-d92305c3.js';

var css = "/* World Action List */\r\n#actionList .crate {background-color: PaleVioletRed;}\r\n";
var modules_4cf20f2f = {};

let containerDiv;

function value(e) { return e; }

function wantsBuffInfo(ary) {
  return calf.showBuffInfo && ary.some(value);
}

function drawBuffInfo() {
  if (containerDiv) {
    toggleForce(containerDiv, false);
  } else {
    containerDiv = createDiv({
      className: 'fshActionBox',
      innerHTML: '<div></div><div></div><div></div>'
        + '<div></div><div></div><div></div>',
    });
    const actCont = getElementById('actionContainer');
    insertElementAfter(containerDiv, actCont.children[2]);
  }
  return containerDiv;
}

function hideBuffInfo() {
  if (containerDiv) {
    toggleForce(containerDiv, true);
  }
}

function buffInfoDiv(ary) {
  if (wantsBuffInfo(ary)) {
    return drawBuffInfo();
  }
  hideBuffInfo();
}

let caDiv;
let caSpan;

function initCaDiv(containerDiv) {
  // eslint-disable-next-line prefer-destructuring
  caDiv = containerDiv.children[3];
  caDiv.className = 'fshBlue';
  setText('CA ', caDiv);
  caSpan = createSpan();
  insertElement(caDiv, caSpan);
  insertTextBeforeEnd(caDiv, ' active');
}

function hasCa(containerDiv, ca) {
  if (caDiv) {
    toggleForce(caDiv, false);
  } else {
    initCaDiv(containerDiv);
  }
  setText(ca.level, caSpan);
}

function hideCa() {
  if (caDiv) {
    toggleForce(caDiv, true);
  }
}

function doCa(containerDiv, ca) {
  if (ca) {
    hasCa(containerDiv, ca);
  } else {
    hideCa();
  }
}

let dblDiv;
let dblSpan;

function initDblDiv(containerDiv) {
  // eslint-disable-next-line prefer-destructuring
  dblDiv = containerDiv.children[4];
  dblDiv.className = 'fshRed';
  setText('Doubler ', dblDiv);
  dblSpan = createSpan();
  insertElement(dblDiv, dblSpan);
  insertTextBeforeEnd(dblDiv, ' active');
}

function hasDbl(containerDiv, dbl) {
  if (dblDiv) {
    toggleForce(dblDiv, false);
  } else {
    initDblDiv(containerDiv);
  }
  setText(dbl.level, dblSpan);
}

function hideDbl() {
  if (dblDiv) {
    toggleForce(dblDiv, true);
  }
}

function doDbl(containerDiv, dbl) {
  if (dbl) {
    hasDbl(containerDiv, dbl);
  } else {
    hideDbl();
  }
}

let ddDiv;
let ddSpan;

function initDdDiv(containerDiv) {
  // eslint-disable-next-line prefer-destructuring
  ddDiv = containerDiv.children[2];
  setText('Damage bonus: ', ddDiv);
  ddSpan = createSpan();
  insertElement(ddDiv, ddSpan);
  insertTextBeforeEnd(ddDiv, '%');
}

function getDdBonus(dd, killStreak) {
  if (dd) {
    const ddPerc = Math.min(
      Math.round(
        Math.floor(killStreak / 5) * Number(dd.level),
      ) * 0.01, 20,
    );
    const ddBonus = round(ddPerc, 2);
    return ddBonus.toString();
  }
  return '0';
}

function hasDd(containerDiv, dd, ks) {
  if (ddDiv) {
    toggleForce(ddDiv, false);
  } else {
    initDdDiv(containerDiv);
  }
  setText(getDdBonus(dd, Number(ks)), ddSpan);
}

function hideDd() {
  if (ddDiv) {
    toggleForce(ddDiv, true);
  }
}

function doDeathDealer(containerDiv, dd, ks) {
  if (dd) {
    hasDd(containerDiv, dd, ks);
  } else {
    hideDd();
  }
}

function setTextCommas(value, node) {
  setText(addCommas(value), node);
}

let ksDiv;
let killStreakSpan;

function initKsDiv(containerDiv) {
  // eslint-disable-next-line prefer-destructuring
  ksDiv = containerDiv.children[1];
  setText('Kill Streak: ', ksDiv);
  killStreakSpan = createSpan();
  insertElement(ksDiv, killStreakSpan);
}

function showKs(containerDiv, ks) {
  if (ksDiv) {
    toggleForce(ksDiv, false);
  } else {
    initKsDiv(containerDiv);
  }
  setTextCommas(ks, killStreakSpan);
}

function hideKs() {
  if (ksDiv) {
    toggleForce(ksDiv, true);
  }
}

function doKs(containerDiv, dd, titanActive, ks) {
  if (dd || titanActive) {
    showKs(containerDiv, ks);
  } else {
    hideKs();
  }
}

function thisBuff(name, e) { return e.name === name; }

function getBuff(name) {
  const { buffs } = GameData.player();
  if (buffs) {
    return buffs.find(partial(thisBuff, name));
  }
}

function getCooldown() {
  const cooldown = GameData.player().teleportCooldown;
  return cooldown > 1 && cooldown;
}

const colorHash = [
  'red', // Should never see this.
  'orange',
  'yellow',
];

function impIconColour() { // jQuery
  const imp = $('#actionlist-shield-imp');
  if (imp.length === 1) {
    imp.css('background-color',
      colorHash[imp.text()] || '#ad8043');
  }
}

var css$1 = ".cR .imp-0 {\r\n  color: red;\r\n  font-weight: bold;\r\n}\r\n.cR .imp-1 {\r\n  color: orangered;\r\n  font-weight: bold;\r\n}\r\n.cR .xSmallLink {\r\n  cursor: pointer;\r\n  text-decoration: underline;\r\n  color: blue;\r\n  font-size: xx-small;\r\n}\r\n";
var modules_7957c1f7 = {};

let impDiv;
let impRemainingSpan;

function refreshBuffs(json) {
  if (quickbuffSuccess(json)) {
    GameData.fetch(defFetchPlayerBuffs);
  }
}

function recastClick() {
  if (getBuff('Summon Shield Imp')) { return; }
  daQuickbuff([playerName$1()], [55]).then(refreshBuffs);
}

function getImpsRemaining(imp) {
  if (imp) {
    return Number(imp.stack);
  }
  return 0;
}

const impStyles = [
  'imp-0',
  'imp-1',
  'imp-1',
];

function getImpWarningStyle(impsRem) {
  return impStyles[impsRem] || 'fshGreen';
}

function initImpDiv(containerDiv) {
  // eslint-disable-next-line prefer-destructuring
  impDiv = containerDiv.children[0];
  setText('Shield Imps Remaining: ', impDiv);
  impRemainingSpan = createSpan();
  insertElement(impDiv, impRemainingSpan);
  insertHtmlBeforeEnd(impDiv, '&nbsp;');
  const recast = createSpan({ className: 'xSmallLink', textContent: 'Recast' });
  insertElement(impDiv, recast);
  onclick(recast, recastClick);
}

function hasImp(containerDiv, imp) {
  if (impDiv) {
    toggleForce(impDiv, false);
  } else {
    initImpDiv(containerDiv);
  }
  const impsRem = getImpsRemaining(imp);
  impDiv.className = getImpWarningStyle(impsRem);
  setText(impsRem, impRemainingSpan);
}

function hideImpWarning() {
  if (impDiv) {
    toggleForce(impDiv, true);
  }
}

function impWarning(containerDiv, imp, dd) {
  if (imp || dd) {
    hasImp(containerDiv, imp);
  } else {
    hideImpWarning();
  }
}

function hasTitan(el) { return el.type === 0; }

function titanKs() {
  const { dynamic } = GameData.realm();
  return isArray(dynamic) && dynamic.some(hasTitan);
}

function textSpan(text) {
  return createSpan({ textContent: text });
}

let cdDiv;
let cooldownSpan;
let lastTp;

function initCdDiv(containerDiv, cd) {
  // eslint-disable-next-line prefer-destructuring
  cdDiv = containerDiv.children[5];
  setText('Teleport Cooldown: ', cdDiv);
  cooldownSpan = textSpan(cd.toString());
  insertElement(cdDiv, cooldownSpan);
}

function hasCd(containerDiv, cd) {
  if (cdDiv) {
    toggleForce(cdDiv, false);
  } else {
    initCdDiv(containerDiv, cd);
  }
}

function hideCd() {
  if (cdDiv) {
    toggleForce(cdDiv, true);
  }
}

function updateCooldown() {
  const secs = Math.max(Math.ceil((lastTp - Date.now()) / 1000), 0);
  setText(secs, cooldownSpan);
  if (secs > 0) {
    setTimeout(updateCooldown, 500);
  }
}

function doCountdown(teleportCooldown) {
  if (cooldownSpan) {
    lastTp = Date.now() + teleportCooldown * 1000;
    updateCooldown();
  }
}

function tpCooldown(containerDiv, cd) {
  if (cd) {
    hasCd(containerDiv, cd);
  } else {
    hideCd();
  }
}

let dd;
let dbl;
let ca;
let imp;
let cd;
let titanActive;
let ks;

function initVars() {
  dd = getBuff('Death Dealer');
  dbl = getBuff('Doubler');
  ca = getBuff('Counter Attack');
  imp = getBuff('Summon Shield Imp');
  cd = getCooldown();
  titanActive = titanKs();
  ks = GameData.player().killStreak;
}

function updateBuffInfo() {
  impIconColour();
  initVars();
  const containerDiv = buffInfoDiv([dd, dbl, ca, imp, cd, titanActive]);
  if (containerDiv) {
    impWarning(containerDiv, imp, dd);
    doKs(containerDiv, dd, titanActive, ks);
    doDeathDealer(containerDiv, dd, ks);
    doCa(containerDiv, ca);
    doDbl(containerDiv, dbl);
    tpCooldown(containerDiv, cd);
  }
}

function teleportEvent(e, data) {
  doCountdown(data.player.teleportCooldown);
}

function buffInfo() {
  updateBuffInfo();
  $.subscribe(`${defPlayerBuffs} ${defPlayerUpdate}`, updateBuffInfo);
  $.subscribe(defTeleport, teleportEvent);
}

function toggleBuffInfo() {
  calf.showBuffInfo = !calf.showBuffInfo;
  setValue('showBuffInfo', calf.showBuffInfo);
  updateBuffInfo();
}

// Taking the Not Save in case they add new enhancements.
const notSave = ['Breaker', 'Protection', 'Master Thief', 'Protect Gold',
  'Disarm', 'Duelist', 'Thievery', 'Master Blacksmith', 'Master Crafter',
  'Fury Caster', 'Master Inventor', 'Sustain'];
let combatLog = [];
let combatData;

function storeBuffs(buff) {
  if (buff.id === 54 || buff.id === 26) {
    combatData.player.buffs[buff.id] = parseInt(buff.level, 10);
  }
}

function storeEnhancements(enh) {
  if (notSave.indexOf(enh.name) === -1) {
    combatData.player.enhancements[enh.name] = enh.value;
  }
}

function hazBuffs(data) {
  if (data.player.buffs) {
    data.player.buffs.forEach(storeBuffs); // loop through buffs,
    // only need to keep CA and Doubler 54 = ca, 26 = doubler
  }
}

function hazEnhancements(data) {
  if (data.player.enhancements) {
    data.player.enhancements.forEach(storeEnhancements); // loop through enhancements
  }
}

function processCombatResponse(e, data) {
  combatData = {};
  combatData.combat = data.response.data;
  if (combatData.combat.inventory_id) {
    combatData.combat.drop = combatData.combat.item.id;
  }

  combatData.player = {};
  combatData.player.buffs = {};
  combatData.player.enhancements = {};
  hazBuffs(data);
  hazEnhancements(data);
  combatData.time = data.time;
  combatLog.push(combatData);
  set('fsh_combatLog', combatLog);
}

function combatResponse(e, data) {
  // If bad response do nothing.
  if (data.response.response === 0) { processCombatResponse(e, data); }
}

function gotCombatLog(data) { // jQuery.min
  if (data) { combatLog = data; }
  $.subscribe(defPvE, combatResponse);
}

function combatLogger() { // jQuery.min
  if (getValue('keepLogs')) {
    get('fsh_combatLog').then(gotCombatLog);
  }
}

function isOnList(creatureName) {
  return calf.doNotKillList.includes(creatureName.trim());
}

function doNotKillBlue(el) {
  el.classList.toggle('fshBlue', isOnList(getText(el)));
}

function afterUpdateActionList() {
  // color the critters in the do no kill list blue
  const act = getElementById('actionList');
  getArrayByClassName('creature', act).forEach(doNotKillBlue);
}

function creatureOnList(creatureName, passback) {
  if (isOnList(creatureName)) {
    getElementById('actionList').children[passback].children[0].children[1]
      .classList.remove('loading');
    return true;
  }
}

function weShouldBlock(passback) {
  // Do custom stuff e.g. do not kill list
  const creature = GameData.actions()[passback];
  if (creature) {
    return creatureOnList(creature.data.name, passback);
  }
}

function interceptCreatureCombat(oldDoAction) {
  return function c(action, fetch, data, attempts) {
    if (weShouldBlock(data.passback)) { return; }
    // Call standard action
    oldDoAction(action, fetch, data, attempts);
  };
}

const actionsToIntercept = {
  // defCreatureCombat
  2: interceptCreatureCombat,
};

function firstAttempt(attempts) {
  return isUndefined(attempts) || attempts === 0;
}

function goodInterceptFunction(interceptFunction) {
  return interceptFunction && isFunction(interceptFunction);
}

function maybeIntercept(oldDoAction) {
  return function d(action, fetch, data, attempts) {
    const interceptFunction = actionsToIntercept[action];
    if (goodInterceptFunction(interceptFunction) && firstAttempt(attempts)) {
      interceptFunction(oldDoAction)(action, fetch, data, attempts);
    } else {
      oldDoAction(action, fetch, data, attempts);
    }
  };
}

function interceptDoAction() {
  const oldDoAction = GameData.doAction;
  GameData.doAction = maybeIntercept(oldDoAction);
}

function doNotKill() {
  $.subscribe(defAfterUpdateActionlist, afterUpdateActionList);
  afterUpdateActionList();
  // then intercept the action call
  interceptDoAction();
}

function didNotExist(data) {
  return data.response && data.response.msg
    && data.response.msg.startsWith('Creature did not exist at that location');
}

function removeAction(data) {
  if (didNotExist(data)) {
    GameData.fetch(
      defFetchWorldRealmDynamic
      + defFetchWorldRealmActions,
    );
  }
}

function removeElement(el) { el.remove(); }

function hideTitanViewCombat(e, data) {
  removeAction(data);
  querySelectorArray('.creature-4 > .quickCombat > .verbs')
    .forEach(removeElement);
}

function hideTitanCombatResults() {
  $.subscribe(defPvE, hideTitanViewCombat); // TODO Pref
}

// BUGFIX - in case of teleporting in new realm with footprints turned on

function invalidFootprints() {
  return window.GameController && GameController.Realm
    && !GameController.Realm.footprintTileList;
}

function fixTeleport() {
  if (invalidFootprints()) {
    GameController.Realm.footprintTileList = [];
  }
}

function createLbl(className, tip, htmlFor) {
  return createLabel({
    className: `fshCurveEle fshCurveLbl fshPoint tip-static ${className}`,
    dataset: { tipped: tip },
    htmlFor,
  });
}

function makeToggleBtn(o) {
  const btnDiv = createDiv({ className: 'fshToggle' });
  const btnCheck = createInput({
    checked: o.prefVal,
    id: o.checkId,
    type: 'checkbox',
  });
  insertElement(btnDiv, btnCheck);
  const onLbl = createLbl(o.onClass, o.onTip, o.checkId);
  insertElement(btnDiv, onLbl);
  const offLbl = createLbl(o.offClass, o.offTip, o.checkId);
  insertElement(btnDiv, offLbl);
  insertElement(o.worldName, btnDiv);
  return btnCheck;
}

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
  openQuickBuffByName(playerName$1());
}

function openRealmMap() {
  window.open(`${worldUrl + defSubcmd}map`, 'fsMap');
}

function openUfsgMap() {
  const gameRealm = GameData.realm();
  window.open(
    `${guideUrl}realms${defSubcmd}view&realm_id=${gameRealm.id}`,
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
  [(target) => target === soundCheck, toggleSound],
  [(target) => target === huntCheck, toggleHuntMode],
];

const clickHdl = [
  [(target) => target === formGroup, doFormGroup],
  [(target) => target === quickBuff, openQuickBuff],
  [(target) => target === realmMap, openRealmMap],
  [(target) => target === ufsgMap, openUfsgMap],
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

function initButtons() {
  injectButtons();
  $.subscribe(defRealmUpdate, realmUpdate);
  $.subscribe(defPlayerLevel, levelStats);
}

function badData(data) {
  return !data || !data.response || !data.response.data;
}

const atkStats = '<table class="relicT relicS"><thead>'
  + '<tr><th colspan="2">Adjusted defense values</th></tr></thead><tbody>'
  + '<tr><td>DC225:</td><td id="DC225">0</td></tr>'
  + '<tr><td>DC175:</td><td id="DC175">0</td></tr>'
  + '<tr><td colspan="2">&nbsp;</td></tr></tbody><thead>'
  + '<tr><th colspan="2">Attacking Group Stats</th></tr></thead><tbody>'
  + '<tr><td>Raw Group Attack:</td>'
    + '<td class="fshGrey" id="GroupAttack"></td></tr>'
  + '<tr><td>Group Attack w/ buffs:</td><td id="GroupAttackBuffed"></td></tr>'
  + '<tr><td>Raw Group Defense:</td>'
    + '<td class="fshGrey" id="GroupDefense"></td></tr>'
  + '<tr><td>Group Defense w/ buffs:</td>'
    + '<td id="GroupDefenseBuffed"></td></tr>'
  + '<tr><td>Raw Group Armor:</td>'
    + '<td class="fshGrey" id="GroupArmor"></td></tr>'
  + '<tr><td>Group Armor w/ buffs:</td><td id="GroupArmorBuffed"></td></tr>'
  + '<tr><td>Raw Group Damage:</td>'
    + '<td class="fshGrey" id="GroupDamage"></td></tr>'
  + '<tr><td>Group Damage w/ buffs:</td><td id="GroupDamageBuffed"></td></tr>'
  + '<tr><td>Raw Group HP:</td><td class="fshGrey" id="GroupHP"></td></tr>'
  + '<tr><td>Group HP w/ buffs:</td><td id="GroupHPBuffed"></td></tr>'
  + '</tbody></table>';
const defStats = '<table class="relicT relicS"><thead>'
  + '<tr><th colspan="2">Defending Guild Stats</th></tr></thead><tbody>'
  + '<tr><td>Relic Count:</td><td id="relicCount">0</td></tr>'
  + '<tr><td>Lead Defender Bonus:</td><td id="LDPercentage">0</td></tr>'
  + '<tr><td>Lead Defender Cloaked:</td><td id="LDCloaked">No</td></tr>'
  + '</tbody><thead><tr><th colspan="2">Other Defender Stats</th></tr>'
  + '</thead><tbody>'
  + '<tr><td>Raw Attack:</td><td class="fshGrey" id="attackValue">0</td></tr>'
  + '<tr><td>Attack w/ buffs:</td><td id="attackValueBuffed">0</td></tr>'
  + '<tr><td>Raw Defense:</td>'
    + '<td class="fshGrey" id="defenseValue">0</td></tr>'
  + '<tr><td>Defense w/buffs:</td><td id="defenseValueBuffed">0</td></tr>'
  + '<tr><td>Raw Armor:</td><td class="fshGrey" id="armorValue">0</td></tr>'
  + '<tr><td>Armor w/ buffs:</td><td id="armorValueBuffed">0</td></tr>'
  + '<tr><td>Raw Damage:</td><td class="fshGrey" id="damageValue">0</td></tr>'
  + '<tr><td>Damage w/ buffs:</td><td id="damageValueBuffed">0</td></tr>'
  + '<tr><td>Raw HP:</td><td class="fshGrey" id="hpValue">0</td></tr>'
  + '<tr><td>HP w/ buffs:</td><td id="hpValueBuffed">0</td></tr>'
  + '<tr><td>Cloaked:</td><td id="defendersCloaked">0</td></tr>'
  + '<tr><td>Processed:</td><td id="defendersProcessed">0</td></tr>'
  + '</tbody></table>';
const proc = '<table class="relicT">'
  + '<thead><tr><th colspan="2">Processing</th></tr></thead><tbody>'
  + '<tr><td class="fshGreen" colspan="2" id="ProcessingStatus">'
    + 'Parsing defending guild stats ...</td></tr>'
  + '</tbody><thead><tr><th colspan="2">Assumptions</th></tr></thead><tbody>'
  + '<tr><td colspan="2" class="fshGrey">Above calculations include '
    + 'Constitution, Fortitude, Nightmare Visage, Chi Strike, Sanctuary, '
    + 'Terrorize and Flinch bonus calculations (in that order) on both the '
    + 'defending group and attacking group.</td></tr>'
  + '</tbody></table>';

let containerDiv$1;
let leftDiv;
let fetchStatsBtn;
let myDefenders;

function playerName(x) { return x.player_name; }

function defendersSetup(relicData) {
  myDefenders = relicData.defenders.map(playerName);
}

function containerSetup() {
  if (containerDiv$1) {
    setInnerHtml('', containerDiv$1);
  } else {
    containerDiv$1 = createDiv({ className: 'body' });
  }
}

function makeLeftDiv(relicData) {
  leftDiv = createDiv({ className: 'fshFloatLeft fshRelicLeftDiv' });
  insertElement(containerDiv$1, leftDiv);
  if (relicData.is_owner) {
    insertElement(leftDiv, doBuffLinks(myDefenders));
  }
  fetchStatsBtn = createButton({
    className: 'custombutton',
    textContent: 'Fetch Stats',
  });
  insertElement(leftDiv, fetchStatsBtn);
}

function primaryElementsSetup(relicData) {
  defendersSetup(relicData);
  containerSetup();
  makeLeftDiv(relicData);
  const dialogRelic = getElementById('dialog-relic');
  insertElement(dialogRelic, containerDiv$1);
}

let guildMemberList;
let twoMinutesAgo;
let sevenDaysAgo;
let relicCountElement;
let lDPercentageElement;
let lDCloakedElement;
let attackElement;
let attackBuffedElement;
let defenseElement;
let defenseBuffedElement;
let armorElement;
let armorBuffedElement;
let damageElement;
let damageBuffedElement;
let hpElement;
let hpBuffedElement;
let defCloakedElement;
let defProcessedElement;
let dc225Element;
let dc175Element;
let groupAttackElement;
let groupAttackBuffedElement;
let groupDefenseElement;
let groupDefenseBuffedElement;
let groupArmorElement;
let groupArmorBuffedElement;
let groupDamageElement;
let groupDamageBuffedElement;
let groupHPElement;
let groupHPBuffedElement;
let processingStatus;

const available = [
  (key) => key !== 'lastUpdate',
  (key) => !myDefenders.includes(key),
  (key) => guildMemberList[key].last_login,
  (key) => Number(guildMemberList[key].last_login) < twoMinutesAgo,
  (key) => Number(guildMemberList[key].last_login) > sevenDaysAgo,
  (key) => guildMemberList[key].level < 400 || guildMemberList[key].level > 421,
  (key) => guildMemberList[key].level < 441 || guildMemberList[key].level > 450,
];

function condition(key, fn) { return fn(key); }

function availableMembers(key) {
  return available.every(partial(condition, key));
}

function makeLinks(key) {
  return `<a href="${playerIdUrl}${guildMemberList[key].id}">${key
  }</a>`;
}

function missingMembers(membrList) {
  guildMemberList = membrList;
  twoMinutesAgo = nowSecs - 120;
  sevenDaysAgo = nowSecs - 604800;
  const filtered = keys(guildMemberList)
    .filter(availableMembers).map(makeLinks);
  insertHtmlBeforeEnd(containerDiv$1,
    '<div class="fshFloatLeft fshRelicLowDiv">'
    + `<table class="relicT"><thead><tr><th>${
      filtered.length.toString()}`
    + ' Offline guild members not at relic:</th></tr></thead>'
    + `<tbody><tr><td>${filtered.join(' ')}</td></tr></tbody>`
    + '</table></div>');
}

function setDefVars() {
  relicCountElement = getElementById('relicCount');
  lDPercentageElement = getElementById('LDPercentage');
  lDCloakedElement = getElementById('LDCloaked');
  attackElement = getElementById('attackValue');
  attackBuffedElement = getElementById('attackValueBuffed');
  defenseElement = getElementById('defenseValue');
  defenseBuffedElement = getElementById('defenseValueBuffed');
  armorElement = getElementById('armorValue');
  armorBuffedElement = getElementById('armorValueBuffed');
  damageElement = getElementById('damageValue');
  damageBuffedElement = getElementById('damageValueBuffed');
  hpElement = getElementById('hpValue');
  hpBuffedElement = getElementById('hpValueBuffed');
  defCloakedElement = getElementById('defendersCloaked');
  defProcessedElement = getElementById('defendersProcessed');
}

function setAtkVars() {
  dc225Element = getElementById('DC225');
  dc175Element = getElementById('DC175');
  groupAttackElement = getElementById('GroupAttack');
  groupAttackBuffedElement = getElementById('GroupAttackBuffed');
  groupDefenseElement = getElementById('GroupDefense');
  groupDefenseBuffedElement = getElementById('GroupDefenseBuffed');
  groupArmorElement = getElementById('GroupArmor');
  groupArmorBuffedElement = getElementById('GroupArmorBuffed');
  groupDamageElement = getElementById('GroupDamage');
  groupDamageBuffedElement = getElementById('GroupDamageBuffed');
  groupHPElement = getElementById('GroupHP');
  groupHPBuffedElement = getElementById('GroupHPBuffed');
}

function prepareSecondaryDivs(relicData) {
  hideElement(fetchStatsBtn);
  const hideRelicOffline = getValue('hideRelicOffline');
  if (relicData.is_owner && !hideRelicOffline) {
    getMembrList(true).then(missingMembers);
  }
  insertHtmlBeforeEnd(leftDiv, proc);
  processingStatus = getElementById('ProcessingStatus');
  const midDiv = createDiv({
    className: 'fshFloatLeft fshRelicMidDiv',
    innerHTML: defStats,
  });
  insertElement(containerDiv$1, midDiv);
  setDefVars();
  const rightDiv = createDiv({
    className: 'fshFloatLeft fshRelicRightDiv',
    innerHTML: atkStats,
  });
  insertElement(containerDiv$1, rightDiv);
  setAtkVars();
}

let relicMultiplier;

function calcRelicMultiplier(rels) {
  if (rels === 1) { return 1.5; }
  return round(1 - rels / 10, 2);
}

function parseGuild(html) {
  const doc = createDocument(html);
  const nodeList = querySelectorAll('#pCC img[src*="/relics/"]', doc);
  const relicCount = nodeList.length;
  setText(relicCount, relicCountElement);
  relicMultiplier = calcRelicMultiplier(relicCount);
  setText(`${String(relicMultiplier * 100)}%`, lDPercentageElement);
}

function cloakGuess(bonus, level) {
  if (bonus > level * 10 || bonus < level) {
    return bonus;
  }
  return level * 10;
}

function updateForCloak(obj) {
  /* eslint-disable no-param-reassign */
  obj.attackValue = cloakGuess(obj.attackBonus, obj.levelValue);
  obj.defenseValue = cloakGuess(obj.defenseBonus, obj.levelValue);
  obj.armorValue = cloakGuess(obj.armorBonus, obj.levelValue);
  obj.damageValue = cloakGuess(obj.damageBonus, obj.levelValue);
  obj.hpValue = obj.hpBonus;
  /* eslint-enable no-param-reassign */
}

const statList = [
  ['levelValue', 'level'],
  ['attackValue', 'attack'],
  ['attackBonus', 'bonus_attack'],
  ['defenseValue', 'defense'],
  ['defenseBonus', 'bonus_defense'],
  ['armorValue', 'armor'],
  ['armorBonus', 'bonus_armor'],
  ['damageValue', 'damage'],
  ['damageBonus', 'bonus_damage'],
  ['hpValue', 'hp'],
  ['hpBonus', 'bonus_hp'],
  ['killStreakValue', 'killstreak'],
];

// eslint-disable-next-line no-param-reassign
function assignStats(obj, json, arr) { obj[arr[0]] = Number(json[arr[1]]); }

function importStats(obj, json) {
  statList.forEach(partial(assignStats, obj, json));
}

const buffList = [
  ['counterAttackLevel', 'Counter Attack'],
  ['doublerLevel', 'Doubler'],
  ['deathDealerLevel', 'Death Dealer'],
  ['darkCurseLevel', 'Dark Curse'],
  ['holyFlameLevel', 'Holy Flame'],
  ['constitutionLevel', 'Constitution'],
  ['sanctuaryLevel', 'Sanctuary'],
  ['flinchLevel', 'Flinch'],
  ['nightmareVisageLevel', 'Nightmare Visage'],
  ['superEliteSlayerLevel', 'Super Elite Slayer'],
  ['fortitudeLevel', 'Fortitude'],
  ['chiStrikeLevel', 'Chi Strike'],
  ['terrorizeLevel', 'Terrorize'],
  ['barricadeLevel', 'Barricade'],
  ['reignOfTerrorLevel', 'Reign Of Terror'],
  ['anchoredLevel', 'Anchored'],
  ['severeConditionLevel', 'Severe Condition'],
  ['entrenchLevel', 'Entrench'],
  ['cloakLevel', 'Cloak'],
];

// eslint-disable-next-line no-param-reassign
function assignBuffs(obj, buffs, arr) { obj[arr[0]] = buffs[arr[1]] || 0; }

function importBuffs(obj, buffs) {
  buffList.forEach(partial(assignBuffs, obj, buffs));
}

function playerDataObject(json) {
  const buffs = reduceBuffArray(json._skills);
  const obj = {};
  importStats(obj, json);
  importBuffs(obj, buffs);
  obj.superEliteSlayerMultiplier = round(0.002
    * obj.superEliteSlayerLevel, 2);
  if (numberIsNaN(obj.armorValue)) { updateForCloak(obj); }
  return obj;
}

let defRawAttack;
let defBuffedAttack;
let defRawDefense;
let defRawArmor;
let defRawDamage;
let defBuffedDamage;
let defRawHp;
let defCloaked;
let defProcessed;
let leadDefender;
let groupStats;
let mercStats;

function deductMercStats() {
  groupStats.attack -= mercStats.attack;
  groupStats.defense -= mercStats.defense;
  groupStats.armor -= mercStats.armor;
  groupStats.damage -= mercStats.damage;
  groupStats.hp -= mercStats.hp;
}

function withRelicMultiplier(val) {
  return Math.round(val * relicMultiplier);
}

function updateDefenderValues() {
  defRawAttack += withRelicMultiplier(leadDefender.attackValue);
  defRawDefense += withRelicMultiplier(leadDefender.defenseValue);
  defRawArmor += withRelicMultiplier(leadDefender.armorValue);
  defRawDamage += withRelicMultiplier(leadDefender.damageValue);
  defRawHp += withRelicMultiplier(leadDefender.hpValue);
}

function updateDefenderElements() {
  setTextCommas(defRawAttack, attackElement);
  setTextCommas(defRawDefense, defenseElement);
  setTextCommas(defRawArmor, armorElement);
  setTextCommas(defRawDamage, damageElement);
  setTextCommas(defRawHp, hpElement);
  setText(defCloaked, defCloakedElement);
  defProcessed += 1;
  setText(defProcessed, defProcessedElement);
}

function updateGroupValues() {
  setTextCommas(groupStats.attack, groupAttackElement);
  setTextCommas(groupStats.defense, groupDefenseElement);
  setTextCommas(groupStats.armor, groupArmorElement);
  setTextCommas(groupStats.damage, groupDamageElement);
  setTextCommas(groupStats.hp, groupHPElement);
}

function calcNmvEffect(buffs) {
  return Math.ceil(groupStats.attack
    * (fallback(buffs['Nightmare Visage'], 0) * 0.0025));
}

function doGroupAttackBuffedElement() {
  const storedFlinchEffectValue = Math.ceil(groupStats.attack
    * leadDefender.flinchLevel * 0.001);
  setTextCommas(groupStats.attack - storedFlinchEffectValue,
    groupAttackBuffedElement);
}

function calcDefWithConst(buffs) {
  return Math.ceil(groupStats.defense
    * (1 + fallback(buffs.Constitution, 0) * 0.001));
}

function doGroupDefenseBuffedElement(nmv, defConst) {
  setTextCommas(defConst + nmv, groupDefenseBuffedElement);
}

function doGroupArmorBuffedElement(buffs) {
  setTextCommas(groupStats.armor + Math.floor(groupStats.armor
    * fallback(buffs.Sanctuary, 0) * 0.001), groupArmorBuffedElement);
}

function calcFortitudeBonusHP(buffs, defenseWithConstitution) {
  return Math.ceil(defenseWithConstitution
    * fallback(buffs.Fortitude, 0) * 0.001);
}

function doGroupHPBuffedElement(fortitudeBonusHP) {
  setTextCommas(groupStats.hp + fortitudeBonusHP, groupHPBuffedElement);
}

function doGroupDamageBuffedElement(buffs, fortitudeBonusHP) {
  const chiStrikeBonusDamage = Math.ceil((groupStats.hp + fortitudeBonusHP)
    * fallback(buffs['Chi Strike'], 0) * 0.001);
  const storedTerrorizeEffectValue = Math.ceil(
    groupStats.damage * leadDefender.terrorizeLevel * 0.001,
  );
  setTextCommas(groupStats.damage + chiStrikeBonusDamage
    - storedTerrorizeEffectValue, groupDamageBuffedElement);
}

function doGroupAttributeElements(buffs) {
  const nightmareVisageEffect = calcNmvEffect(buffs);
  groupStats.attack -= nightmareVisageEffect; // <-- important
  doGroupAttackBuffedElement();
  const defenseWithConstitution = calcDefWithConst(buffs);
  doGroupDefenseBuffedElement(nightmareVisageEffect, defenseWithConstitution);
  doGroupArmorBuffedElement(buffs);
  const fortitudeBonusHP = calcFortitudeBonusHP(buffs, defenseWithConstitution);
  doGroupHPBuffedElement(fortitudeBonusHP);
  doGroupDamageBuffedElement(buffs, fortitudeBonusHP);
}

function flinchEffectOnDefenders(buffs) {
  const flinchEffectValue = Math.ceil(defBuffedAttack
    * fallback(buffs.Flinch, 0) * 0.001);
  setTextCommas(defBuffedAttack - flinchEffectValue, attackBuffedElement);
}

function terrorizeEffectOnDefenders(buffs) {
  const terrorizeEffectValue = Math.ceil(defBuffedDamage
    * fallback(buffs.Terrorize, 0) * 0.001);
  setTextCommas(defBuffedDamage - terrorizeEffectValue, damageBuffedElement);
}

function calculateGroup() {
  setText('Processing attacking group stats ... ', processingStatus);
  if (mercStats) { deductMercStats(); }
  updateGroupValues();
  const buffs = reduceBuffArray(GameData.player().buffs);
  doGroupAttributeElements(buffs);
  flinchEffectOnDefenders(buffs); // Effect on defending group from Flinch on attacking group.
  terrorizeEffectOnDefenders(buffs);
  setText('Done.', processingStatus);
}

function calcDefenderNmvEffect() {
  return Math.ceil(defRawAttack * (leadDefender.nightmareVisageLevel * 0.0025));
}

function calcDefenderDefenseWithConst() {
  return Math.ceil(defRawDefense
    * (1 + leadDefender.constitutionLevel * 0.001));
}

function updateDefenderBuffedAttack(nmvEffect) {
  defBuffedAttack = defRawAttack - nmvEffect;
  setTextCommas(defBuffedAttack, attackBuffedElement);
}

function updateDefenderBuffedDefense(nmv, defWithConst) {
  const defBuffedDefense = defWithConst + nmv;
  setTextCommas(defBuffedDefense, defenseBuffedElement);
  setTextCommas(Math.ceil(defBuffedDefense * 0.55), dc225Element);
  setTextCommas(Math.ceil(defBuffedDefense * 0.65), dc175Element);
}

function updateDefenderBuffedArmor() {
  setTextCommas(defRawArmor + Math.floor(
    defRawArmor * leadDefender.sanctuaryLevel * 0.001,
  ), armorBuffedElement);
}

function calcDefenderFortitudeBonusHp(defWithConst) {
  return Math.ceil(defWithConst * leadDefender.fortitudeLevel * 0.001);
}

function updateDefenderBuffedDamage(defBuffedHp) {
  defBuffedDamage = defRawDamage
    + Math.ceil(defBuffedHp * leadDefender.chiStrikeLevel * 0.001);
  setTextCommas(defBuffedDamage);
}

function isLeadDefenderCloaked() {
  if (leadDefender.cloakLevel !== 0) {
    setText('Yes', lDCloakedElement);
  }
}

function doCalculations() {
  setText('Processing defending guild stats ... ', processingStatus);
  updateDefenderValues();
  updateDefenderElements();
  const nmvEffect = calcDefenderNmvEffect();
  updateDefenderBuffedAttack(nmvEffect);
  const defWithConst = calcDefenderDefenseWithConst();
  updateDefenderBuffedDefense(nmvEffect, defWithConst);
  updateDefenderBuffedArmor();
  const defBuffedHp = defRawHp + calcDefenderFortitudeBonusHp(defWithConst);
  setTextCommas(defBuffedHp, hpBuffedElement);
  updateDefenderBuffedDamage(defBuffedHp);
  isLeadDefenderCloaked();
  if (GameData.player().hasGroup && groupStats) {
    calculateGroup();
  } else {
    setText('Done.', processingStatus);
  }
}

function parseDefender(json) {
  const defender = playerDataObject(json);
  defRawAttack += Math.round(defender.attackValue * defenderMultiplier);
  defRawDefense += Math.round(defender.defenseValue
    * defenderMultiplier);
  defRawArmor += Math.round(defender.armorValue * defenderMultiplier);
  defRawDamage += Math.round(defender.damageValue * defenderMultiplier);
  defRawHp += Math.round(defender.hpValue * defenderMultiplier);
  if (defender.cloakLevel !== 0) { defCloaked += 1; }
  updateDefenderElements();
}

function storeLeadDefender(json) {
  leadDefender = playerDataObject(json);
}

function storeGroupStats(obj) {
  groupStats = obj;
}

function storeMercStats(obj) {
  mercStats = obj;
}

function resetCounters() {
  defRawAttack = 0;
  defRawDefense = 0;
  defRawArmor = 0;
  defRawDamage = 0;
  defRawHp = 0;
  defCloaked = 0;
  defProcessed = 0;
}

let relicData;

function ajaxFailure(err) {
  setText(err.message, processingStatus);
}

function hasMerc(disband) {
  return disband.parentNode.parentNode.previousElementSibling
    .previousElementSibling.innerHTML.indexOf('"#000099"') !== -1;
}

function buildGroupPrm(disband) {
  const viewStats = disband.previousElementSibling.href;
  const prm = [getGroupStats$1(viewStats).then(storeGroupStats)];
  if (hasMerc(disband)) {
    prm.push(getMercStats().then(storeMercStats));
  }
  return prm;
}

function parseGroups(html) {
  const doc = createDocument(html);
  const disband = querySelector('#pCC a[href*="confirmDisband"]', doc);
  if (!disband) { return; }
  const prm = buildGroupPrm(disband);
  return all(prm);
}

function getGroups() {
  return indexAjaxData({
    cmd: 'guild',
    subcmd: 'groups',
  }).then(parseGroups);
}

function getGuild() {
  return indexAjaxData({
    cmd: 'guild',
    subcmd: 'view',
    guild_id: relicData.controlled_by.guild_id,
  }).then(parseGuild);
}

function getDefenderProfile(el, i) {
  if (i === 0) { return getProfile(el).then(storeLeadDefender); }
  return getProfile(el).then(parseDefender).catch(ajaxFailure);
}

function getDefenders() {
  return myDefenders.map(getDefenderProfile);
}

function buildStatPrm() {
  let prm = [getGuild()];
  if (GameData.player().hasGroup) {
    prm.push(getGroups());
  }
  prm = prm.concat(getDefenders());
  return prm;
}

function getStats() {
  prepareSecondaryDivs(relicData);
  resetCounters();
  const prm = buildStatPrm();
  allthen(prm, doCalculations);
}

function viewRelic(e, data) {
  if (badData(data)) { return; }
  relicData = data.response.data;
  if (relicData.defenders.length > 0) {
    primaryElementsSetup(relicData);
    once(fetchStatsBtn, 'click', getStats);
  }
}

function injectRelic() {
  $.subscribe(defRelicView, viewRelic);
}

let goldAmount;

function statbarGoldBackground(colour) {
  $('#statbar-gold').css('background-color', colour);
}

function updateSendGoldOnWorld() { // jQuery
  $('#HelperSendTotal').html(addCommas(getValue('currentGoldSentTotal')));
  if (Number(GameData.player().gold) > goldAmount) {
    statbarGoldBackground('red');
  } else {
    statbarGoldBackground('inherit');
  }
}

function extraHtml() {
  return '<dt class="stat-gold-sendTo">Send To:</dt>'
    + `<dd id="HelperSendTo">${getValue('goldRecipient')}</dd>`
    + '<dt class="stat-gold-sendAmt">Amount:</dt>'
    + `<dd id="HelperSendAmt">${addCommas(goldAmount)}</dd>`
    + '<dt class="stat-gold-sendTo">Send?</dt>'
    + '<dd><input id="HelperSendGold" value="Send!" class="custombutton" '
    + 'type="submit"><input type="hidden" id="xc" value=""</dd>'
    + '<dt class="stat-gold-sendTotal">Total Sent:</dt>'
    + `<dd id="HelperSendTotal">${
      addCommas(getValue('currentGoldSentTotal'))}</dd>`;
}

function prepareSendGoldOnWorld() {
  goldAmount = getValue('goldAmount');
  $('#statbar-gold-tooltip-general').append(extraHtml());
  $('#HelperSendGold').on('click', doSendGold);
  updateSendGoldOnWorld();
  $.subscribe(defPlayerGold, updateSendGoldOnWorld);
}

function injectSendGoldOnWorld() { // jQuery
  initSendGoldOnWorld();
  if (sendGoldonWorld) { prepareSendGoldOnWorld(); }
}

function fetchdata(data) {
  return retryAjax({
    cache: false,
    url: 'fetchdata.php',
    data: extend(data, { fshrnd: rnd() }),
    dataType: 'json',
  });
}

const creatureCache = [];

function cacheResult(json) {
  if (!badData(json)) {
    creatureCache.push(json);
  }
  return json;
}

function thisMob(id, el) {
  return id === Number(el.response.data.id);
}

function nextTick(resolve, cached) { resolve(cached); }

function fromCache(cached) {
  return new Promise(((resolve) => {
    add(3, nextTick, [resolve, cached]);
  }));
}

function getCreatureStats(id, passback) {
  const cached = creatureCache.find(partial(thisMob, id));
  if (cached) {
    return fromCache(cached);
  }
  return fetchdata({
    a: 1,
    id,
    passback,
  }).then(cacheResult);
}

let statLevel;
let statDefense;
let statAttack;
let statDamage;
let statArmor;
let statHp;

function getStatText(statTooltip, statClassName) {
  return valueText(getElementsByClassName(statClassName, statTooltip));
}

function getTooltipStats(statTooltip) {
  statAttack = getStatText(statTooltip, defStatAttack);
  statDefense = getStatText(statTooltip, defStatDefense);
  statArmor = getStatText(statTooltip, defStatArmor);
  statDamage = getStatText(statTooltip, defStatDamage);
  statHp = getStatText(statTooltip, defStatHp);
}

function getMyStats() {
  statLevel = GameData.player().level;
  getTooltipStats(getElementById('statbar-character-tooltip-stats'));
}

function tipHeader(creature) {
  return '<table><tr><td>'
    + `<img src="${cdn}creatures/${creature.image_id}.png" `
    + 'height="200" width="200"></td><td rowspan="2">'
    + '<table width="400"><tr>'
    + '<td class="header" colspan="4" class="fshCenter">Statistics</td></tr>';
}

function tipClassLevel(creature, myLvlClas) {
  return `<tr><td>Class:&nbsp;</td><td width="40%">${
    creature.creature_class}</td><td>Level:&nbsp;</td><td width="40%">${
    creature.level} (your level:<span class="${myLvlClas}">${
    statLevel}</span>)</td></tr>`;
}

function tipAttackDefense(creature) {
  return `<tr><td>Attack:&nbsp;</td><td width="40%">${
    creature.attack} (your defense:<span class="fshYellow">${
    statDefense}</span>)</td><td>Defense:&nbsp;</td><td width="40%">${
    creature.defense} (your attack:<span class="fshYellow">${
    statAttack}</span>)</td></tr>`;
}

function tipArmorDamage(creature) {
  return `<tr><td>Armor:&nbsp;</td><td width="40%">${
    creature.armor} (your damage:<span class="fshYellow">${
    statDamage}</span>)</td><td>Damage:&nbsp;</td><td width="40%">${
    creature.damage} (your armor:<span class="fshYellow">${
    statArmor}</span>)</td></tr>`;
}

function tipHp(creature, oneHitNumber) {
  return `<tr><td>HP:&nbsp;</td><td width="40%">${
    creature.hp} (your HP:<span class="fshYellow">${
    statHp}</span>)(1H: <span class="fshRed">${
    oneHitNumber}</span>)</td><td>Gold:&nbsp;</td><td width="40%">${
    creature.gold}</td></tr>`;
}

const tipSpacer = '<tr><td colspan="4" height="5"></td></tr><tr>'
  + '<td class="header" colspan="4" class="fshCenter">Enhancements</td></tr>';

function enhancementRow(e) {
  return `<tr><td colspan="2">${
    e.name}:</td><td colspan="2">${e.value}</td></tr>`;
}

function tipEnhancements(creature) {
  if (creature.enhancements.length === 0) {
    return '<tr><td colspan="4">[no enhancements]</td></tr>';
  }
  return creature.enhancements.map(enhancementRow).join('');
}

function tipFooter(creature) {
  return '<tr><td colspan="4" height="5"></td></tr><tr>'
    + '<td class="header" colspan="4" class="fshCenter">Description</td>'
    + `</tr><tr><td colspan="4">${creature.description}</td></tr>`
    + '<tr><td colspan="4" height="5"></td></tr></table></td></tr>'
    + `<tr><td class="fshCenter"><b>${creature.name}</b></td></tr>`
    + '</table>';
}

function makeMonsterTip(creature, oneHitNumber, myLvlClas) {
  return tipHeader(creature)
    + tipClassLevel(creature, myLvlClas)
    + tipAttackDefense(creature)
    + tipArmorDamage(creature)
    + tipHp(creature, oneHitNumber)
    + tipSpacer
    + tipEnhancements(creature)
    + tipFooter(creature);
}

function doMouseOver(creature) {
  const oneHitNumber = Math.ceil(creature.hp * calf.hpVariable + creature.armor
    * calf.generalVariable);
  let myLvlClas = 'fshYellow';
  getMyStats();
  if (statLevel > creature.level) { myLvlClas = 'fshRed'; }
  return makeMonsterTip(creature, oneHitNumber, myLvlClas);
}

function processMouseOver(data) {
  if (badData(data)) { return; }
  return doMouseOver(data.response.data);
}

const creatureViewTests = ['verb', 'view', 'tip-static'];

function setQTip(monster, qtipText) { // jQuery
  $(monster).qtip({
    overwrite: true,
    show: {
      event: 'mouseover',
      ready: true,
    },
    style: { classes: 'qtip-tipsy qtip-custom' },
    position: {
      my: 'center right',
      at: 'center left',
      effect: false,
      viewport: $(window),
    },
    content: { text: qtipText },
    hide: { effect: false },
  });
}

function getIndex(element) {
  return arrayFrom(element.parentNode.children).indexOf(element);
}

function displayJson(api, data) {
  const content = processMouseOver(data);
  api.set('content.text', content);
}

function getJson(passback, event, api) { // jQuery.min
  getCreatureStats(GameData.actions()[passback].data.id, passback)
    .then(partial(displayJson, api));
  return 'Loading...';
}

function makeMouseOver(target, listItem) {
  sendEvent('NewMap', 'CreatureInfo');
  const passback = getIndex(listItem);
  target.classList.add('fshTip');
  setQTip(target, partial(getJson, passback));
}

function isViewCreature(target, listItem) {
  return hasClasses(creatureViewTests, target) && !hasClass('fshTip', target)
    && hasClass('creature', listItem);
}

function moEvt(evt) {
  if (!calf.showCreatureInfo) { return; }
  const { target } = evt;
  const listItem = target.parentNode.parentNode.parentNode;
  if (isViewCreature(target, listItem)) {
    makeMouseOver(target, listItem);
  }
}

function interceptMouseEvents() {
  on(getElementById('actionList'), 'mouseover', moEvt);
}

function scouttower() {
  return guild({ subcmd: 'scouttower' });
}

// import { $dataAccess } from './_dataAccess';
// import scouttower from './fallbacks/scouttower';

function daScoutTower() {
  // return $dataAccess(appScouttower, scouttower);
  return scouttower();
}

// colSpan = attributes[0]
// anElement = attributes[1]
// isHeader = attributes[2]

function addNextCell(row, attributes) {
  const aCell = row.insertCell(-1);
  [aCell.colSpan] = attributes;
  if (attributes[2]) { aCell.className = 'header'; }
  insertElement(aCell, attributes[1]);
  return aCell;
}

function addRowCells(aRow, someCells) {
  someCells.forEach(partial(addNextCell, aRow));
}

function addNextRow(tbl, cells, isBlue) {
  const aRow = tbl.insertRow(-1);
  if (isBlue) { aRow.className = 'fshBlue'; }
  addRowCells(aRow, cells);
  return aRow;
}

function addRow(tbl, row) {
  addNextRow(tbl, row[0], row[1]);
}

function addRows(tbl, rows) {
  rows.forEach(partial(addRow, tbl));
}

let realmName;

function setRealm(data) {
  realmName = data;
}

var css$2 = ".cR .fshActionBox {\r\n  background: -webkit-linear-gradient(top, rgba(255,255,255,0.4) 0%,rgba(255,255,255,0.2) 100%);\r\n  border-radius: 4px;\r\n  border: solid 0 #ffffff;\r\n  box-shadow: 0 1px 3px #000000;\r\n  margin: 6px 4px 4px;\r\n  padding: 4px;\r\n  overflow: hidden;\r\n}\r\n#actionContainer .fshActionBox:nth-child(4) {\r\n  margin-top: 3px;\r\n}\r\n\r\n.titanInfo table {width: 184px;}\r\n.titanInfo .header {font-size: 11px;}\r\n.titanInfo .cooldown {font-weight: bold;}\r\n";
var modules_e13f810f = {};

let current;
let kills;
let member;
let pctTotal;
let status;
let titanHp;
let total;
let yourGuild;

function partOne() {
  current = textSpan('Current');
  kills = textSpan('Kills');
  member = textSpan('Member');
  pctTotal = textSpan('% of Total');
}

function partTwo() {
  status = textSpan('Status');
  titanHp = textSpan('Titan HP');
  total = textSpan('Total');
  yourGuild = textSpan('Your Guild');
}

function buildAssets() {
  partOne();
  partTwo();
}

let currentHp;
let maxHp;
let guildKills;
let currentPct;
let totalPct;
let statusText;
let cooldownText;

function initVars$1() {
  currentHp = createSpan();
  maxHp = createSpan();
  guildKills = createSpan();
  currentPct = createSpan();
  totalPct = createSpan();
  statusText = createSpan();
  cooldownText = createSpan();
}

function clearTitanDiv() {
  setText('', currentHp);
  setText('', maxHp);
  setText('', guildKills);
  setText('', currentPct);
  setText('', totalPct);
  setInnerHtml('', statusText);
  setInnerHtml('', cooldownText);
}

let titanTbl;

function clearMemberRows() {
  while (titanTbl.rows.length > 7) {
    titanTbl.deleteRow(7);
  }
}

function makeTitanHpWrapper() {
  const titanHpWrapper = createSpan();
  insertElement(titanHpWrapper, currentHp);
  insertTextBeforeEnd(titanHpWrapper, '/');
  insertElement(titanHpWrapper, maxHp);
  return titanHpWrapper;
}

function makePctWrapper(pct) {
  const pctWrapper = createSpan();
  insertElement(pctWrapper, pct);
  insertTextBeforeEnd(pctWrapper, '%');
  return pctWrapper;
}

function buildTitanInfoTable() {
  titanTbl = createTable({ className: 'fshCenter' });
  buildAssets();
  addRows(titanTbl, [
    [[[2, titanHp, true], [4, yourGuild, true]]],
    [[[2, makeTitanHpWrapper()], [4, guildKills]]],
    [[[2, current, true], [4, makePctWrapper(currentPct)]], true],
    [[[2, total, true], [4, makePctWrapper(totalPct)]], true],
    [[[2, status, true], [4, statusText]], true],
    [[[6, cooldownText]]],
    [[[2, member, true], [2, kills, true],
      [2, pctTotal, true]]],
  ]);
}

let titanDiv;
let titanId;

function hideTitanDiv() {
  titanId = null;
  if (titanDiv && !hasClass('fshHide', titanDiv)) {
    toggleForce(titanDiv, true);
    clearTitanDiv();
    clearMemberRows();
  }
}

function hasTitan$1(el) {
  if (el.type === 0) {
    titanId = el.base_creature_id;
    return true;
  }
  return false;
}

function setupTitanDiv() {
  if (titanDiv) {
    toggleForce(titanDiv, false);
  } else {
    const actCont = getElementById('actionContainer');
    titanDiv = createDiv({ className: 'fshActionBox titanInfo' });
    initVars$1();
    buildTitanInfoTable();
    insertElement(titanDiv, titanTbl);
    insertElement(actCont, titanDiv);
  }
}

function formatOffset(secs) {
  const aDate = new Date(now + secs * 1000);
  return `${padZ(aDate.getHours())}:${padZ(aDate.getMinutes())} ${
    padZ(aDate.getDate())}/${months[aDate.getMonth()]}/${
    aDate.getFullYear()}`;
}

function getCooldownHtml(cooldown) {
  if (cooldown <= 0) {
    return '<span class="fshGreen cooldown">No active cooldown</span>';
  }
  return `<span class="fshMaroon cooldown">Cooldown until: ${
    formatOffset(cooldown)
  }</span>`;
}

function currentPctText(ourTitan) {
  return roundToString(
    getKillsPct(ourTitan.max_hp - ourTitan.current_hp, ourTitan.kills), 2,
  );
}

function totalPctText(ourTitan) {
  return roundToString((ourTitan.kills * 100) / ourTitan.max_hp, 2);
}

function statusTextHtml(ourTitan) {
  return getTitanString(ourTitan.kills, ourTitan.max_hp, ourTitan.current_hp);
}

function setAllText(ary) {
  ary.forEach(([txt, ctx]) => { setText(txt, ctx); });
}

function doTopLabels(ourTitan) {
  setAllText([
    [ourTitan.current_hp, currentHp],
    [ourTitan.max_hp, maxHp],
    [ourTitan.kills, guildKills],
    [currentPctText(ourTitan), currentPct],
    [totalPctText(ourTitan), totalPct],
  ]);
  setInnerHtml(statusTextHtml(ourTitan), statusText);
  setInnerHtml(getCooldownHtml(ourTitan.cooldown), cooldownText);
}

function memberRow(ourTitan, member) {
  return [[
    [2, textSpan(member.player.name)],
    [2, textSpan(member.kills.toString())],
    [2, textSpan(`${roundToString((member.kills * 100) / ourTitan.kills, 2)}%`)],
  ]];
}

function doMemberRows(ourTitan) {
  clearMemberRows();
  if (!ourTitan.contributors) { return; }
  const memberRows = ourTitan.contributors.map(partial(memberRow, ourTitan));
  addRows(titanTbl, memberRows);
}

function currentTitan(el) {
  return el.realm && el.creature.base_id === titanId && el.realm === realmName;
}

function processTitans(r) {
  const ourTitan = r.find(currentTitan);
  if (ourTitan) {
    doTopLabels(ourTitan);
    doMemberRows(ourTitan);
  }
}

let timeoutId;

function clearTheTimeout() {
  if (timeoutId) {
    window.clearTimeout(timeoutId);
    timeoutId = null;
  }
}

function goodData(data) {
  return data.s && isArray(data.r);
}

function titanToShow(dynamic) {
  return calf.showTitanInfo && isArray(dynamic) && dynamic.some(hasTitan$1);
}

function processScoutTower(ast, data) {
  if (!goodData(data)) { return; }
  processTitans(data.r);
  if (titanToShow(GameData.realm().dynamic)) {
    timeoutId = window.setTimeout(ast, 30000);
  } else {
    hideTitanDiv();
  }
}

function ajaxScoutTower() {
  daScoutTower().then(partial(processScoutTower, ajaxScoutTower));
}

function testDynamics(dynamic) {
  clearTheTimeout();
  if (titanToShow(dynamic)) {
    setupTitanDiv();
    ajaxScoutTower();
  } else {
    hideTitanDiv();
  }
}

function titanStats(realm) {
  if (realm.dynamic) {
    setRealm(realm.name);
    testDynamics(realm.dynamic);
  }
}

function toggleShowTitanInfo() {
  calf.showTitanInfo = !calf.showTitanInfo;
  setValue('showTitanInfo', calf.showTitanInfo);
  testDynamics(GameData.realm().dynamic);
}

function hazRealm(data) {
  return data.realm && data.realm.name;
}

function injectWorldNewMap(e, data) {
  if (hazRealm(data)) {
    titanStats(data.realm);
  }
}

function onWorld() {
  if (window.initialGameData) { // HCS initial data
    injectWorldNewMap(null, window.initialGameData);
  }
  $.subscribe(
    `${defRefreshActionList} ${defStairway}`,
    injectWorldNewMap, // change of information
  );
}

let shoppingData;
let dialog;
let jDialog;
let fshDiv;
let numInput;
let qbBtn;
let resultDiv;

function quickBuy() {
  return fetchdata({
    a: 14,
    d: 0,
    id: shoppingData.id,
    item_id: shoppingData.itemId,
  });
}

function quickDone(data) {
  const resp = data.response.response;
  const rmsg = data.response.msg;
  let msg;
  if (resp !== 0) {
    const firstTag = rmsg.indexOf('<');
    if (firstTag !== -1) {
      msg = rmsg.substring(0, firstTag);
    } else {
      msg = rmsg;
    }
  } else {
    msg = `You purchased ${data.response.data.name
    } for ${addCommas(data.response.data.cost)} gold.`;
  }
  insertHtmlBeforeEnd(resultDiv, `${msg}<br>`);
}

function normalBuy() {
  GameData.doAction(14, 3, {
    id: shoppingData.id,
    item_id: shoppingData.itemId,
  }, 0);
  jDialog.close();
}

function qBuy() {
  const theValue = testQuant(numInput.value);
  if (!theValue) { return; }
  const prm = [];
  for (let i = 1; i < theValue; i += 1) {
    prm.push(quickBuy().then(quickDone));
  }
  allthen(prm, normalBuy);
}

function injectQuickBuy() {
  fshDiv = createDiv({
    className: 'fshClear',
    textContent: 'Select how many to quick-buy:',
  });
  numInput = createInput({
    id: 'buyAmount',
    className: 'fshNumberInput',
    min: 1,
    max: 99,
    value: 1,
    type: 'number',
  });
  insertElement(fshDiv, numInput);
  qbBtn = createButton({ textContent: 'Quick-buy' });
  onclick(qbBtn, qBuy);
  insertElement(fshDiv, qbBtn);
  resultDiv = createDiv();
  insertElement(fshDiv, resultDiv);
  insertElement(dialog, fshDiv);
}

function getDialog() {
  return dialog || getElementById('shopDialogConfirm');
}

function getJDialog() { // jQuery
  return jDialog || $(dialog).data('hcsWorldDialogShopConfirm');
}

function initQuickBuy() {
  if (!fshDiv) {
    injectQuickBuy();
  } else {
    setText('', resultDiv);
  }
}

function worldDialogShop(e, data) {
  shoppingData = data;
  dialog = getDialog();
  if (!dialog) { return; }
  jDialog = getJDialog();
  if (jDialog) { initQuickBuy(); }
}

function prepareShop() {
  $.subscribe(defShopPrompt, worldDialogShop);
}

/* eslint-disable no-param-reassign */

let monsterLog;

function storeDescription(creature, logCreature) {
  logCreature.creature_class = creature.creature_class;
  logCreature.image_id = creature.image_id;
  logCreature.level = Number(creature.level);
  logCreature.type = creature.type;
}

function setupMob(creature) {
  if (!monsterLog[creature.name]) {
    monsterLog[creature.name] = { seen: 1 };
    storeDescription(creature, monsterLog[creature.name]);
  } else if (monsterLog[creature.name].seen) {
    monsterLog[creature.name].seen += 1;
  }
}

function getStat(fn, stat, creatureStat) {
  if (stat) {
    return fn(stat, creatureStat);
  }
  return creatureStat;
}

function updateMinMax(_logStat, creatureStat) {
  const logStat = _logStat || {};
  logStat.min = getStat(Math.min, logStat.min, creatureStat);
  logStat.max = getStat(Math.max, logStat.max, creatureStat);
  return logStat;
}

const stats = ['attack', 'armor', 'damage', 'defense', 'hp'];

function statChanged(logStat, newStat) {
  return !logStat || logStat.min !== newStat.min || logStat.max !== newStat.max;
}

function updateStat(creature, logCreature, stat) {
  const newStat = updateMinMax(logCreature[stat], Number(creature[stat]));
  if (statChanged(logCreature[stat], newStat)) {
    logCreature[stat] = newStat;
  }
}

function storeStats(creature, logCreature) {
  stats.forEach(partial(updateStat, creature, logCreature));
}

function creatureHazEnhancements(creature) {
  return creature.enhancements && creature.enhancements.length > 0;
}

function updateEnhancements(logEnh, e) {
  logEnh[e.name] = updateMinMax(logEnh[e.name], Number(e.value));
}

function storeEnhancements$1(creature, logCreature) {
  if (creatureHazEnhancements(creature)) {
    logCreature.enhancements = logCreature.enhancements || {};
    creature.enhancements.forEach(
      partial(updateEnhancements, logCreature.enhancements),
    );
  }
}

function doMonsterLog(creature) {
  if (!monsterLog) { monsterLog = {}; }
  setupMob(creature);
  storeStats(creature, monsterLog[creature.name]);
  storeEnhancements$1(creature, monsterLog[creature.name]);
  set('fsh_monsterLog', monsterLog);
}

function processMonsterLog(creature) {
  if (calf.showMonsterLog) { doMonsterLog(creature); }
}

function initLog(data) {
  monsterLog = data || {};
}

function getMonsterPrefs() {
  get('fsh_monsterLog').then(initLog);
}

const processedMonsters = [];

function processMonster(data) {
  if (badData(data)) { return; }
  sendEvent('NewMap', 'MonsterLog');
  processMonsterLog(data.response.data);
}

function thisMob$1(e, el) { return e.id === el.id; }

function seenBefore(e) {
  if (processedMonsters.find(partial(thisMob$1, e.data))) { return true; }
  processedMonsters.push(e.data);
}

function loopActions(e, i) { // jQuery.min
  if (e.type !== 6 || seenBefore(e)) { return; }
  getCreatureStats(e.data.id, i).then(processMonster);
}

function initMonsterLog() {
  if (calf.showMonsterLog) {
    GameData.actions().forEach(loopActions);
  }
}

function startMonsterLog() { // jQuery.min
  getMonsterPrefs();
  $.subscribe('-1-success.action-response '
    + '4-success.action-response '
    + '5-success.action-response '
    + '25-success.action-response', initMonsterLog);
  initMonsterLog();
}

var css$3 = "#dialog-viewcreature .fshFooter {\r\n  color: grey;\r\n  font-size: x-small;\r\n}\r\n";
var modules_ae2154bf = {};

function guildGroups(data) {
  return guild(extend({ subcmd: 'groups' }, data));
}

function groupsViewStats(groupId) {
  return guildGroups({ subcmd2: 'viewstats', group_id: groupId });
}

// import { $dataAccess } from './_dataAccess';

function daGroupStats(groupId) {
  // return $dataAccess(groupsViewStats, groupStats, groupId);
  return groupsViewStats(groupId);
}

function groupsView() {
  return guildGroups({ subcmd2: 'view' });
}

// import { $dataAccess } from './_dataAccess';
// import viewGroups from './fallbacks/viewGroups';

function daViewGroups() {
  // return $dataAccess(groupsView, viewGroups);
  return groupsView();
}

/* eslint-disable no-param-reassign */

function evalMiss(combat) {
  if (combat.numberOfCreatureHitsTillDead - combat.numberOfHitsRequired <= 1) {
    return ', dies on miss';
  }
  return ', survives a miss';
}

function canIHit(combat) {
  return combat.numberOfHitsRequired === '-'
    || combat.numberOfHitsRequired > combat.numberOfCreatureHitsTillDead;
}

function evalPlayerHits(combat) {
  if (combat.numberOfCreatureHitsTillDead === '-') {
    return combat.numberOfHitsRequired;
  }
  if (canIHit(combat)) {
    return '-';
  }
  return combat.numberOfHitsRequired;
}

function canCreatureHit(combat) {
  return combat.numberOfCreatureHitsTillDead === '-'
    || combat.numberOfCreatureHitsTillDead > combat.numberOfHitsRequired;
}

function evalCreatureHits(combat) {
  if (combat.numberOfHitsRequired === '-') {
    return combat.numberOfCreatureHitsTillDead;
  }
  if (canCreatureHit(combat)) {
    return '-';
  }
  return combat.numberOfCreatureHitsTillDead;
}

const evalFightStatus = [
  [
    (combat) => combat.playerHits === '-' && combat.creatureHits === '-',
    () => 'Unresolved',
  ],
  [(combat) => combat.playerHits === '-', () => 'Player dies'],
  [
    (combat) => combat.playerHits === 1,
    (combat) => `Player 1 hits${evalMiss(combat)}`,
  ],
  [
    (combat) => combat.playerHits > 1,
    (combat) => `Player > 1 hits${evalMiss(combat)}`,
  ],
];

function condition$1(combat, el) { return el[0](combat); }

function getStatus(combat) {
  const status = evalFightStatus.find(partial(condition$1, combat));
  if (status) {
    return status[1](combat);
  }
  return 'Unknown';
}

function evalAnalysis(combat) {
  // Analysis:
  combat.playerHits = evalPlayerHits(combat);
  combat.creatureHits = evalCreatureHits(combat);
  combat.fightStatus = getStatus(combat);
}

/* eslint-disable no-param-reassign */
function calcArm(combat) {
  if (combat.callback.groupExists) {
    return combat.callback.groupArmorValue;
  }
  return combat.player.armorValue;
}

function overallArmour(combat) {
  const armorVal = calcArm(combat);
  combat.overallArmorValue = armorVal
    + Math.floor(combat.player.armorValue
    * combat.player.sanctuaryLevel * 0.001);
}

function evalSanctuary(combat) {
  if (combat.player.sanctuaryLevel > 0) {
    combat.extraNotes += `Sanc Bonus Armor = ${
      Math.floor(combat.player.armorValue
      * combat.player.sanctuaryLevel * 0.001)}<br>`;
  }
}

function calcTerrorizeEffect(combat) {
  combat.terrorizeEffect = Math.floor(combat.creature.damage
    * combat.player.terrorizeLevel * 0.001);
}

function evalTerrorize(combat) {
  if (combat.player.terrorizeLevel > 0) {
    combat.extraNotes += `Terrorize Creature Damage Effect = ${
      combat.terrorizeEffect * -1}<br>`;
  }
}

function calcDamageDone(combat) {
  combat.creatureDamageDone = Math.ceil(combat.generalVariable
    * combat.creature.damage - combat.overallArmorValue
    + combat.overallHPValue);
}

function creatureCanHit(combat) {
  const approxDmg = combat.generalVariable * combat.creature.damage;
  if (approxDmg < combat.overallArmorValue) {
    combat.numberOfCreatureHitsTillDead = combat.overallHPValue;
  } else {
    combat.numberOfCreatureHitsTillDead = Math.ceil(
      combat.overallHPValue / (approxDmg - combat.overallArmorValue),
    );
  }
}

function calcNumberOfHits(combat) {
  if (combat.creatureHitByHowMuch >= 0) {
    creatureCanHit(combat);
  } else {
    combat.numberOfCreatureHitsTillDead = '-';
  }
}

function evalArmour(combat) {
  overallArmour(combat);
  evalSanctuary(combat);
  calcTerrorizeEffect(combat);
  evalTerrorize(combat);
  combat.creature.damage -= combat.terrorizeEffect;
  calcDamageDone(combat);
  calcNumberOfHits(combat);
}

/* eslint-disable no-param-reassign */
function calcAttack(combat) {
  if (combat.callback.groupExists) {
    return combat.callback.groupAttackValue;
  }
  return combat.player.attackValue;
}

function calcHitByHowMuch(combat) {
  const remainingDef = combat.creature.defense - combat.creature.defense
    * combat.player.darkCurseLevel * 0.002;
  if (combat.combatEvaluatorBias === 3) {
    return combat.overallAttackValue - Math.ceil(remainingDef) - 50;
  }
  return combat.overallAttackValue
    - Math.ceil(combat.attackVariable * remainingDef);
}

function evalAttack(combat) {
  const atkValue = calcAttack(combat);
  // Attack:
  if (combat.player.darkCurseLevel > 0) {
    combat.extraNotes += `DC Bonus Attack = ${
      Math.floor(combat.creature.defense
      * combat.player.darkCurseLevel * 0.002)}<br>`;
  }
  combat.nightmareVisageAttackMovedToDefense = Math.floor((atkValue
    + combat.counterAttackBonusAttack)
    * combat.player.nightmareVisageLevel * 0.0025);
  if (combat.player.nightmareVisageLevel > 0) {
    combat.extraNotes += `NMV Attack moved to Defense = ${
      combat.nightmareVisageAttackMovedToDefense}<br>`;
  }
  combat.overallAttackValue = atkValue
    + combat.counterAttackBonusAttack
    - combat.nightmareVisageAttackMovedToDefense;
  combat.hitByHowMuch = calcHitByHowMuch(combat);
}

/* eslint-disable no-param-reassign */
function caIsRunning(combat) {
  return combat.player.counterAttackLevel > 0
    && combat.numberOfHitsRequired === 1;
}

function calcLowest(combat) {
  combat.lowestCALevelToStillHit = Math.max(Math.ceil((
    combat.counterAttackBonusAttack - combat.hitByHowMuch + 1)
    / combat.player.attackValue / 0.0025), 0);
  combat.lowestCALevelToStillKill = Math.max(Math.ceil((
    combat.counterAttackBonusDamage - combat.damageDone + 1)
    / combat.player.damageValue / 0.0025), 0);
}

function stamAtLowestCa(combat) {
  if (combat.player.counterAttackLevel > 0) {
    return Math.ceil((1 + combat.player.doublerLevel / 50) * 0.0025
      * combat.lowestFeasibleCALevel);
  }
  return 0;
}

function lowestCaStats(combat) {
  combat.extraAttackAtLowestFeasibleCALevel = Math.floor(
    combat.player.attackValue * 0.0025 * combat.lowestFeasibleCALevel,
  );
  combat.extraDamageAtLowestFeasibleCALevel = Math.floor(
    combat.player.damageValue * 0.0025 * combat.lowestFeasibleCALevel,
  );
  combat.extraNotes += `Extra CA Att/Dam at this lowered CA level = ${
    combat.extraAttackAtLowestFeasibleCALevel} / ${
    combat.extraDamageAtLowestFeasibleCALevel}<br>`;
}

function caRunning(combat) {
  calcLowest(combat);
  combat.lowestFeasibleCALevel = Math.max(combat.lowestCALevelToStillHit,
    combat.lowestCALevelToStillKill);
  combat.extraNotes += `Lowest CA to still 1-hit this creature = ${
    combat.lowestFeasibleCALevel}<br>`;
  if (combat.lowestFeasibleCALevel !== 0) {
    lowestCaStats(combat);
  }
  combat.extraStaminaPerHitAtLowestFeasibleCALevel = stamAtLowestCa(combat);
  if (combat.extraStaminaPerHitAtLowestFeasibleCALevel
    < combat.extraStaminaPerHit) {
    combat.extraNotes
      += `Extra Stam Used at this lowered CA level = ${
        combat.extraStaminaPerHitAtLowestFeasibleCALevel}<br>`;
  } else {
    combat.extraNotes
      += 'No reduction of stam used at the lower CA level<br>';
  }
}

function needCa(combat) {
  return combat.numberOfHitsRequired === '-'
    || combat.numberOfHitsRequired !== 1;
}

function evalCaKill(combat) {
  if (combat.lowestCALevelToStillHit > 175) {
    combat.extraNotes
      += 'Even with CA175 you cannot hit this creature<br>';
  } else if (combat.lowestCALevelToStillHit !== 0) {
    combat.extraNotes += `You need a minimum of CA${
      combat.lowestCALevelToStillHit
    } to hit this creature<br>`;
  }
}

function evalCaOneHit(combat) {
  if (combat.lowestCALevelToStillKill > 175) {
    combat.extraNotes
      += 'Even with CA175 you cannot 1-hit kill this creature<br>';
  } else if (combat.lowestCALevelToStillKill !== 0) {
    combat.extraNotes += `You need a minimum of CA${
      combat.lowestCALevelToStillKill
    } to 1-hit kill this creature<br>`;
  }
}

function caResult(combat) {
  calcLowest(combat);
  evalCaKill(combat);
  evalCaOneHit(combat);
}

function evalCA(combat) {
  if (caIsRunning(combat)) {
    caRunning(combat);
  }
  if (needCa(combat)) {
    caResult(combat);
  }
}

/* eslint-disable no-param-reassign */
function calcHp(combat) {
  if (combat.callback.groupExists) {
    return combat.callback.groupHPValue;
  }
  return combat.player.hpValue;
}

function calcDmg(combat) {
  if (combat.callback.groupExists) {
    return combat.callback.groupDamageValue;
  }
  return combat.player.damageValue;
}

function evalFortitude(combat) {
  const hpValue = calcHp(combat);
  const { fortitudeLevel } = combat.player;
  combat.fortitudeExtraHPs = Math.floor(hpValue * fortitudeLevel * 0.001);
  if (fortitudeLevel > 0) {
    combat.extraNotes += `Fortitude Bonus HP = ${combat.fortitudeExtraHPs
    }<br>`;
  }
  combat.overallHPValue = hpValue + combat.fortitudeExtraHPs;
}

function evalChiStrike(combat) {
  const { chiStrikeLevel } = combat.player;
  combat.chiStrikeExtraDamage = Math.floor(combat.overallHPValue
    * chiStrikeLevel * 0.001);
  if (chiStrikeLevel > 0) {
    combat.extraNotes += `Chi Strike Bonus Damage = ${
      combat.chiStrikeExtraDamage}<br>`;
  }
}

function evalDamage(combat) {
  // Damage:
  evalFortitude(combat);
  evalChiStrike(combat);

  const damageValue = calcDmg(combat);
  combat.overallDamageValue = damageValue
    + combat.deathDealerBonusDamage + combat.counterAttackBonusDamage
    + combat.holyFlameBonusDamage + combat.chiStrikeExtraDamage;
  combat.damageDone = Math.floor(combat.overallDamageValue - (
    combat.generalVariable * combat.creature.armor
    + combat.hpVariable * combat.creature.hp));

  if (combat.hitByHowMuch > 0) {
    let dmgLessArmor = 1;
    if (combat.overallDamageValue
        >= combat.generalVariable * combat.creature.armor) {
      dmgLessArmor = combat.overallDamageValue - combat.generalVariable
        * combat.creature.armor;
    }
    combat.numberOfHitsRequired = Math.ceil((combat.hpVariable
      * combat.creature.hp) / dmgLessArmor);
  } else {
    combat.numberOfHitsRequired = '-';
  }
}

/* eslint-disable no-param-reassign */
function calcDef(combat) {
  if (combat.callback.groupExists) {
    return combat.callback.groupDefenseValue;
  }
  return combat.player.defenseValue;
}

function evalConstitution(combat) {
  if (combat.player.constitutionLevel > 0) {
    combat.extraNotes += `Constitution Bonus Defense = ${
      Math.floor(calcDef(combat)
    * combat.player.constitutionLevel * 0.001)}<br>`;
  }
}

function evalFlinch(combat) {
  if (combat.player.flinchLevel > 0) {
    combat.extraNotes += `Flinch Bonus Attack Reduction = ${
      Math.floor(combat.creature.attack * combat.player.flinchLevel
    * 0.001)}<br>`;
  }
}

function evalDefence(combat) {
  combat.overallDefenseValue = calcDef(combat)
    + Math.floor(calcDef(combat)
    * combat.player.constitutionLevel * 0.001)
    + combat.nightmareVisageAttackMovedToDefense;
  evalConstitution(combat);
  evalFlinch(combat);
  combat.creatureHitByHowMuch = Math.floor(combat.attackVariable
    * combat.creature.attack - combat.creature.attack
    * combat.player.flinchLevel * 0.001 - combat.overallDefenseValue);
  if (combat.combatEvaluatorBias === 3) {
    combat.creatureHitByHowMuch = Math.floor(combat.creature.attack
      - combat.creature.attack * combat.player.flinchLevel * 0.001
      - combat.overallDefenseValue - 50);
  }
}

/* eslint-disable no-param-reassign */
function evalSes(combat) {
  if (combat.player.superEliteSlayerLevel > 0) {
    combat.extraNotes += `SES Stat Reduction Multiplier = ${
      combat.player.superEliteSlayerMultiplier}<br>`;
  }
}

function evalHolyFlame(combat) {
  combat.holyFlameBonusDamage = 0;
  if (combat.creature.class !== 'Undead') { return; }
  combat.holyFlameBonusDamage = Math.max(Math.floor(
    (combat.player.damageValue - combat.creature.armor)
    * combat.player.holyFlameLevel * 0.002,
  ), 0);
  if (combat.player.holyFlameLevel > 0) {
    combat.extraNotes += `HF Bonus Damage = ${combat.holyFlameBonusDamage
    }<br>`;
  }
}

function calcDdBonus(combat) {
  combat.deathDealerBonusDamage = Math.floor(combat.player.damageValue * (Math.min(Math.floor(
    combat.player.killStreakValue / 5,
  ) * 0.01
      * combat.player.deathDealerLevel, 20) / 100));
}

function calcCaBonus(combat) {
  combat.counterAttackBonusAttack = Math.floor(combat.player.attackValue * 0.0025
    * combat.player.counterAttackLevel);
  combat.counterAttackBonusDamage = Math.floor(combat.player.damageValue * 0.0025
    * combat.player.counterAttackLevel);
}

function evalExtraStam(combat) {
  combat.extraStaminaPerHit = 0;
  if (combat.player.counterAttackLevel > 0) {
    combat.extraStaminaPerHit = Math.ceil(
      (1 + combat.player.doublerLevel / 50)
      * 0.0025 * combat.player.counterAttackLevel,
    );
  }
}

function evalDeathDealer(combat) {
  if (combat.player.deathDealerLevel > 0) {
    combat.extraNotes += `DD Bonus Damage = ${
      combat.deathDealerBonusDamage}<br>`;
  }
}

function evalCounterAttack(combat) {
  if (combat.player.counterAttackLevel > 0) {
    combat.extraNotes += `CA Bonus Attack/Damage = ${
      combat.counterAttackBonusAttack} / ${
      combat.counterAttackBonusDamage}<br>`
      + `CA Extra Stam Used = ${combat.extraStaminaPerHit}<br>`;
  }
}

function evalExtraBuffs(combat) {
  combat.extraNotes = '';
  evalSes(combat);
  // math section ... analysis
  // Holy Flame adds its bonus after the
  // armor of the creature has been taken off.
  evalHolyFlame(combat);
  // Death Dealer and Counter Attack both applied at the same time
  calcDdBonus(combat);
  calcCaBonus(combat);
  evalExtraStam(combat);
  evalDeathDealer(combat);
  evalCounterAttack(combat);
}

function doesGroupExist(combat) {
  if (combat.callback.groupExists) { return 'Group '; }
  return '';
}

function headerRow(combat) {
  return `<tr><td bgcolor="#CD9E4B" colspan="4" align="center">${
    doesGroupExist(combat)}Combat Evaluation</td></tr>`;
}

function canIHitIt(combat) {
  if (combat.hitByHowMuch > 0) { return 'Yes'; }
  return 'No';
}

function willIHitItRow(combat) {
  return '<tr><td align="right"><span style="color:#333333">'
    + `Will I hit it? </td><td align="left">${
      canIHitIt(combat)}</td><td align="right"><span style="color:#333333">`
    + `Extra Attack: </td><td align="left">( ${
      combat.hitByHowMuch} )</td></tr>`;
}

function numberOfHitsRequiredRow(combat) {
  return '<tr><td align="right"><span style="color:#333333">'
    + `# Hits to kill it? </td><td align="left">${
      combat.numberOfHitsRequired}</td><td align="right">`
    + `<span style="color:#333333">Extra Damage: </td><td align="left">( ${
      combat.damageDone} )</td></tr>`;
}

function willIBeHit(combat) {
  if (combat.creatureHitByHowMuch >= 0) { return 'Yes'; }
  return 'No';
}

function willIBeHitRow(combat) {
  return '<tr><td align="right"><span style="color:#333333">'
    + `Will I be hit? </td><td align="left">${
      willIBeHit(combat)}</td><td align="right"><span style="color:#333333">`
    + `Extra Defense: </td><td align="left">( ${
      -1 * combat.creatureHitByHowMuch} )</td></tr>`;
}

function hitsToKillMeRow(combat) {
  return '<tr><td align="right"><span style="color:#333333">'
    + `# Hits to kill me? </td><td align="left">${
      combat.numberOfCreatureHitsTillDead}</td><td align="right">`
    + `<span style="color:#333333">Extra Armor + HP: </td><td align="left">( ${
      -1 * combat.creatureDamageDone} )</td></tr>`;
}

function numberOfHitsRow(combat) {
  return '<tr><td align="right"><span style="color:#333333">'
    + `# Player Hits? </td><td align="left">${
      combat.playerHits}</td><td align="right"><span style="color:#333333">`
    + `# Creature Hits? </td><td align="left">${combat.creatureHits}</td></tr>`;
}

function fightStatusRow(combat) {
  return '<tr><td align="right"><span style="color:#333333">'
    + `Fight Status: </span></td><td align="left" colspan="3"><span>${
      combat.fightStatus}</span></td></tr>`;
}

function notesRow(combat) {
  return '<tr><td align="right"><span style="color:#333333">'
    + 'Notes: </span></td><td align="left" colspan="3">'
    + `<span style="font-size:x-small;">${combat.extraNotes}</span></td></tr>`;
}

function evalHTML(combat) {
  return `<table width="100%"><tbody>${
    headerRow(combat)
  }${willIHitItRow(combat)
  }${numberOfHitsRequiredRow(combat)
  }${willIBeHitRow(combat)
  }${hitsToKillMeRow(combat)
  }${numberOfHitsRow(combat)
  }${fightStatusRow(combat)
  }${notesRow(combat)
  }</tbody></table>`;
}

let creatureBody;
let dnkName;
let doNotKillBtn;

function getCreatureBody(dialogViewCreature) {
  if (!creatureBody) {
    const bodyCollection = getElementsByClassName('body', dialogViewCreature);
    if (bodyCollection.length === 1) {
      [creatureBody] = bodyCollection;
    }
  }
}

function doNotKillText() {
  if (isOnList(dnkName)) {
    return 'Remove from do not kill list';
  }
  return 'Add to the do not kill list';
}

function updateText() {
  setText(doNotKillText(), doNotKillBtn);
}

function addRemoveCreature() {
  const index = calf.doNotKillList.indexOf(dnkName);
  if (index === -1) {
    calf.doNotKillList.push(dnkName);
  } else {
    calf.doNotKillList.splice(index, 1);
  }
  updateText();
  setValue('doNotKillList', calf.doNotKillList.join());
  afterUpdateActionList(); // refresh the action list
}

function makeDnkBtn() {
  doNotKillBtn = createButton({
    className: 'fshBl',
    textContent: doNotKillText(),
    type: 'button',
  });
  const btnContainer = createDiv({
    className: 'description',
    innerHTML: '<span class="ui-helper-hidden-accessible">'
      + '<input type="text"></span>',
  });
  insertElement(btnContainer, doNotKillBtn);
  insertElement(creatureBody, btnContainer);
  onclick(doNotKillBtn, addRemoveCreature);
}

function doNotKillLink() {
  if (!doNotKillBtn) {
    makeDnkBtn();
  } else {
    updateText();
  }
}

function makeDoNotKillLink(thisName, dialogViewCreature) {
  getCreatureBody(dialogViewCreature);
  if (creatureBody) {
    dnkName = thisName.trim();
    doNotKillLink();
  }
}

/* eslint-disable no-param-reassign */

let dialogViewCreature;
let combatEvalContainer;
let combatEvaluator;
let groupEvaluator;

function getDialogViewCreature() {
  if (!dialogViewCreature) {
    dialogViewCreature = getElementById('dialog-viewcreature');
  }
}

function getCombatEvalContainer() {
  if (!combatEvalContainer) {
    combatEvalContainer = createDiv();
    insertElement(dialogViewCreature, combatEvalContainer);
    insertElement(dialogViewCreature, createDiv({
      innerHTML: '<span class="fshFooter">'
        + '*Does include CA, DD, HF, DC, Flinch, Super Elite Slayer, NMV, '
        + 'Sanctuary, Constitution, Fortitude, Chi Strike and '
        + 'Terrorize (if active) and allow for randomness (1.1053). '
        + 'Constitution, NMV, Fortitude and Chi Strike apply to group '
        + 'stats.</span>',
    }));
  }
}

function getCombatEvaluator() {
  if (!combatEvaluator) {
    getCombatEvalContainer();
    combatEvaluator = createDiv();
    insertElement(combatEvalContainer, combatEvaluator);
  }
}

function getGroupEvaluator() {
  if (!groupEvaluator) {
    getCombatEvaluator();
    groupEvaluator = createDiv();
    insertElement(combatEvalContainer, groupEvaluator);
  }
}

function setCombatEvaluator(html) {
  getCombatEvaluator();
  setInnerHtml(html, combatEvaluator);
}

function setGroupEvalalutor(html) {
  getGroupEvaluator();
  setInnerHtml(html, groupEvaluator);
}

function superElite(ses, obj, type) {
  // reduce stats if critter is a SE and player has SES cast on them.
  if (type === 3) {
    obj.attack -= Math.ceil(obj.attack * ses);
    obj.defense -= Math.ceil(obj.defense * ses);
    obj.armor -= Math.ceil(obj.armor * ses);
    obj.damage -= Math.ceil(obj.damage * ses);
    obj.hp -= Math.ceil(obj.hp * ses);
  }
}

function creatureData(creature, ses) {
  const obj = {
    name: creature.name,
    class: creature.creature_class,
    attack: Number(creature.attack),
    defense: Number(creature.defense),
    armor: Number(creature.armor),
    damage: Number(creature.damage),
    hp: Number(creature.hp),
  };
  superElite(ses, obj, creature.type);
  return obj;
}

function biasVars(combat) {
  combat.combatEvaluatorBias = calf.combatEvaluatorBias;
  combat.attackVariable = 1.1053;
  combat.generalVariable = calf.generalVariable;
  combat.hpVariable = calf.hpVariable;
}

function buffProcessing(combat) {
  evalExtraBuffs(combat);
  evalAttack(combat);
  evalDamage(combat);
  evalDefence(combat);
  evalArmour(combat);
  evalAnalysis(combat);
  evalCA(combat);
}

function doCombatEval(data, playerJson, groupData) {
  const combat = {};
  combat.callback = groupData;
  // playerdata
  combat.player = playerDataObject(playerJson);
  biasVars(combat);
  combat.creature = creatureData(data.response.data,
    combat.player.superEliteSlayerMultiplier);
  buffProcessing(combat);
  combat.evaluatorHTML = evalHTML(combat);
  if (groupData.groupExists) {
    setGroupEvalalutor(combat.evaluatorHTML);
  } else {
    setCombatEvaluator(combat.evaluatorHTML);
  }
}

function myGroup(el) {
  return el.members[0].name === playerName$1();
}

function getGroupId(json) {
  if (isArray(json.r)) {
    return json.r.find(myGroup).id;
  }
}

function processGroupStats(data, playerJson, groupJson) {
  if (!groupJson.r || !groupJson.r.attributes) { return; }
  const attr = groupJson.r.attributes;
  doCombatEval(data, playerJson, {
    groupExists: true,
    groupAttackValue: attr[0].value,
    groupDefenseValue: attr[1].value,
    groupArmorValue: attr[2].value,
    groupDamageValue: attr[3].value,
    groupHPValue: attr[4].value,
  });
}

function getGroupStats(data, playerJson, groupId) {
  if (groupId) {
    daGroupStats(groupId).then(partial(processGroupStats, data, playerJson));
  }
}

function processGroup(data, playerJson) {
  daViewGroups().then(getGroupId)
    .then(partial(getGroupStats, data, playerJson));
}

function processPlayer(data, playerJson) {
  if (data.player.hasGroup) { processGroup(data, playerJson); }
  doCombatEval(data, playerJson, { groupExists: false });
}

function isValidData(data) {
  return data.response && data.response.data;
}

function processCreature(e, data) {
  getDialogViewCreature();
  if (!dialogViewCreature) { return; }
  setCombatEvaluator('');
  setGroupEvalalutor('');
  if (isValidData(data)) {
    makeDoNotKillLink(data.response.data.name, dialogViewCreature);
    myStats(true).then(partial(processPlayer, data));
  }
}

function viewCreature() {
  $.subscribe(defViewCreature, processCreature);
}

let huntingBuffs;
let huntingBuffsName;

function setCurrentBuffList() {
  // eslint-disable-next-line no-sparse-arrays
  const lookup = [,
    [calf.buffs, calf.buffsName],
    [calf.buffs2, calf.buffs2Name],
    [calf.buffs3, calf.buffs3Name],
  ][calf.enabledHuntingMode];
  if (isArray(lookup)) {
    [huntingBuffs, huntingBuffsName] = lookup;
  }
}

function toggleEnabledHuntingMode(e) {
  if (e.target.name !== 'enabledHuntingMode') { return; }
  calf.enabledHuntingMode = e.target.value;
  setValue('enabledHuntingMode', calf.enabledHuntingMode);
  setCurrentBuffList();
  GameData.fetch(defFetchPlayerBuffs);
}

let hidePlayerActions;

function toggleHidePlayerActions() {
  hidePlayerActions = !hidePlayerActions;
  setValue('hidePlayerActions', hidePlayerActions);
  GameData.fetch(defFetchWorldRealmActions);
}

function hideActions(el) {
  const verbs = getElementsByClassName('verbs', el);
  if (verbs.length === 1) {
    hideElement(verbs[0]);
  }
}

function doHidePlayerActions() {
  if (!hidePlayerActions) { return; }
  const act = getElementById('actionList');
  getArrayByClassName('player', act).forEach(hideActions);
}

function prepareHidePlayerActions() {
  hidePlayerActions = getValue('hidePlayerActions');
  $.subscribe(defAfterUpdateActionlist, doHidePlayerActions);
  doHidePlayerActions();
}

function toggleShowCreatureInfo() {
  calf.showCreatureInfo = !calf.showCreatureInfo;
  setValue('showCreatureInfo', calf.showCreatureInfo);
}

function toggleShowHuntingBuffs() {
  calf.showBuffs = !calf.showBuffs;
  setValue('showHuntingBuffs', calf.showBuffs);
  GameData.fetch(defFetchPlayerBuffs);
}

function toggleShowMonsterLog() {
  calf.showMonsterLog = !calf.showMonsterLog;
  setValue('showMonsterLog', calf.showMonsterLog);
}

function toggleSubLvlCreature() {
  calf.hideSubLvlCreature = !calf.hideSubLvlCreature;
  setValue('hideSubLvlCreature', calf.hideSubLvlCreature);
  GameData.fetch(defFetchWorldRealmActions);
}

function buildPrefsDiv() {
  return createDiv({
    id: 'fshWorldPrefs',
    innerHTML: `${simpleCheckboxHtml('showCreatureInfo')}&nbsp;&nbsp;${
      simpleCheckboxHtml('showMonsterLog')}&nbsp;&nbsp;${
      simpleCheckboxHtml('showTitanInfo')}&nbsp;&nbsp;${
      simpleCheckboxHtml('showBuffInfo')
    }<br>${
      simpleCheckboxHtml('hideSubLvlCreature')}&nbsp;&nbsp;${
      simpleCheckboxHtml('hidePlayerActions')}&nbsp;&nbsp;${
      huntingBuffsHtml()}`,
  });
}

const fshEvents = {
  hideSubLvlCreature: toggleSubLvlCreature,
  hidePlayerActions: toggleHidePlayerActions,
  showCreatureInfo: toggleShowCreatureInfo,
  showHuntingBuffs: toggleShowHuntingBuffs,
  showMonsterLog: toggleShowMonsterLog,
  showTitanInfo: toggleShowTitanInfo,
  showBuffInfo: toggleBuffInfo,
};

function prefsClickEvent(e) {
  const tmpFn = fshEvents[e.target.name];
  if (isFunction(tmpFn)) {
    e.target.blur();
    tmpFn(e);
  }
}

function buildFshDivs() {
  const fshDiv = createDiv({ className: 'fshCenter fshFten' });
  const prefsDiv = buildPrefsDiv();
  onclick(prefsDiv, prefsClickEvent);
  on(prefsDiv, 'change', toggleEnabledHuntingMode);
  insertElement(fshDiv, prefsDiv);
  const missingBuffsDiv = createDiv();
  insertElement(fshDiv, missingBuffsDiv);
  const tempWorldButtons = getElementById('worldContainerBelow').children[0];
  insertElementBefore(fshDiv, tempWorldButtons);
  return missingBuffsDiv;
}

function buildBuffHash(acc, curr) {
  acc[curr.name] = true;
  return acc;
}

function findMissingBuffs(buffHash, acc, curr) {
  if (!buffHash[curr.trim()]) { acc.push(curr); }
  return acc;
}

function displayMissingBuffs(missingBuffsDiv, missingBuffs) {
  setInnerHtml(`You are missing some ${huntingBuffsName} hunting buffs<br>(${
    missingBuffs.join(', ')})`, missingBuffsDiv);
}

function clearBuffDiv(missingBuffsDiv) {
  setInnerHtml('', missingBuffsDiv);
}

function lookForMissingBuffs(missingBuffsDiv, data) {
  const buffHash = data.b.reduce(buildBuffHash, {});
  const missingBuffs = huntingBuffs.reduce(
    partial(findMissingBuffs, buffHash), [],
  );
  if (missingBuffs.length > 0) {
    displayMissingBuffs(missingBuffsDiv, missingBuffs);
  } else {
    clearBuffDiv(missingBuffsDiv);
  }
}

function huntingBuffsEnabled(missingBuffsDiv, evt, data) {
  if (calf.showBuffs) {
    lookForMissingBuffs(missingBuffsDiv, data);
  } else {
    clearBuffDiv(missingBuffsDiv);
  }
}

function dataEventsPlayerBuffs(missingBuffsDiv, evt, data) {
  if (huntingBuffs) { huntingBuffsEnabled(missingBuffsDiv, evt, data); }
}

function doHuntingBuffs(missingBuffsDiv) { // jQuery.min
  setCurrentBuffList();
  const buffsFn = partial(dataEventsPlayerBuffs, missingBuffsDiv);
  $.subscribe(defPlayerBuffs, buffsFn);
  if (calf.showBuffs && window.initialGameData) { // HCS initial data
    buffsFn(null, { b: window.initialGameData.player.buffs });
  }
}

const bias = [
  { generalVariable: 1.1053, hpVariable: 1.1 },
  { generalVariable: 1.1, hpVariable: 1.053 },
  { generalVariable: 1.053, hpVariable: 1 },
  { generalVariable: 1.1053, hpVariable: 1 },
];

function getBiasGeneral(combatEvaluatorBias) {
  if (bias[combatEvaluatorBias]) {
    return bias[combatEvaluatorBias].generalVariable;
  }
  return 1.1053;
}

function getBiasHp(combatEvaluatorBias) {
  if (bias[combatEvaluatorBias]) {
    return bias[combatEvaluatorBias].hpVariable;
  }
  return 1.1;
}

function getCombatBias() {
  calf.combatEvaluatorBias = getValue('combatEvaluatorBias');
  calf.generalVariable = getBiasGeneral(calf.combatEvaluatorBias);
  calf.hpVariable = getBiasHp(calf.combatEvaluatorBias);
}

function noAction(myData) {
  return !myData || !myData.actions || myData.actions.length === 0;
}

function subLvlMobs(realmLevel, el) {
  if (el.type === 6) {
    return el.data.creature_type !== 0 || el.data.level >= realmLevel;
  }
  return true;
}

function getLvlToTest(myData) {
  return (myData.realm && myData.realm.minlevel) || GameData.realm().minlevel;
}

function xhrDataFilter(data) {
  const myData = jsonParse(data);
  if (noAction(myData)) { return data; }
  myData.actions = myData.actions.filter(
    partial(subLvlMobs, getLvlToTest(myData)),
  );
  return JSON.stringify(myData);
}

function isActionList(originalOptions) {
  return originalOptions.data
    && originalOptions.data.d
    && bitwiseAnd(originalOptions.data.d, defFetchWorldRealmActions);
}

function xhrPreFilter(options, originalOptions) {
  if (calf.hideSubLvlCreature && isActionList(originalOptions)) {
    // eslint-disable-next-line no-param-reassign
    options.dataFilter = xhrDataFilter;
  }
}

function interceptXHR() { // jQuery.min
  $.ajaxPrefilter('JSON', xhrPreFilter);
  if (calf.hideSubLvlCreature) {
    GameData.fetch(defFetchWorldRealmActions);
  }
}

function mappedArray(a) { calf[a[0]] = shouldBeArray(a[1]); }

function mappedArrays() {
  [
    ['buffs', 'huntingBuffs'],
    ['buffs2', 'huntingBuffs2'],
    ['buffs3', 'huntingBuffs3'],
  ].forEach(mappedArray);
}

function straightArray(a) { calf[a] = shouldBeArray(a); }

function straightArrays() {
  [
    'doNotKillList',
  ].forEach(straightArray);
}

function arrayType() {
  mappedArrays();
  straightArrays();
}

function mappedValue(a) { calf[a[0]] = getValue(a[1]); }

function mappedValues() {
  [
    ['buffsName', 'huntingBuffsName'],
    ['buffs2Name', 'huntingBuffs2Name'],
    ['buffs3Name', 'huntingBuffs3Name'],
    ['showBuffs', 'showHuntingBuffs'],
  ].forEach(mappedValue);
}

function straightValue(a) { calf[a] = getValue(a); }

function straightValues() {
  [
    'enabledHuntingMode',
    'hideSubLvlCreature',
    'showTitanInfo',
    'showBuffInfo',
    'showMonsterLog',
    'showCreatureInfo',
  ].forEach(straightValue);
}

function valueType() {
  mappedValues();
  straightValues();
}

function getPrefs() {
  arrayType();
  valueType();
}

function worldPrefs() {
  getCombatBias();
  getPrefs();
  const missingBuffsDiv = buildFshDivs();
  interceptXHR();
  doHuntingBuffs(missingBuffsDiv);
  prepareHidePlayerActions();
}

function hideGroupByType(type) { // jQuery
  $(`#actionList li.creature-${type.toString()} a.create-group`).hide();
}

function hideGroupSubscribe(type) { // jQuery.min
  $.subscribe(defAfterUpdateActionlist, partial(hideGroupByType, type));
}

const hideGroupTypes = [
  'hideChampionsGroup',
  'hideElitesGroup',
  'hideSEGroup',
  'hideTitanGroup',
  'hideLegendaryGroup',
];

function groupType(el, i) {
  if (getValue(el)) {
    hideGroupSubscribe(i + 1);
    hideGroupByType(i + 1);
  }
}

function hideGroupButton() {
  hideGroupTypes.forEach(groupType);
}

function injectMonsterStyle() {
  insertElement(document.body, createStyle(
    '#actionList .creature-1 {color: green;}\n'
    + '#actionList .creature-2 {color: yellow;}\n'
    + '#actionList .creature-3 {color: red;}',
  ));
}

function doMonsterColors() {
  if (getValue('enableCreatureColoring')) { injectMonsterStyle(); }
}

function doRepair(e, key) {
  if (key === 'ACT_REPAIR') {
    GameData.fetch(
      defFetchPlayerBackpackCount
      + defFetchPlayerBuffs
      + defFetchWorldRealmDynamic
      + defFetchWorldRealmActions,
    );
  }
}

function repairButton() {
  $.subscribe(defControlsKeydown, doRepair);
}

function msgCenterOffset() {
  $('#messageCenter').worldMessageCenter({ offset: '0 60' });
}

function hideMapTooltip() {
  hideQTip('#mapTooltip');
}

function fixDebuffQTip(e) {
  hideQTip(e.target);
}

function fixDebuff() {
  onclick(getElementById('buffList'), fixDebuffQTip);
}

const usualRoutines = [
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
  interceptMouseEvents,
];

function subscribes() {
  executeAll(usualRoutines);
  // eslint-disable-next-line no-unused-labels, no-labels
  devLbl: { //  hide titan combat results
    hideTitanCombatResults();
  }
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

export default subscribes;
//# sourceMappingURL=newMap-7c7f0231.js.map
