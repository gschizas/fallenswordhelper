import { a as addCommas } from './addCommas-02eed580.js';
import { m as getArrayByTagName, p as pCC, ax as contains, E as querySelectorArray, by as lastActivityRE, D as querySelector, f as insertHtmlBeforeEnd, d as defTable, b as createDiv, A as setInnerHtml, i as insertElement, H as getValue, R as getUrlParameter, g as getElementsByTagName, aa as querySelectorAll, a1 as playerIdUrl, o as onclick, u as indexAjaxData, v as guildSubcmdUrl, s as partial, t as createDocument, bz as defEnableGuildActivityTracker, V as setValue, k as on, n as cElement, aU as keys, aM as isUndefined, a as add, b8 as jsonParse, W as sendEvent, P as once, bA as draggable, c as calf, F as playerLinkSelector, bB as recallUserUrl, x as jQueryNotPresent } from './calfSystem-91adbec8.js';
import { l as lastActivityMins } from './onlineDot-f5323202.js';
import { s as setTipped } from './setTipped-777d443c.js';
import { c as colouredDots } from './colouredDots-fd53841d.js';
import compressBio from './compressBio-48778a54.js';
import { c as createStyle } from './createStyle-0a8034fd.js';
import { c as currentGuildId } from './currentGuildId-748f657b.js';
import { g as getLowerPvpLevel, a as getUpperPvpLevel, b as getLowerGvGLevel, c as getUpperGvgLevel } from './levelHighlight-adb7fa1d.js';
import { b as batch } from './batch-42f379a6.js';
import { o as openQuickBuffByName } from './openQuickBuffByName-0ac7bd3b.js';
import { d as dataRows } from './dataRows-b33675c3.js';
import { c as createInput } from './createInput-835773c5.js';
import { c as createUl } from './createUl-5035a7bc.js';
import { s as set, g as get } from './idb-321c4955.js';
import { i as insertElementAfterBegin } from './insertElementAfterBegin-beaa69ff.js';
import { b as simpleCheckboxHtml } from './simpleCheckbox-d105d600.js';
import { a as alpha } from './alpha-80a926ba.js';
import { c as createTBody } from './createTBody-406f648a.js';
import { c as createTable } from './createTable-f28d3fb9.js';
import { f as formatLocalDateTime } from './formatLocalDateTime-4d542cb2.js';
import { u as utc, l as lvl, v as vl, c as cur, m as max, a as act, g as gxp } from './indexConstants-dd933112.js';
import { c as createBr, t as toggleVisibilty } from './toggleVisibilty-a0553de5.js';
import { c as createButton } from './createButton-d7e54414.js';
import { c as createTextArea } from './createTextArea-05d1ee67.js';
import { d as dialogMsg } from './dialogMsg-844edf4e.js';
import { p as playerName } from './playerName-13e38788.js';
import { c as createSpan } from './createSpan-0e3d85b1.js';
import { h as hideElement } from './hideElement-d4551277.js';
import './createLabel-0c31c8c3.js';
import './insertElementBefore-43970b1f.js';
import './intValue-e7ef611d.js';
import './valueText-43fd27d5.js';
import './fshOpen-bec182a3.js';
import './isChecked-1c18cd61.js';
import './toLowerCase-51740687.js';
import './isDate-3e775446.js';
import './numberIsNaN-53300e34.js';
import './padZ-4bdbf4bf.js';

const ACTIVE = 0;
const STAMINA = 1;

function countActive(acc, curr) {
  const lastActivity = lastActivityRE.exec(curr.dataset.tipped);
  const mins = lastActivityMins({
    min: lastActivity[3],
    hour: lastActivity[2],
    day: lastActivity[1],
  });
  if (mins < 44640) {
    acc[ACTIVE] += 1;
    acc[STAMINA]
      += Number(/Stamina:<\/td><td>(\d+)/.exec(curr.dataset.tipped)[1]);
  }
  return acc;
}

function getActive(dots) {
  return dots.reduce(countActive, [0, 0]);
}

