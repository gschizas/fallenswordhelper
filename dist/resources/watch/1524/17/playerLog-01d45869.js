import { l as entries, aW as isObject, a4 as getTextTrim, N as querySelector, bc as attackplayerUrl, H as querySelectorArray, bd as chatSelector, y as setText, be as doAddIgnore, v as callApp, R as nowSecs, r as partial, aV as fromEntries, a5 as insertHtmlAfterBegin, i as insertElement, b as createDiv, e as insertHtmlBeforeEnd, bf as playerLinkSelector, a3 as arrayFrom, D as getValue, o as onclick, bg as noteSelector, bh as tradeUrl, bi as secureUrl, A as getText, T as setValue, a7 as defLastLadderReset, w as jQueryNotPresent } from './calfSystem-f6498976.js';
import './playerName-fb1b1297.js';
import { t as toLowerCase } from './toLowerCase-3e1bda15.js';
import { a as addCommas } from './addCommas-137b79b9.js';
import { c as currentGuildId } from './currentGuildId-6087beb5.js';
import './fshOpen-d70c709f.js';
import { o as openQuickBuffByName } from './openQuickBuffByName-f15b9edc.js';
import './dataRows-74b73b57.js';
import { s as set, g as get } from './idb-19d381b0.js';
import { c as createStyle } from './createStyle-ce42a3a3.js';
import './closest-07392fae.js';
import './indexAjaxJson-d6e4bb8c.js';
import { c as csvSplit } from './csvSplit-8807bbc7.js';
import { i as insertHtmlAfterEnd } from './insertHtmlAfterEnd-c351a35c.js';
import './cmdExport-04d8cb57.js';
import { c as closestTr } from './closestTr-c7a10c8a.js';
import { p as parseDateAsTimestamp } from './parseDateAsTimestamp-150901d3.js';
import { b as buffList } from './buffObj-9fd31a53.js';
import './getProfile-fb755691.js';
import { m as myStats } from './myStats-80cef099.js';
import { c as closestTd } from './closestTd-009d551b.js';
import { g as getMembrList } from './getMembrList-753e9e09.js';
import { a as addLogColoring } from './addLogColoring-ad8c6c9e.js';

let memberPrm;

async function getKeys() {
  return entries(await getMembrList(false))
    .filter(([, value]) => isObject(value))
    .map(([key]) => key);
}

async function isGuildMate(playerName) {
  if (currentGuildId() && !memberPrm) {
    memberPrm = getKeys();
  }
  return (await memberPrm).includes(playerName);
}

const getPlayer = (r) => getTextTrim(r.cells[2].children[0]);
const guildTest = async ([r, name]) => [r, name, await isGuildMate(name)];

function addAttack([r, playerName]) {
  const trade = querySelector('a[href*="=createsecure&"]', r);
  insertHtmlAfterEnd(trade,
    ` | <a href="${attackplayerUrl}${playerName}">Attack</a>`);
}

async function addAttackLink(logTable) {
  const chatImg = querySelectorArray(chatSelector, logTable);
  if (chatImg.length === 0) { return; }
  const chatRows = chatImg.map(closestTr);
  const withPlayer = chatRows.map((r) => [r, getPlayer(r)]);
  const guildMate = await Promise.all(withPlayer.map(guildTest));
  const toUpdate = guildMate.filter(([, , gm]) => !gm);
  toUpdate.forEach(addAttack);
}

function doIgnoreLink(a) {
  const playerName = getTextTrim(closestTd(a).nextElementSibling.children[0]);
  setText('Report', a);
  insertHtmlAfterEnd(a,
    ` | <a href="${doAddIgnore}${playerName}" class="tip-static" `
      + 'data-tipped="Add to Ignore List">Ignore</a>');
}

function addIgnoreLinks(logTable) {
  const reportLinks = querySelectorArray('a[href*="reportMsg"]', logTable);
  reportLinks.forEach(doIgnoreLink);
}

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

const storageKey = 'fsh_pvpCombat';

let combatPrm;
let newCache;

