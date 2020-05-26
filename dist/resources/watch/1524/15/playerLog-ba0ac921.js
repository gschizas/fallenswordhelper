import { v as callApp, t as indexAjaxData, a7 as get, Q as nowSecs, aj as keys, r as partial, a5 as set, A as getText, T as sendEvent, ak as querySelectorAll, s as createDocument, aQ as getTextTrim, b9 as playerId, z as setInnerHtml, b as createDiv, i as insertElement, c as calf, bd as doAddIgnore, be as tradeUrl, bf as secureUrl, bg as attackplayerUrl, S as setValue, w as jQueryNotPresent, X as getCalfPrefs, e as insertHtmlBeforeEnd, C as playerIDRE, D as getValue, M as querySelector } from './calfSystem-b469667c.js';
import './playerName-701fa211.js';
import { t as toLowerCase } from './toLowerCase-7cb70168.js';
import { a as addCommas } from './addCommas-e9d41e91.js';
import { c as currentGuildId } from './currentGuildId-582db9c2.js';
import './fshOpen-9caa1c78.js';
import './openQuickBuffByName-938fcbbf.js';
import { d as dataRows } from './dataRows-476d0756.js';
import { c as createSpan } from './createSpan-46714a87.js';
import './all-3724e9c1.js';
import { a as allthen } from './allthen-5bad1519.js';
import './indexAjaxJson-c6108fea.js';
import { c as csvSplit } from './csvSplit-d90cb455.js';
import { q as quickBuffHref } from './quickBuffHref-b5ece724.js';
import './cmdExport-b618c276.js';
import { g as getTitle } from './getTitle-286e94a7.js';
import { p as parseDateAsTimestamp } from './parseDateAsTimestamp-f1f2d9e8.js';
import { b as buffList } from './buffObj-97d4ebd1.js';
import './getProfile-cd65ce35.js';
import { m as myStats } from './myStats-6697aab3.js';
import { g as getMembrList } from './getMembrList-657ec016.js';
import { a as addLogColoring } from './addLogColoring-8bf1a571.js';

function viewCombat(id) {
  return callApp({
    cmd: 'combat',
    subcmd: 'view',
    combat_id: id,
  });
}

// import { $dataAccess } from './_dataAccess';
// import viewCombat from './fallbacks/viewCombat';

function daViewCombat(id) {
  // return $dataAccess(appViewCombat, viewCombat, id);
  return viewCombat(id);
}

function combatView(id) {
  return indexAjaxData({
    cmd: 'combat',
    subcmd: 'view',
    combat_id: id,
  });
}

var specials = {"0":"Dull Edge was activated.","1":"@0 was afflicted by Super Elite Slayer.","2":"@0 was withered.","3":"@0\"s armor was shattered.","4":"@0 was infused with extra defense (Constitution).","5":"@0 was infused with extra armor (Sanctuary).","7":"@0 activated Spectral Knight reducing targets armor to zero.","8":"@0 activated Savagery.","9":"@0 activated Shield Strike.","13":"@0 activated Conserve.","17":"@0 activated Four Leaf.","18":"@0 leeched the buff \"@1\".","19":"@0\"s demoralize skill reduced the effectiveness of @1\"s enhancements.","20":"@0\"s reckoning has improved their skill \"@1\"","21":"@0 was mesmerized by Spell Breaker, losing the \"@1\" buff.","22":"@0 was turned Undead by Necrosis.","23":"@0 activated High Guard.","24":"@0 was smote.","25":"@0 activated Barricade.","26":"@0 activated Ageless.","27":"@0 activated Severe Condition.","28":"@0 activated Golden Shield.","29":"@0 activated Anti Deflect.","30":"@0 activated Sealed. (Negated @1)","31":"@0 activated Fist Fight.","33":"@0 activated Dispel Curse.","35":"@0 activated Heavy Weight.","37":"@0 had their armor and defence Inverted.","38":"@0 had their attack reduced by Fumble."};

let combatCache = {};

function currentCombatRecord(data, combatId, sevenDays) {
  return combatId === 'lastCheck'
    || (data[combatId].logTime && data[combatId].logTime > sevenDays);
}