function activeMembers() {
  const members = getArrayByTagName('b', pCC).find(contains('Members'));
  if (members) {
    const dots = querySelectorArray('#pCC a[data-tipped*="Last Activity"]');
    const memberStats = getActive(dots);
    members.classList.add('tip-static');
    setTipped(`Active: ${memberStats[ACTIVE]}/${dots.length}<br>Stamina: ${
      addCommas(memberStats[STAMINA])}`, members);
  }
}

function getIntFromRegExp(theText, rxSearch) {
  let result;
  const matches = theText.replace(/,/g, '').match(rxSearch);
  if (matches) {
    result = parseInt(matches[1], 10);
  } else {
    result = 0;
  }
  return result;
}

function mightBePositive(actualXP, xpLockXP) {
  let sign = '';
  if (actualXP > xpLockXP) { sign = '+'; }
  return sign + addCommas(actualXP - xpLockXP);
}

function injectLock(xpLock) {
  const xpLockmouseover = xpLock.dataset.tipped;
  const xpLockXP = getIntFromRegExp(xpLockmouseover, /XP Lock: <b>(\d*)/);
  const actualXP = getIntFromRegExp(xpLockmouseover, /XP: <b>(\d*)/);
  insertHtmlBeforeEnd(xpLock.parentNode.nextElementSibling,
    ` (<b>${mightBePositive(actualXP, xpLockXP)}</b>)`);
}

function guildXPLock() {
  const xpLock = querySelector('#pCC a[data-tipped^="<b>Guild XP</b>"]');
  if (xpLock) { injectLock(xpLock); }
}

function compressHistory() {
  const thisCell = getArrayByTagName(defTable, pCC).slice(-2, -1)[0]
    .rows[0].cells[0];
  const newDiv = createDiv({
    id: 'profile-bio',
    innerHTML: thisCell.innerHTML,
  });
  setInnerHtml('', thisCell);
  insertElement(thisCell, newDiv);
  compressBio();
}

let highlightPlayersNearMyLvl;
let highlightGvGPlayersNearMyLvl;

function isPvpTarget(vlevel) {
  return highlightPlayersNearMyLvl
    && vlevel >= getLowerPvpLevel()
    && vlevel <= getUpperPvpLevel();
}

function isGvgTarget(vlevel) {
  return highlightGvGPlayersNearMyLvl
    && vlevel >= getLowerGvGLevel()
    && vlevel <= getUpperGvgLevel();
}

const getLastActivity = (a) => [a, lastActivityRE.exec(a.dataset.tipped)[1]];
const recentActivity = ([, lastActDays]) => lastActDays < 7;
const getVLevel = ([a]) => [a, Number(/VL:.+?(\d+)/.exec(a.dataset.tipped)[1])];
const getFlags = ([a, vlevel]) => [
  a.parentNode.parentNode.rowIndex,
  isPvpTarget(vlevel),
  isGvgTarget(vlevel),
];

function getPlayerLinks() {
  return querySelectorArray('#pCC a[data-tipped*="<td>VL:</td>"]')
    .map(getLastActivity)
    .filter(recentActivity)
    .map(getVLevel)
    .map(getFlags);
}

function shouldHighlight() {
  return Number(getUrlParameter('guild_id')) !== currentGuildId()
    && (highlightPlayersNearMyLvl || highlightGvGPlayersNearMyLvl);
}

const selector = (targets) => targets
  .map(([rowIndex]) => `.fshHighlight tr:nth-child(${rowIndex + 1})`)
  .join(',');

function pvpTargetStyle(pvpTargets) {
  if (pvpTargets.length) {
    const pvpStyle = `${selector(pvpTargets)} {background-color: #4671C8;}`;
    insertElement(document.body, createStyle(pvpStyle));
  }
}

function gvgTargetStyle(gvgTargets) {
  if (gvgTargets.length) {
    const gvgStyle = `${selector(gvgTargets)} {background-color: #FF9900;}`;
    insertElement(document.body, createStyle(gvgStyle));
  }
}

function memberListStyle(pvpTargets, gvgTargets) {
  if (pvpTargets.length + gvgTargets.length) {
    const tables = getElementsByTagName(defTable, pCC);
    const memberList = tables[tables.length - 1];
    memberList.classList.add('fshHighlight');
  }
}

