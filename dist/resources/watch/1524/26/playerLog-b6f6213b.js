import { e as entries, aV as isObject, bb as getCustomUrlParameter, bc as attackplayerUrl, E as querySelectorArray, bd as doAddIgnore, K as getTextTrim, z as setText, f as insertHtmlBeforeEnd, F as playerLinkSelector, D as querySelector, w as callApp, T as nowSecs, s as partial, aU as fromEntries, be as combatSelector, B as getText, a5 as insertHtmlAfterBegin, i as insertElement, b as createDiv, bf as chatSelector, M as arrayFrom, G as getValue, o as onclick, V as setValue, a7 as defLastLadderReset, bg as noteSelector, x as jQueryNotPresent } from './calfSystem-c851a12c.js';
import './playerName-c2417987.js';
import { t as toLowerCase } from './toLowerCase-b21b7cc8.js';
import { a as addCommas } from './addCommas-b567f740.js';
import { c as createStyle } from './createStyle-55476e5b.js';
import { c as currentGuildId } from './currentGuildId-25856d67.js';
import './fshOpen-a7890139.js';
import { o as openQuickBuffByName } from './openQuickBuffByName-df881f3c.js';
import './dataRows-9921e68d.js';
import { s as set, g as get } from './idb-6207cbac.js';
import './closest-c2515a48.js';
import { c as closestTr } from './closestTr-edab17ad.js';
import './indexAjaxJson-bfe47429.js';
import './cmdExport-d8c344d2.js';
import { c as csvSplit } from './csvSplit-653f6227.js';
import { i as insertHtmlAfterEnd } from './insertHtmlAfterEnd-21fda3e0.js';
import { p as parseDateAsTimestamp } from './parseDateAsTimestamp-7d5c44ea.js';
import { b as buffList } from './buffObj-edd5c6f3.js';
import './getProfile-457ccf3c.js';
import { m as myStats } from './myStats-1b03d067.js';
import { c as closestTd } from './closestTd-0e3beede.js';
import { g as getMembrList } from './getMembrList-38f9cfdb.js';
import './doBuffLinkClick-2a80865b.js';
import { a as addLogColoring } from './addLogColoring-da80732a.js';

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

const getPlayer = (t) => [t, getCustomUrlParameter(t.href, 'target_username')];
const guildTest = async ([t, name]) => [t, name, await isGuildMate(name)];

function addAttack([t, playerName]) {
  insertHtmlAfterEnd(t, ` | <a href="${attackplayerUrl}${playerName}">Attack</a>`);
}

async function addAttackLink(logTable) {
  const trade = querySelectorArray('a[href*="=createsecure&"]', logTable);
  if (!trade.length) { return; }
  const withPlayer = trade.map(getPlayer);
  const guildMate = await Promise.all(withPlayer.map(guildTest));
  guildMate.filter(([, , gm]) => !gm).forEach(addAttack);
}

function ignoreLinkHtml(p) {
  return `<a href="${doAddIgnore}${getTextTrim(p)}" data-tooltip="Add to Ignore List">Ignore</a>`;
}

function withMsg([p, , m]) {
  setText('Report', m);
  insertHtmlAfterEnd(m, ` | ${ignoreLinkHtml(p)}`);
}

function noMsg([p, r]) {
  insertHtmlBeforeEnd(r.cells[1].children[0],
    `<font size="1"><br>[ ${ignoreLinkHtml(p)} ]</font>`);
}

function addIgnoreLinks(logTable) {
  const playerLinks = querySelectorArray(playerLinkSelector, logTable);
  if (playerLinks.length === 0) { return; }
  const playerRows = playerLinks.map((p) => [p, closestTr(p)]);
  const reportLinks = playerRows.map(([p, r]) => [p, r, querySelector('a[href*="reportMsg"]', r)]);
  reportLinks.filter(([, , m]) => m).forEach(withMsg);
  reportLinks.filter(([, , m]) => !m).forEach(noMsg);
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

const isPvp = (r) => querySelector(combatSelector, r);
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
  return ['', getText(r.cells[2].firstChild)];
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
  const combatRows = combatLinks.map(closestTr).filter(isPvp);
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
//# sourceMappingURL=playerLog-b6f6213b.js.map