function keepRecent(data, sevenDays, acc, combatId) {
  if (currentCombatRecord(data, combatId, sevenDays)) {
    acc[combatId] = data[combatId];
  }
  return acc;
}

function cleanCache(data) {
  const sevenDays = nowSecs - 7 * 24 * 60 * 60;
  combatCache = keys(data)
    .reduce(partial(keepRecent, data, sevenDays), {});
  combatCache.lastCheck = nowSecs;
  set('fsh_pvpCombat', combatCache);
}

function prepareCache(data) {
  const oneDay = nowSecs - 24 * 60 * 60;
  if (!data.lastCheck || data.lastCheck < oneDay) {
    cleanCache(data);
  } else {
    combatCache = data;
  }
}

function checkCache(data) {
  if (data) { prepareCache(data); }
}

function initCache() {
  return get('fsh_pvpCombat').then(checkCache);
}

function inSpecialsList(el) {
  return el.id in specials;
}

function check(specialHtml, el, i) {
  if (!inSpecialsList(el)) {
    const label = `${JSON.stringify(el)} ${getText(specialHtml[i])}`;
    // eslint-disable-next-line no-unused-labels, no-labels
    devLbl: { //  PvP missing Special
      // eslint-disable-next-line no-console
      console.log(label);
    }
    sendEvent('Logs', 'Missing PvP Special', label);
  }
}

function whatsMissing(json, html) {
  const specialHtml = querySelectorAll('#specialsDiv', createDocument(html));
  json.r.specials.forEach(partial(check, specialHtml));
}

function unknownSpecials(json) {
  if (!json.r.specials.every(inSpecialsList)) {
    combatView(json.r.id).then(partial(whatsMissing, json));
  }
}

function cacheCombat(aRow, json) {
  if (json.s) {
    combatCache[json.r.id] = {
      ...json,
      logTime: parseDateAsTimestamp(getTextTrim(aRow.cells[1])) / 1000,
    };
    set('fsh_pvpCombat', combatCache);
    unknownSpecials(json);
  }
  return json;
}

function result(stat, desc, color) {
  if (stat !== 0) {
    return `${desc}:<span class="${color}">${
      addCommas(stat)} </span>`;
  }
  return '';
}

function iDefended(json) {
  return json.r.defender.id === playerId() && json.r.winner === 1;
}

function iAttacked(json) {
  return json.r.attacker.id === playerId() && json.r.winner === 0;
}

function iWon(json) {
  if (iDefended(json) || iAttacked(json)) {
    return 'fshGreen';
  }
  return 'fshRed';
}

function highlightSpecials(acc, el) {
  if (el.id === 18) {
    return `${acc}<br><span class="fshRed fshBold">${
      el.params[0]} leeched the buff '${el.params[1]}'.</span>`;
  }
  if (el.id === 21) {
    return `${acc}<br><span class="fshRed fshBold">${
      el.params[0]} was mesmerized by Spell Breaker, losing the '${
      el.params[1]}' buff.</span>`;
  }
  return acc;
}

function parseCombat(combatSummary, json) {
  if (!json.s) { return; }
  const color = iWon(json);
  setInnerHtml(result(json.r.xp_gain, 'XP stolen', color)
    + result(json.r.gold_gain, 'Gold lost', color)
    + result(json.r.gold_stolen, 'Gold stolen', color)
    + result(json.r.pvp_prestige_gain, 'Prestige gain', color)
    + result(json.r.pvp_rating_change, 'PvP change', color)
    + json.r.specials.reduce(highlightSpecials, ''), combatSummary);
}

function processCombat(aRow) {
  const combatID = /combat_id=(\d+)/.exec(aRow.cells[2].innerHTML)[1];
  const combatSummary = createDiv({ style: { color: 'gray' } });
  insertElement(aRow.cells[2], combatSummary);
  if (combatCache[combatID] && combatCache[combatID].logTime) {
    parseCombat(combatSummary, combatCache[combatID]);
  } else {
    daViewCombat(combatID).then(partial(cacheCombat, aRow))
      .then(partial(parseCombat, combatSummary));
  }
}

function replaceLeadingText(msgCell, newHtml) {
  const replaceText = createSpan({ innerHTML: newHtml });
  msgCell.replaceChild(replaceText, msgCell.firstChild); // Text Node
}