function actuallyHighlight() {
  const playerLinks = getPlayerLinks();
  const pvpTargets = playerLinks.filter(([, pvpTarget]) => pvpTarget);
  const gvgTargets = playerLinks.filter(([, pvpTarget, gvgTarget]) => !pvpTarget && gvgTarget);
  pvpTargetStyle(pvpTargets);
  gvgTargetStyle(gvgTargets);
  memberListStyle(pvpTargets, gvgTargets);
}

function doHighlights() {
  if (shouldHighlight()) {
    actuallyHighlight();
  }
}

function injectViewGuild() {
  highlightPlayersNearMyLvl = getValue('highlightPlayersNearMyLvl');
  highlightGvGPlayersNearMyLvl = getValue('highlightGvGPlayersNearMyLvl');
  doHighlights();
  if (getValue('enableHistoryCompressor')) { compressHistory(); }
}

function insertBuffLink(el) {
  insertHtmlBeforeEnd(el.parentNode, ' <span class="smallLink">[b]</span>');
}

function openQuickBuff(evt) {
  if (evt.target.className !== 'smallLink') { return; }
  openQuickBuffByName(evt.target.previousElementSibling.text);
}

function buffLinks() {
  // TODO preference
  const members = querySelectorAll(`#pCC a[href^="${playerIdUrl}"]`);
  batch([5, 3, members, 0, insertBuffLink]);
  onclick(pCC, openQuickBuff);
}

function conflicts(page) {
  return indexAjaxData({
    cmd: 'guild',
    subcmd: 'conflicts',
    page,
  });
}

function makeCell(newRow, html) {
  setInnerHtml(html, newRow.insertCell(-1));
}

function buildRow(insertHere, html1, html2) {
  const newRow = insertHere.insertRow(insertHere.rows.length - 2);
  makeCell(newRow, html1);
  makeCell(newRow, html2);
}

function conflictHeader(insertHere) {
  buildRow(insertHere, `<a href="${guildSubcmdUrl
  }conflicts">Active Conflicts</a>`, 'Score');
}

function conflictRow(insertHere, aRow) {
  buildRow(insertHere,
    aRow.cells[0].innerHTML, `<b>${aRow.cells[6].innerHTML}</b>`);
}

function hazConflict(conflictTable, curPage, insertHere) { // Legacy
  if (curPage === 1) {
    conflictHeader(insertHere);
  }
  dataRows(conflictTable.rows, 7, 0).forEach(partial(conflictRow, insertHere));
}

function activeConflicts(doc, curPage, insertHere) { // Legacy
  const conflictTable = querySelector(
    '#pCC > table > tbody > tr > td > table', doc,
  );
  if (conflictTable && conflictTable.rows.length > 3) {
    hazConflict(conflictTable, curPage, insertHere);
  }
}

function getMaxPage(page) {
  return Number(page.parentNode.innerHTML.match(/of&nbsp;(\d*)/)[1]);
}

function getNextPage(curPage, fn, callback) {
  conflicts(curPage + 1).then(partial(fn, callback));
}

function gotConflictInfo(callback, responseText) { // Legacy
  const doc = createDocument(responseText);
  const page = querySelector('#pCC input[name="page"]', doc);
  if (!page) { return; }
  const curPage = Number(page.value);
  const maxPage = getMaxPage(page);
  activeConflicts(doc, curPage, callback.node);
  if (maxPage > curPage) {
    getNextPage(curPage, gotConflictInfo, callback);
  }
}

function conflictInfo(leftHandSideColumnTable) { // jQuery.min
  const statCtrl = leftHandSideColumnTable.rows[6].cells[0].children[0];
  if (statCtrl) {
    conflicts(1).then(partial(gotConflictInfo, { node: statCtrl }));
  }
}