function currentCombatRecord(sevenDays, [key, val]) {
  return key === 'lastCheck' || (val.logTime && val.logTime > sevenDays);
}

function getRecent(internal) {
  const sevenDays = nowSecs - 7 * 24 * 60 * 60;
  const pairs = entries(internal);
  const filtered = pairs.filter(partial(currentCombatRecord, sevenDays));
  const recent = { ...fromEntries(filtered), lastCheck: nowSecs };
  set(storageKey, recent);
  return recent;
}

async function prepareCache() {
  const internal = await get(storageKey);
  if (!internal) { return { lastCheck: nowSecs }; }
  const oneDay = nowSecs - 24 * 60 * 60;
  if (!internal.lastCheck || internal.lastCheck < oneDay) {
    return getRecent(internal);
  }
  return internal;
}

async function newCombat(r, combatId, combatCache) {
  const thisCombat = await daViewCombat(combatId);
  if (!thisCombat || !thisCombat.s) { return; }
  if (!newCache) {
    newCache = { ...combatCache };
  }
  newCache[combatId] = {
    ...thisCombat,
    logTime: parseDateAsTimestamp(getTextTrim(r.cells[1])) / 1000,
  };
  set(storageKey, newCache);
  return thisCombat;
}

async function getCombat(r, combatId) {
  if (!combatPrm) {
    combatPrm = prepareCache();
  }
  const combatCache = await combatPrm;
  if (combatCache[combatId] && combatCache[combatId].logTime) {
    return combatCache[combatId];
  }
  return newCombat(r, combatId, combatCache);
}

const green = 'fshGreen';
const red = 'fshRed';

const notGuildCombat = ([, msgHtml]) => !/\(Guild Conflict\)/.test(msgHtml);
const getCombats = async ([r, msgHtml]) => [
  r, msgHtml, await getCombat(r, /combat_id=(\d+)/.exec(msgHtml)[1]),
];

function parseCombatWinner(r, msgHtml) {
  const victory = /You were victorious over/.test(msgHtml);
  if (victory) {
    return [green, `You were <span class="${green}">victorious</span> over `];
  }
  const defeat = /You were defeated by/.test(msgHtml);
  if (defeat) {
    return [red, `You were <span class="${red}">defeated</span> by `];
  }
  return ['', r.cells[2].firstChild];
}