function parseCombatWinner(msgCell) {
  const victory = /You were victorious over/.test(msgCell.innerHTML);
  if (victory) {
    replaceLeadingText(msgCell,
      'You were <span class="fshGreen">victorious</span> over ');
    return 1;
  }
  const defeat = /You were defeated by/.test(msgCell.innerHTML);
  if (defeat) {
    replaceLeadingText(msgCell,
      'You were <span class="fshRed">defeated</span> by ');
    return 0;
  }
}

function processCombatRow(aRow) {
  const winner = parseCombatWinner(aRow.cells[2]);
  if ([0, 1].includes(winner)) { processCombat(aRow); }
}

const combatRowTests = [
  (aRow, messageType) => messageType === 'Combat',
  () => calf.showPvPSummaryInLog,
  (aRow) => aRow.cells[2] && /combat_id=/.test(aRow.cells[2].innerHTML),
  (aRow) => !/\(Guild Conflict\)/.test(getText(aRow.cells[2])),
];

function isCombatRow(aRow, messageType) {
  return combatRowTests.every((e) => e(aRow, messageType));
}

function addPvpSummary(aRow, messageType) {
  // add PvP combat log summary
  if (isCombatRow(aRow, messageType)) { processCombatRow(aRow); }
}

function thisNick(nick, buffObj) {
  return csvSplit(buffObj.nicks).includes(toLowerCase(nick));
}

function getBuffId(nick) {
  return buffList.find(partial(thisNick, nick)).id;
}

function doBuffLink(targetPlayerID, buffsSent) {
  let href = '';
  if (buffsSent) {
    href = quickBuffHref(targetPlayerID,
      csvSplit(buffsSent[0].replace(/`~|~`/g, '')).map(getBuffId).join(';'));
  } else {
    href = quickBuffHref(targetPlayerID);
  }
  return ` | <a ${href}>Buff</a></span>`;
}

function removeHTML(buffName) {
  return buffName.replace(/<\/?[^>]+(>|$)/g, '');
}

function reportIgnore(aRow, isGuildMate, playerName) { // Legacy
  let extraPart = '';
  const dateHTML = aRow.cells[1].innerHTML;
  const dateFirstPart = dateHTML
    .substring(0, dateHTML.indexOf('>Report') + 7);
  const dateLastPart = dateHTML
    .substring(dateHTML.indexOf('Message</a>') + 11, dateHTML.length);
  if (!isGuildMate) {
    extraPart = ` | <a title="Add to Ignore List" href="${doAddIgnore
    }${playerName}">Ignore</a>`;
  }
  setInnerHtml(`${dateFirstPart}</a>${extraPart}${dateLastPart}`,
    aRow.cells[1]);
}

function makeFirstPart(messageHTML) {
  return messageHTML.substring(0, messageHTML.indexOf('<small>') + 7);
}

function makeMsgReplyTo(playerName, firstPart) {
  let replyTo = '';
  if (calf.enableChatParsing) {
    replyTo = removeHTML(firstPart.replace(/&nbsp;/g, ' ')).substr(0, 140);
  }
  return '[ <span style="cursor:pointer;text-decoration:underline" '
    + `class="a-reply" target_player="${playerName}" replyTo="${
      replyTo}...">Reply</span>`;
}

function makeExtraPart(playerName) {
  return ` | <a href="${tradeUrl}${
    playerName}">Trade</a> | <a title="Secure Trade" href="${
    secureUrl}${playerName}">ST</a>`;
}

function getThirdPart(messageHTML) { // Legacy
  const thirdPart = messageHTML.substring(messageHTML.indexOf('>Reply</a>') + 10,
    messageHTML.indexOf('>Buff</a>') + 9);
  const targetPlayerRE = /quickBuff\((\d+)\)/.exec(thirdPart);
  if (targetPlayerRE) {
    return doBuffLink(targetPlayerRE[1], messageHTML.match(/`~.*?~`/));
  }
  return '';
}

function getAttackPart(playerName) { // Legacy
  if (calf.addAttackLinkToLog) {
    return ` | <a href="${attackplayerUrl}${playerName}">Attack</a>`;
  }
  return '';
}