var css = ".fsh-dialog-overlay {\r\n  position: fixed;\r\n  top: 0;\r\n  bottom: 0;\r\n  left: 0;\r\n  right: 0;\r\n  background: rgba(0, 0, 0, 0.5);\r\n  transform: translateX(-100vw);\r\n}\r\n.fsh-dialog-cancel {\r\n  position: absolute;\r\n  width: 100%;\r\n  height: 100%;\r\n}\r\n.fsh-dialog-popup {\r\n  width: 644px;\r\n  top: 75px;\r\n  left: 50%;\r\n  margin-left: -322px;\r\n  right: 0;\r\n  transform: translateX(-100vw);\r\n  position: absolute;\r\n}\r\n.fsh-dialog-open,\r\n.fsh-tab-open {\r\n  display: none;\r\n}\r\n.fsh-dialog-content > div {\r\n  transform: translateX(-100vw);\r\n}\r\n.fsh-dialog-open:checked ~ div {\r\n  transform: none;\r\n}\r\n.fsh-tab-label {\r\n  cursor: pointer;\r\n  display: block;\r\n  padding: 0.5em 0.5em;\r\n}\r\n.fsh-dialog .fsh-dialog-close {\r\n  top: 13px;\r\n  opacity: 0.8;\r\n  transition: opacity 200ms;\r\n  font-size: 24px;\r\n  font-weight: bold;\r\n  text-decoration: none;\r\n  color: #666666;\r\n  cursor: pointer;\r\n  padding: 0;\r\n}\r\n.fsh-dialog .fsh-dialog-close:hover {\r\n  opacity: 1;\r\n}\r\n.fsh-tab-open:nth-child(1):checked ~ ul li:nth-child(1),\r\n.fsh-tab-open:nth-child(2):checked ~ ul li:nth-child(2) {\r\n  background: #ffa614 url(https://www.fallensword.com/media/dist/img/jQueryUITheme/ui-bg_gloss-wave_30_ffa614_500x100.png) 50% 50% repeat;\r\n  margin-bottom: -1px;\r\n  padding-bottom: 1px;\r\n  border: solid #655e4e;\r\n  border-width: 1px 1px 0;\r\n  color: #381f00;\r\n}\r\n.fsh-tab-open:nth-child(1):checked ~ ul li:nth-child(1) label:hover,\r\n.fsh-tab-open:nth-child(2):checked ~ ul li:nth-child(2) label:hover {\r\n  cursor: text;\r\n}\r\n.fsh-tab-open:nth-child(1):checked ~ ul li:nth-child(2):hover,\r\n.fsh-tab-open:nth-child(2):checked ~ ul li:nth-child(1):hover {\r\n  border: 1px solid #a45b13;\r\n  border-bottom-width: 0;\r\n  background: #f0be00 url(https://www.fallensword.com/media/dist/img/jQueryUITheme/ui-bg_gloss-wave_70_f0be00_500x100.png) 50% 50% repeat-x;\r\n  color: #381f00;\r\n}\r\n.fsh-dialog-content {\r\n  margin: 12px;\r\n  position: relative;\r\n}\r\n.fsh-dialog-content > div:first-of-type {\r\n  position: relative;\r\n}\r\n.fsh-dialog-content > div:nth-of-type(n+2) {\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n}\r\n.fsh-tab-open:nth-child(1):checked ~ .fsh-dialog-content > div:nth-child(1),\r\n.fsh-tab-open:nth-child(2):checked ~ .fsh-dialog-content > div:nth-child(2) {\r\n  transform: none;\r\n}\r\n";
var modules_2eba1328 = {};

var css$1 = ".fsh-tracker {\r\n  align-items: center;\r\n  display: flex;\r\n  justify-content: space-between;\r\n}\r\n";
var modules_b27e1023 = {};

function togglePref(evt) {
  if (evt.target.id === defEnableGuildActivityTracker) {
    setValue(defEnableGuildActivityTracker,
      !getValue(defEnableGuildActivityTracker));
  }
}

function injectShowTracker() {
  const gs = querySelector('#pCC img.guild_openGuildStore');
  const td = gs.parentNode;
  const container = createDiv({ className: 'fsh-tracker' });
  const myDiv = createDiv({
    innerHTML: `${simpleCheckboxHtml(defEnableGuildActivityTracker)
    }&nbsp;<label class="custombutton" for="tracker">Show</label>`,
  });
  on(myDiv, 'change', togglePref);
  insertElement(container, gs);
  insertElement(container, myDiv);
  insertElementAfterBegin(td, container);
}