function result(stat, desc, color) {
  if (stat !== 0) {
    return `${desc}:<span class="${color}">${addCommas(stat)}</span> `;
  }
  return '';
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

function parseCombat(json, color) {
  return result(json.r.xp_gain, 'XP stolen', color)
    + result(json.r.gold_gain, 'Gold lost', color)
    + result(json.r.gold_stolen, 'Gold stolen', color)
    + result(json.r.pvp_prestige_gain, 'Prestige gain', color)
    + result(json.r.pvp_rating_change, 'PvP change', color)
    + json.r.specials.reduce(highlightSpecials, '');
}

function updateTd([r, msgHtml, json]) {
  const [color, pre] = parseCombatWinner(r, msgHtml);
  const summaryDiv = parseCombat(json, color);
  r.cells[2].firstChild.remove();
  insertHtmlAfterBegin(r.cells[2], pre);
  insertElement(r.cells[2], createDiv({ innerHTML: summaryDiv }));
}

async function addPvPSummary(logTable) {
  const combatLinks = querySelectorArray('a[href*="&combat_id="]', logTable);
  if (combatLinks.length === 0) { return; }
  const combatRows = combatLinks.map(closestTr);
  const withHtml = combatRows.map((r) => [r, r.cells[2].innerHTML]);
  const notGuild = withHtml.filter(notGuildCombat);
  const combats = await Promise.all(notGuild.map(getCombats));
  const goodCombats = combats.filter(([, , json]) => json && json.s);
  goodCombats.forEach(updateTd);
}

function changeLables(logTable) {
  querySelectorArray('a[href*="=trade&"]', logTable)
    .forEach((a) => setText('Trade', a));
  querySelectorArray('a[href*="=createsecure&"]', logTable)
    .forEach((a) => setText('ST', a));
}

const justUsername = (obj) => obj.username;

let allyPrm;

async function getAllyEnemy() {
  const stats = await myStats(false);
  return {
    _allies: stats._allies.map(justUsername),
    _enemies: stats._enemies.map(justUsername),
  };
}

async function isAlly(playerName) {
  if (!allyPrm) {
    allyPrm = getAllyEnemy();
  }
  return (await allyPrm)._allies.includes(playerName);
}

async function isEnemy(playerName) {
  if (!allyPrm) {
    allyPrm = getAllyEnemy();
  }
  return (await allyPrm)._enemies.includes(playerName);
}

function doMsgHeader(logTable) {
  const messageHeader = logTable.rows[0].cells[2];
  if (messageHeader) {
    insertHtmlBeforeEnd(messageHeader, '&nbsp;&nbsp;'
      + '<span class="fshWhite">(Guild mates show up in '
      + '<span class="fshGreen">green</span>)</span>');
  }
}

async function playerType(a) {
  let type = '';
  const playerName = getTextTrim(a);
  const [guildMate, ally, enemy] = await Promise.all([
    isGuildMate(playerName),
    isAlly(playerName),
    isEnemy(playerName),
  ]);
  if (guildMate) {
    type = 'guild';
  } else if (ally) {
    type = 'ally';
  } else if (enemy) {
    type = 'enemy';
  }
  return [
    `.fshPlayerColoring tr:nth-of-type(${closestTr(a).rowIndex + 1})`
      + ' td:nth-of-type(3) > a:first-of-type',
    type,
  ];
}

function byType(acc, [style, type]) {
  if (acc[type]) {
    acc[type].push(style);
  } else {
    acc[type] = [style];
  }
  return acc;
}

const colorLookup = {
  guild: 'green',
  ally: 'blue',
  enemy: 'red',
};

function makeStyle([key, selectors]) {
  return `${selectors.join(', ')} { color: ${colorLookup[key]}; }`;
}

async function colorPlayers(logTable) {
  const playerLinks = querySelectorArray(playerLinkSelector, logTable);
  if (playerLinks.length === 0) { return; }
  const playerTags = await Promise.all(playerLinks.map(playerType));
  const playersToColor = playerTags.filter(([, type]) => type !== '');
  const playerGroups = entries(playersToColor.reduce(byType, {}));
  const playerStyles = playerGroups.map(makeStyle);
  if (playerStyles.length) {
    doMsgHeader(logTable);
    logTable.classList.add('fshPlayerColoring');
    insertElement(document.body, createStyle(playerStyles.join('\n')));
  }
}

const isChat = (target) => querySelector(chatSelector, closestTr(target));
const getChildNodes = (target) => arrayFrom(closestTd(target).childNodes);
const childText = (target) => getChildNodes(target).map(getTextTrim);
const thisNick = (nick, buffObj) => csvSplit(buffObj.nicks)
  .includes(toLowerCase(nick));

function needToParse(target, btnText) {
  return isChat(target) && (btnText === 'Buff'
    || (btnText === 'Reply'
    && getValue('enableChatParsing')));
}

function parseReply(target) {
  const msgNodesArray = childText(target).slice(0, 2);
  const msg = msgNodesArray.join(' ');
  let tip = msg;
  if (msg.length > 140) {
    tip = `${msg.substring(0, 140)}...`;
  }
  window.openQuickMsgDialog(msgNodesArray[0], '', tip);
}

function getBuffId(nick) {
  const thisBuff = buffList.find((buffObj) => thisNick(nick, buffObj));
  if (thisBuff) { return thisBuff.id; }
}

function parseBuffs(e, target) {
  const [playerName, msg] = childText(target);
  const buffs = /`~(.*)~`/.exec(msg);
  if (buffs) {
    const ids = csvSplit(buffs[1]).map(getBuffId).filter((b) => b).join(';');
    openQuickBuffByName(playerName, ids);
    e.preventDefault();
  }
}

function intercept(e) {
  const { target } = e;
  const btnText = getTextTrim(target);
  if (needToParse(target, btnText)) {
    if (btnText === 'Reply') {
      parseReply(target);
      e.preventDefault();
    }
    if (btnText === 'Buff') {
      parseBuffs(e, target);
    }
  }
}

function interceptLinks(logTable) {
  onclick(logTable, intercept);
  return 0;
}

const isNote = ([, row]) => querySelector(noteSelector, row);

function addIgnore([, row, name]) {
  insertHtmlBeforeEnd(row.cells[1].children[0],
    `<font size="1"><br>[ <a href="${doAddIgnore}${name}" `
      + 'class="tip-static" data-tipped="Add to Ignore List" '
      + '>Ignore</a> ]</font>');
}

async function otherLinks(addAttackLinkToLog, [a, , name]) {
  const playerId = /&player_id=(\d+)/.exec(a.href)[1];
  const attackLink = addAttackLinkToLog && !await isGuildMate(name)
    ? ` | <a href="${attackplayerUrl}${name}">Attack</a>` : '';
  insertHtmlBeforeEnd(a.parentNode, '&nbsp;&nbsp; '
    + `<small>[ <a href="javascript:openQuickMsgDialog(&quot;${name}&quot;);" `
    + 'class="tip-static" data-tipped="Send Message">Reply</a> | '
    + `<a href="javascript:quickBuff(${playerId});">Buff</a> | `
    + `<a href="${tradeUrl}${name}">Send</a> | `
    + `<a href="${secureUrl}${name}">Trade</a>`
    + `${attackLink}`
    + ' ]</small>');
}

function notification(logTable, addIgnoreLink, addAttackLink) {
  const playerLinks = querySelectorArray(playerLinkSelector, logTable);
  if (playerLinks.length === 0) { return; }
  const playerRows = playerLinks.map((a) => [a, closestTr(a)]);
  const playerNotes = playerRows.filter(isNote);
  const nameNotes = playerNotes.map(([a, row]) => [a, row, getTextTrim(a)]);
  if (addIgnoreLink) {
    nameNotes.forEach(addIgnore);
  }
  nameNotes.forEach(partial(otherLinks, addAttackLink));
}

let lastLadderReset;
const ladderRe = /You ranked \w{3} in your PvP Band! You have gained \d x PvP Ladder Token/;

function pvp(r) {
  return ladderRe.test(getText(r.cells[2]));
}

function saveLastResetTime(r) {
  const logTime = parseDateAsTimestamp(getTextTrim(r.cells[1]));
  if (logTime > lastLadderReset) {
    setValue(defLastLadderReset, logTime);
    lastLadderReset = logTime;
  }
}

function processLadder(logTable) {
  lastLadderReset = getValue(defLastLadderReset);
  const noteImgs = querySelectorArray(noteSelector, logTable);
  const noteRows = noteImgs.map(closestTr);
  const pvpImgs = noteRows.filter(pvp);
  pvpImgs.forEach(saveLastResetTime);
}

function foundLogTable(logTable) {
  interceptLinks(logTable);
  const addIgnoreLink = getValue('addIgnoreLink');
  const addAttackLinkToLog = getValue('addAttackLinkToLog');
  if (addIgnoreLink) {
    addIgnoreLinks(logTable);
  }
  if (getValue('colorPlayerNames')) {
    colorPlayers(logTable);
  }
  if (addAttackLinkToLog) {
    addAttackLink(logTable);
  }
  if (getValue('notificationWidgets')) {
    notification(logTable, addIgnoreLink, addAttackLinkToLog);
  }
  if (getValue('changeButtonLabels')) {
    changeLables(logTable);
  }
  if (getValue('trackLadderReset')) {
    processLadder(logTable);
  }
  if (getValue('showPvPSummaryInLog')) {
    addPvPSummary(logTable);
  }
}

function addLogWidgets() {
  if (jQueryNotPresent()) { return; }
  const logTable = querySelector('#pCC > table:last-of-type');
  if (logTable) { foundLogTable(logTable); }
}

function playerLog() {
  addLogColoring('PlayerLog', 1);
  addLogWidgets();
}

export default playerLog;
//# sourceMappingURL=playerLog-01d45869.js.map