function makeFourthPart(messageHTML) {
  return messageHTML.substring(messageHTML
    .indexOf('>Trade</a>') + 10, messageHTML.indexOf('</small>'));
}

function makeLastPart(messageHTML) {
  return messageHTML.substring(messageHTML.indexOf('</small>'),
    messageHTML.length);
}

function messageExtras(aRow, playerName) {
  const messageHTML = aRow.cells[2].innerHTML;
  const firstPart = makeFirstPart(messageHTML);
  setInnerHtml(`${firstPart}<nobr>${makeMsgReplyTo(playerName, firstPart)}${
    makeExtraPart(playerName)}${getThirdPart(messageHTML)}${
    getAttackPart(playerName)}${makeFourthPart(messageHTML)}</nobr>${
    makeLastPart(messageHTML)}`, aRow.cells[2]);
}

function isChat(aRow, isGuildMate, playerName) { // Legacy
  reportIgnore(aRow, isGuildMate, playerName);
  messageExtras(aRow, playerName);
}

function doChat(messageType, aRow, isGuildMate, playerName) { // Legacy
  if (messageType === 'Chat') { isChat(aRow, isGuildMate, playerName); }
}

function isLadderReset(aRow) {
  return calf.trackLadderReset && aRow.cells[2]
    && /You ranked \w{3} in your PvP Band! You have gained \d x PvP Ladder Token/
      .test(getText(aRow.cells[2]));
}

function saveLastResetTime(aRow) {
  const logTime = parseDateAsTimestamp(getTextTrim(aRow.cells[1]));
  if (logTime > calf.lastLadderReset) {
    setValue('lastLadderReset', logTime);
    calf.lastLadderReset = logTime;
  }
}

function processLadder(aRow, messageType) {
  if (messageType === 'Notification' && isLadderReset(aRow)) {
    saveLastResetTime(aRow);
  }
}

function getPvpId(aRow) {
  return aRow.cells[2] && /pvp_id=(\d+)/.exec(aRow.cells[2].innerHTML);
}

// function processResults(json) {
//   console.log(json);
// }

// eslint-disable-next-line
function havePvpId(aRow, pvpId) {
  // results(pvpId).then(processResults);
  // console.log(aRow, pvpId);
}

// TODO Pref
function viewCombat$1(aRow) {
  const pvpId = getPvpId(aRow);
  if (pvpId) { havePvpId(aRow, pvpId[1]); }
}

let memberNamesAsStrings = [];
let listOfAllies;
let listOfEnemies;

function setColour(el, col) {
  el.classList.add(col);
}

function isEnemy(playerName, playerElement) {
  if (listOfEnemies.includes(playerName)) {
    setColour(playerElement, 'fshRed');
  }
}

function isAlly(playerName, playerElement) {
  if (listOfAllies.includes(playerName)) {
    setColour(playerElement, 'fshBlue');
  }
}

function playerColor(colorPlayerName, playerName, playerElement) {
  if (!colorPlayerName) { return false; }
  if (memberNamesAsStrings.includes(playerName)) {
    setColour(playerElement, 'fshGreen');
    return true;
  }
  isEnemy(playerName, playerElement);
  isAlly(playerName, playerElement);
  return false;
}

function getKeys(data) {
  memberNamesAsStrings = keys(data);
}

function justUsername(obj) {
  return obj.username;
}

function prepareAlliesEnemies(data) {
  listOfAllies = data._allies.map(justUsername);
  listOfEnemies = data._enemies.map(justUsername);
}

function getCalfVars() {
  [
    'enableChatParsing',
    'lastLadderReset',
    'showPvPSummaryInLog',
    'trackLadderReset',
  ].forEach(getCalfPrefs);
}

function doMsgHeader(logTable) {
  const messageHeader = logTable.rows[0].cells[2];
  if (messageHeader) {
    insertHtmlBeforeEnd(messageHeader, '&nbsp;&nbsp;'
      + '<span class="fshWhite">(Guild mates show up in '
      + '<span class="fshGreen">green</span>)</span>');
  }
}