var css$2 = "#tg {\r\n  border: none;\r\n  width: 620px;\r\n  table-layout: fixed;\r\n}\r\n#tg th {text-align: center;}\r\n#tg td, #tg th{\r\n  overflow-x: hidden;\r\n  padding: 0.1em 0.1em 0.1em 0.1em;\r\n}\r\n#tg td{\r\n  padding: 0.1em 0.1em 0.1em 0.1em;\r\n  border-bottom: 1px solid gray;\r\n}\r\n#tg td:nth-child(1), #tg th:nth-child(1) {width: 125px;}\r\n#tg td:nth-child(2), #tg th:nth-child(2) {width: 80px;}\r\n#tg td:nth-child(3), #tg th:nth-child(3) {width: 40px;}\r\n#tg td:nth-child(4), #tg th:nth-child(4) {width: 40px;}\r\n#tg td:nth-child(5), #tg th:nth-child(5) {width: 50px;}\r\n#tg td:nth-child(6), #tg th:nth-child(6) {width: 50px;}\r\n#tg td:nth-child(7), #tg th:nth-child(7) {width: 30px;}\r\n#tg td:nth-child(8), #tg th:nth-child(8) {width: 40px;}\r\n#tg td:nth-child(9), #tg th:nth-child(9) {width: 115px;}\r\n#tg thead tr {\r\n  display: block;\r\n  position: relative;\r\n  background-color: #CD9E4B;\r\n}\r\n#tg tbody {\r\n  display: block;\r\n  height: 60vh;\r\n  overflow-y: scroll;\r\n  width: 100%;\r\n}\r\n#tg tr:last-child td {border-bottom: none;}\r\n#tg thead tr select {width: 79px;}\r\n";
var modules_9808e1e2 = {};

function createTh(props) {
  return cElement('th', props);
}

let actBody;
let selMember;
let tgCont;
let memberSelect;
let myMembers;

function addOption(acc, member) {
  return `${acc}<option value="${member}">${member}</option>`;
}

function buildOptions(ourMembers) {
  return '<select name="member">'
    + `<option value="- All -" selected>- All -</option>${
      keys(ourMembers).sort(alpha).reduce(addOption, '')}</select>`;
}

function toText(val) {
  if (isUndefined(val)) { return '#DEF'; }
  return val.toLocaleString();
}

function memberFilter(memberKey) {
  return selMember && selMember !== '- All -' && selMember !== memberKey;
}

function aMembersActivityRows(memberKey, inside, activity) {
  return `${inside}<tr>`
    + `<td>${
      formatLocalDateTime(new Date(activity[utc] * 1000))
    }</td>`
    + `<td>${memberKey}</td>`
    + `<td class="fshRight">${toText(activity[lvl])}</td>`
    + `<td class="fshRight">${toText(activity[vl])}</td>`
    + `<td class="fshRight">${toText(activity[cur])}</td>`
    + `<td class="fshRight">${toText(activity[max])}</td>`
    + `<td class="fshRight">${
      Math.floor((activity[cur] / activity[max]) * 100)
    }</td>`
    + `<td class="fshRight">${activity[act]}</td>`
    + `<td class="fshRight">${toText(activity[gxp])}</td>`
    + '</tr>';
}

function selectedMember(outside, memberKey) {
  if (memberFilter(memberKey)) { return outside; }
  return outside
    + myMembers[memberKey].reduce(partial(aMembersActivityRows, memberKey), '');
}

function memberRows() {
  return keys(myMembers).reduce(selectedMember, '');
}

function drawRows() {
  if (myMembers) { setInnerHtml(memberRows(), actBody); }
  tgCont.classList.remove('fshSpinner');
}

function queueDrawRows() {
  tgCont.classList.add('fshSpinner');
  add(3, drawRows);
}

function myChange(e) {
  selMember = e.target.value;
  queueDrawRows();
}

function initTable(theMembers) {
  if (theMembers) {
    myMembers = theMembers;
    setInnerHtml(buildOptions(theMembers), memberSelect);
    queueDrawRows();
  }
}

function makeMemberHeader() {
  const memberHead = createTh({ textContent: 'Member' });
  memberSelect = createDiv();
  insertElement(memberHead, memberSelect);
  return memberHead;
}

function headerRow(tg) {
  const hrow = tg.createTHead().insertRow(-1);
  insertHtmlBeforeEnd(hrow, '<th>Date</th>');
  const memberHead = makeMemberHeader();
  insertElement(hrow, memberHead);
  insertHtmlBeforeEnd(hrow, '<th>Level</th><th>VL</th>'
    + '<th>Stam</th><th>Max<br>Stam</th><th>Stam<br>%</th>'
    + '<th>Last<br>Activity<br>(Days)</th><th>GXP</th>');
}

function makeActBody(tg) {
  actBody = createTBody();
  insertElement(tg, actBody);
}

function makeTg() {
  const tg = createTable({ id: 'tg' });
  headerRow(tg);
  makeActBody(tg);
  on(tg, 'change', myChange);
  tgCont = createDiv({ className: 'tgCont fshSpinner64' });
  insertElement(tgCont, tg);
  return tgCont;
}

var css$3 = "#io {\r\n  text-align: center;\r\n  width: 620px;\r\n}\r\n#io button {margin: 1em 1em;}\r\n#io textarea {\r\n  height: 55vh;\r\n  overflow-y: scroll;\r\n  overflow-x: hidden;\r\n  width: 550px;\r\n  word-break: break-all;\r\n}\r\n";
var modules_ec295da5 = {};

let ioText;
let saveBtn;
let resetBtn;
let io;

function drawRawData(trackerData) {
  ioText.value = trackerData;
  io.classList.remove('fshSpinner');
}

function queueRawData(trackerData) {
  if (trackerData) {
    io.classList.add('fshSpinner');
    add(4, drawRawData, [trackerData]);
  }
}

function doReset() {
  ioText.value = '{"lastUpdate": 0, "members": {}}';
}

function successMsg(newData) {
  dialogMsg('Update successful');
  initTable(newData.members);
}

function doSave() {
  const newData = jsonParse(ioText.value);
  set('fsh_guildActivity', newData)
    .then(partial(successMsg, newData))
    .catch(dialogMsg);
}

function customButton(text, fn) {
  const btn = createButton({
    className: 'custombutton',
    textContent: text,
  });
  onclick(btn, fn);
  return btn;
}

function makeIoText() {
  ioText = createTextArea();
  ioText.setAttribute('autocapitalize', 'off');
  ioText.setAttribute('autocomplete', 'off');
  ioText.setAttribute('autocorrect', 'off');
  ioText.setAttribute('spellcheck', 'false');
}

function makeInOut() {
  io = createDiv({ id: 'io', className: 'fshSpinner64' });
  makeIoText();
  saveBtn = customButton('Save', doSave);
  resetBtn = customButton('Reset', doReset);
  insertElement(io, ioText);
  insertElement(io, createBr());
  insertElement(io, saveBtn);
  insertElement(io, resetBtn);
  return io;
}

let trackerData;
let tracker;
let trDialog;
let acttab2;

function isClosed() {
  return !tracker.checked;
}

function isOpen() {
  return tracker.checked;
}

function closeDialog() {
  tracker.checked = false;
}

function keydownHandler(evt) {
  if (isOpen() && evt.code === 'Escape') {
    closeDialog();
  }
}

function maybeClose(ret) {
  // eslint-disable-next-line no-param-reassign
  if (isClosed()) { ret.style.transform = null; }
}

function makeDragHandle() {
  return createUl({
    className: 'fshMove ui-tabs-nav ui-widget-header ui-corner-all '
      + 'ui-helper-reset ui-helper-clearfix',
    innerHTML: '<li class="ui-state-default ui-corner-top">'
      + '<label class="fsh-tab-label" for="acttab1">'
      + 'Guild Activity Tracker</label></li>'
      + '<li class="ui-state-default ui-corner-top">'
      + '<label class="fsh-tab-label" for="acttab2">Import/Export</label></li>'
      + '<label for="tracker" class="fsh-dialog-close '
      + 'ui-dialog-titlebar-close">&times;</label>',
  });
}

function updateRawData() {
  sendEvent('guildTracker', 'updateRawData');
  if (trackerData) { queueRawData(trackerData); }
}