function canIgnore(aRow, playerName, isGuildMate) {
  if (!isGuildMate) {
    const dateExtraText = '<nobr><span style="font-size:x-small;">[ '
      + `<a title="Add to Ignore List" href="'${doAddIgnore}${
        playerName}">Ignore</a> ]</span></nobr>`;
    setInnerHtml(`${aRow.cells[1].innerHTML}<br>${dateExtraText}`,
      aRow.cells[1]);
  }
}

function addExtraStuff(aRow, playerName, isGuildMate) { // Legacy
  canIgnore(aRow, playerName, isGuildMate);
  const buffingPlayerID = playerIDRE
    .exec(aRow.cells[2].innerHTML)[1];
  const buffingPlayerName = getTextTrim(aRow.cells[2].children[0]);
  let extraText = ' <span style="font-size:x-small;"><nobr>[ '
    + '<span style="cursor:pointer;text-decoration:underline" '
    + `class="a-reply" target_player="${
      buffingPlayerName}">Reply</span> | <a href="${tradeUrl}${
      buffingPlayerName}">Trade</a> | <a title="Secure Trade" href="${
      secureUrl}${buffingPlayerName}">ST</a>`;
  extraText += doBuffLink(buffingPlayerID);
  if (calf.addAttackLinkToLog) {
    extraText += ` | <a href="${attackplayerUrl}${buffingPlayerName
    }">Attack</a>`;
  }
  extraText += ' ]</nobr></span>';

  // eslint-disable-next-line no-param-reassign
  aRow.cells[2].innerHTML += extraText;
}

function hasPlayerLink(aRow) {
  return aRow.cells[2].children[0]
    && aRow.cells[2].children[0].nodeName === 'A'
    && /player_id/.test(aRow.cells[2].children[0].href);
}

function doExtraStuff(aRow, messageType, playerName, isGuildMate) {
  if (messageType === 'Notification' && hasPlayerLink(aRow)) {
    addExtraStuff(aRow, playerName, isGuildMate);
  }
}

function doLogWidgetRow(aRow, messageType) { // Legacy
  let playerElement;
  let playerName;
  let colorPlayerName = false;
  if (hasPlayerLink(aRow)) {
    // eslint-disable-next-line prefer-destructuring
    playerElement = aRow.cells[2].children[0];
    playerName = getTextTrim(playerElement);
    colorPlayerName = true;
  }
  const isGuildMate = playerColor(colorPlayerName, playerName, playerElement);
  doChat(messageType, aRow, isGuildMate, playerName);
  doExtraStuff(aRow, messageType, playerName, isGuildMate);
}

function processLogWidgetRow(aRow) { // Legacy
  const messageType = getTitle(aRow.cells[0].children[0]);
  if (messageType) {
    doLogWidgetRow(aRow, messageType);
    addPvpSummary(aRow, messageType);
    processLadder(aRow, messageType);
    // eslint-disable-next-line no-unused-labels, no-labels
    devLbl: { //  arena Combat
      viewCombat$1(aRow);
    }
  }
}

function processTableRows(logTable) {
  dataRows(logTable.rows, 3, 0).forEach(processLogWidgetRow);
}

function openMsgDialog(evt) {
  window.openQuickMsgDialog(evt.target.getAttribute('target_player'),
    '', evt.target.getAttribute('replyTo'));
}

function foundLogTable(logTable) { // Legacy
  getCalfVars();
  doMsgHeader(logTable);
  processTableRows(logTable);
  $('.a-reply').on('click', openMsgDialog);
}

function addLogWidgetsOld() { // Legacy
  calf.addAttackLinkToLog = getValue('addAttackLinkToLog');
  const logTable = querySelector('#pCC > table:last-of-type');
  if (logTable) { foundLogTable(logTable); }
}

function addLogWidgets() { // jQuery.min
  if (jQueryNotPresent()) { return; }
  const prm = [
    myStats(false).then(prepareAlliesEnemies),
    initCache(),
  ];
  if (currentGuildId()) { prm.push(getMembrList(false).then(getKeys)); }
  allthen(prm, addLogWidgetsOld);
}

function playerLog() {
  addLogColoring('PlayerLog', 1);
  addLogWidgets();
}

export default playerLog;
//# sourceMappingURL=playerLog-ba0ac921.js.map