function makeInnerPopup() {
  const dialogPopup = createDiv({
    className: 'fsh-dialog-popup '
      + 'ui-dialog ui-tabs ui-widget ui-widget-content ui-corner-all',
    innerHTML: '<input id="acttab1" class="fsh-tab-open" '
      + 'name="acttabs" checked type="radio">',
  });
  acttab2 = createInput({
    className: 'fsh-tab-open',
    id: 'acttab2',
    name: 'acttabs',
    type: 'radio',
  });
  once(acttab2, 'change', updateRawData);
  insertElement(dialogPopup, acttab2);
  return dialogPopup;
}

function makeRet() {
  const ret = makeInnerPopup();
  const hdl = makeDragHandle();
  insertElement(ret, hdl);
  draggable(hdl, ret);
  return ret;
}

function makeContainer() {
  const container = createDiv({ className: 'fsh-dialog-content' });
  insertElement(container, makeTg());
  insertElement(container, makeInOut());
  return container;
}

function makePopup() {
  const ret = makeRet();
  const container = makeContainer();
  insertElement(ret, container);
  on(tracker, 'change', partial(maybeClose, ret));
  insertElement(trDialog, ret);
}

function addOverlay() {
  insertHtmlBeforeEnd(trDialog,
    '<div class="fsh-dialog-overlay">'
    + '<label class="fsh-dialog-cancel" for="tracker"></label>'
    + '</div>');
}

function gotActivity(data) {
  if (data) {
    trackerData = JSON.stringify(data);
    initTable(data.members);
  }
}

function openDialog() {
  sendEvent('guildTracker', 'openDialog');
  get('fsh_guildActivity').then(gotActivity);
  calf.dialogIsClosed = isClosed;
  addOverlay();
  makePopup();
}

function injectTracker() {
  tracker = createInput({
    id: 'tracker',
    className: 'fsh-dialog-open',
    type: 'checkbox',
  });
  once(tracker, 'change', openDialog);
  trDialog = createDiv({ className: 'fsh-dialog' });
  insertElement(trDialog, tracker);
  on(document.body, 'keydown', keydownHandler);
  insertElement(document.body, trDialog);
}

function guildTracker() {
  injectShowTracker();
  injectTracker();
}

const prefEnableStamBars = 'enableStamBars';
let enableStamBars;
let thisStyle;

function getStamPerc(a) {
  const mo = a.dataset.tipped.match(/(\d+) \/ (\d+)/);
  return Math.min(Math.round((Number(mo[1]) / Number(mo[2])) * 100), 100);
}

function stamBarStyle(a) {
  const perc = getStamPerc(a);
  return '.fshProgressBar '
    + `tr:nth-child(${a.parentNode.parentNode.rowIndex + 1}) {`
    + `background-image: linear-gradient(to right, rgba(255, 153, 0, 0.5) ${perc}%, `
    + `transparent ${perc + 1}%)}`;
}

function injectStyle() {
  const tables = getElementsByTagName(defTable, pCC);
  const memberList = tables[tables.length - 1];
  memberList.classList.add('fshProgressBar');
  const memberLinks = querySelectorArray(playerLinkSelector, memberList);
  const myTest = memberLinks.map(stamBarStyle).join('\n');
  thisStyle = insertElement(document.body, createStyle(myTest)).sheet;
}

function toggleStyle() {
  if (!thisStyle) {
    injectStyle();
  } else {
    thisStyle.disabled = !enableStamBars;
  }
}

function changePref() {
  enableStamBars = !enableStamBars;
  setValue(prefEnableStamBars, enableStamBars);
  toggleStyle();
  sendEvent('guildManage', 'StamBars');
}

function injectPref() {
  const gs = querySelector('#pCC img.guild_openGuildStore');
  const td = gs.parentNode;
  const prefContainer = insertElement(td,
    createDiv({
      className: 'fshCenter',
      innerHTML: simpleCheckboxHtml(prefEnableStamBars),
    }));
  on(prefContainer, 'change', changePref);
}

function progressBar() {
  injectPref();
  enableStamBars = getValue(prefEnableStamBars);
  if (enableStamBars) { toggleStyle(); }
}

function makeButton(linkto) {
  return createSpan({
    className: 'fshLink tip-static',
    dataset: { linkto, tipped: 'Toggle Section' },
    textContent: 'X',
  });
}

function wrapper(btn) {
  const wrap = createSpan({ innerHTML: '[&nbsp;' });
  insertElement(wrap, btn);
  insertHtmlBeforeEnd(wrap, '&nbsp;]');
  return wrap;
}

function thisToggle(inject, panel, linkto) {
  const thisButton = makeButton(linkto);
  insertElement(inject, wrapper(thisButton));
  // eslint-disable-next-line no-param-reassign
  panel.id = linkto;
  if (getValue(linkto)) { hideElement(panel); }
  onclick(thisButton, toggleVisibilty);
}

function logoToggle(leftHandSideColumnTable) {
  thisToggle(
    leftHandSideColumnTable.rows[0].cells[1].children[0],
    leftHandSideColumnTable.rows[2].cells[0].children[0],
    'guildLogoControl',
  );
}

function statToggle(leftHandSideColumnTable) {
  const leaveGuildCell = leftHandSideColumnTable.rows[4].cells[1].children[0];
  setInnerHtml(leaveGuildCell.innerHTML.trim(), leaveGuildCell);
  thisToggle(leaveGuildCell,
    leftHandSideColumnTable.rows[6].cells[0].children[0],
    'statisticsControl');
}

function structureToggle(leftHandSideColumnTable) {
  thisToggle(leftHandSideColumnTable.rows[15].cells[1].children[0],
    leftHandSideColumnTable.rows[17].cells[0].children[0],
    'guildStructureControl');
}

function relicControl(leftHandSideColumnTable) {
  const relic = getArrayByTagName('b', leftHandSideColumnTable)
    .filter(contains('Relics'));
  if (relic.length !== 1) { return; }
  const thisFont = relic[0].parentNode.nextElementSibling.children[0];
  setInnerHtml(`[ <a href="${guildSubcmdUrl}reliclist">Control</a> ]&nbsp;`,
    thisFont);
}

function selfRecallLink(leftHandSideColumnTable) {
  // self recall
  const getLi = getElementsByTagName('li', leftHandSideColumnTable);
  const selfRecall = getLi[getLi.length - 1].parentNode;
  insertHtmlBeforeEnd(selfRecall,
    `<li><a href="${recallUserUrl}${playerName()
    }" class="tip-static" data-tipped="Self Recall">Self Recall</a></li>`);
}

function getLhsColTab() {
  return pCC.lastElementChild.rows[2].cells[0].children[0];
}

function lhsAdd(leftHandSideColumnTable, fn) {
  add(3, fn, [leftHandSideColumnTable]);
}

function lhsAdditions(leftHandSideColumnTable) {
  [
    logoToggle,
    statToggle,
    structureToggle,
    relicControl,
    selfRecallLink,
  ].forEach(partial(lhsAdd, leftHandSideColumnTable));
}

function ajaxStuff(leftHandSideColumnTable) {
  if (jQueryNotPresent()) { return; }
  // Detailed conflict information
  if (getValue('detailedConflictInfo')) {
    add(3, conflictInfo, [leftHandSideColumnTable]);
  }
  add(4, guildTracker);
}

function manage() {
  const leftHandSideColumnTable = getLhsColTab();
  lhsAdditions(leftHandSideColumnTable);
  add(3, buffLinks);
  ajaxStuff(leftHandSideColumnTable);
  progressBar();
}

function wrapUrl(guildLogo) {
  const url = guildLogo.nextElementSibling.nextElementSibling;
  if (url) { url.classList.add('fshBreakAll'); }
}

function removeGuildAvyImgBorder() {
  const guildLogo = querySelector('#pCC img[src*="/guilds/"][width="200"]');
  if (!guildLogo) { return; }
  guildLogo.removeAttribute('style');
  wrapUrl(guildLogo);
}

function injectGuild() {
  add(3, colouredDots);
  add(3, removeGuildAvyImgBorder);
  add(3, guildXPLock);
  add(3, activeMembers);

  if (calf.subcmd === 'manage') { manage(); }
  if (calf.subcmd === 'view') { injectViewGuild(); }
}

export default injectGuild;
//# sourceMappingURL=guild-d550ac51.js.map
