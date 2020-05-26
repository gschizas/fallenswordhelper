import { k as getArrayByTagName, p as pCC, aP as contains, H as querySelectorArray, br as lastActivityRE, e as insertHtmlBeforeEnd, d as defTable, D as getValue, N as getUrlParameter, ak as querySelectorAll, _ as playerIdUrl, o as onclick, t as indexAjaxData, z as setInnerHtml, u as guildSubcmdUrl, r as partial, M as querySelector, s as createDocument, S as setValue, b as createDiv, f as on, i as insertElement, m as cElement, aj as keys, a8 as isUndefined, bs as utc, bt as lvl, bu as vl, bv as cur, bw as max, bx as act, by as gxp, a as add, aG as jsonParse, a5 as set, T as sendEvent, L as once, bz as draggable, a7 as get, c as calf, x as getElementById, bA as defEnableGuildActivityTracker, g as getElementsByTagName, bB as recallUserUrl, w as jQueryNotPresent } from './calfSystem-b469667c.js';
import './numberIsNaN-37f2e6cd.js';
import { p as playerName } from './playerName-701fa211.js';
import './toLowerCase-7cb70168.js';
import { c as createInput } from './createInput-b6bf3e26.js';
import { a as addCommas } from './addCommas-e9d41e91.js';
import { l as lastActivityMins } from './onlineDot-52aa275b.js';
import { s as setTipped } from './setTipped-fa603e24.js';
import { b as batch } from './batch-0e988765.js';
import { c as compressBio, a as colouredDots } from './compressBio-7b3b79a2.js';
import { c as createLabel } from './createLabel-60e60ad1.js';
import { c as currentGuildId } from './currentGuildId-582db9c2.js';
import './intValue-8eb7c4cb.js';
import './valueText-a1c5a956.js';
import { p as pvpLowerLevel, a as pvpUpperLevel, g as gvgLowerLevel, b as gvgUpperLevel, c as calculateBoundaries } from './levelHighlight-38d9b395.js';
import './fshOpen-9caa1c78.js';
import { o as openQuickBuffByName } from './openQuickBuffByName-938fcbbf.js';
import { d as dataRows } from './dataRows-476d0756.js';
import { c as createUl } from './createUl-e1d77960.js';
import './insertElementBefore-26cea2a0.js';
import { i as insertElementAfterBegin } from './insertElementAfterBegin-f1cecd09.js';
import './isChecked-81a663ed.js';
import { b as simpleCheckboxHtml } from './simpleCheckbox-6735e1ba.js';
import { a as alpha } from './alpha-ab888eb7.js';
import { c as createTBody } from './createTBody-f4a4f062.js';
import { c as createTable } from './createTable-1921c6ec.js';
import './isDate-50384901.js';
import './padZ-d111932e.js';
import { f as formatLocalDateTime } from './formatLocalDateTime-6cbadd4f.js';
import { c as createBr } from './createBr-5911cad1.js';
import { c as createButton } from './createButton-828d5198.js';
import { c as createTextArea } from './createTextArea-596e4436.js';
import { d as dialogMsg } from './dialogMsg-2350aeb0.js';
import { p as publish, s as subscribeOnce } from './pubsub-a9d662ab.js';
import { f as fshTabSet } from './fshTabSet-c151a817.js';
import './createLi-a9c37c09.js';
import { c as createStyle } from './createStyle-4923a3a3.js';
import { c as createSpan } from './createSpan-46714a87.js';
import { h as hideElement } from './hideElement-33e9906c.js';
import { t as toggleVisibilty } from './toggleVisibilty-0b377edc.js';

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

// import querySelector from '../common/querySelector';

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
  let xpLock;
  // var xpLock = querySelector('#pCC a[data-tipped^="<b>Guild XP</b>"]');
  if (xpLock) { injectLock(xpLock); }
}

function compressHistory() {
  compressBio(
    getArrayByTagName(defTable, pCC).slice(-2, -1)[0].rows[0].cells[0],
  );
}

let highlightPlayersNearMyLvl;
let highlightGvGPlayersNearMyLvl;

function isPvpTarget(vlevel) {
  return highlightPlayersNearMyLvl
    && vlevel >= pvpLowerLevel
    && vlevel <= pvpUpperLevel;
}

function isGvgTarget(vlevel) {
  return highlightGvGPlayersNearMyLvl
    && vlevel >= gvgLowerLevel
    && vlevel <= gvgUpperLevel;
}

function isActive(el, tipped) {
  const vlevel = Number(/VL:.+?(\d+)/.exec(tipped)[1]);
  const aRow = el.parentNode.parentNode;
  if (isPvpTarget(vlevel)) {
    aRow.classList.add('lvlHighlight');
  } else if (isGvgTarget(vlevel)) {
    aRow.classList.add('lvlGvGHighlight');
  }
}

function highlightMembers(el) {
  const { tipped } = el.dataset;
  const lastActDays = lastActivityRE.exec(tipped)[1];
  if (lastActDays < 7) { isActive(el, tipped); }
}

function shouldHighlight() {
  return Number(getUrlParameter('guild_id')) !== currentGuildId()
    && (highlightPlayersNearMyLvl || highlightGvGPlayersNearMyLvl);
}

function doHighlights() {
  if (shouldHighlight()) {
    calculateBoundaries();
    querySelectorArray('#pCC a[data-tipped*="<td>VL:</td>"]')
      .forEach(highlightMembers);
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

var undefined$1 = undefined;

var undefined$2 = undefined;

function togglePref(evt) {
  if (evt.target.id === 'enableGuildActivityTracker') {
    setValue('enableGuildActivityTracker',
      !getValue('enableGuildActivityTracker'));
  }
}

function injectShowTracker() {
  const gs = querySelector('#pCC img.guild_openGuildStore');
  const td = gs.parentNode;
  const container = createDiv({ className: 'fsh-tracker' });
  const myDiv = createDiv({
    innerHTML: `${simpleCheckboxHtml('enableGuildActivityTracker')
    }&nbsp;<label class="custombutton" for="tracker">Show</label>`,
  });
  on(myDiv, 'change', togglePref);
  insertElement(container, gs);
  insertElement(container, myDiv);
  insertElementAfterBegin(td, container);
}

var undefined$3 = undefined;

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

var undefined$4 = undefined;

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

var undefined$5 = undefined;

var undefined$6 = undefined;

function makeDialog(name) {
  const thisContainer = createDiv({ className: 'fshDialog' });
  const thisInput = createInput({ id: name, type: 'checkbox' });
  insertElement(thisContainer, thisInput);
  const thisOverlay = createDiv({ className: 'ui-widget-overlay' });
  const thisLabel = createLabel({ htmlFor: name });
  insertElement(thisOverlay, thisLabel);
  insertElement(thisContainer, thisOverlay);
  const thisPopup = createDiv(
    { className: 'ui-dialog ui-tabs ui-widget ui-widget-content ui-corner-all' },
  );
  publish(`${name}-popup`, thisPopup);
  insertElement(thisContainer, thisPopup);
  insertElement(document.body, thisContainer);
}

function fshModalDialog(name) {
  const thisInput = getElementById(name);
  if (thisInput) { thisInput.checked = true; } else {
    makeDialog(name);
  }
}

function injectTabSet(name, tabs, thisPopup) {
  fshTabSet(thisPopup, tabs, `${name}-tab`);
}

function fshTabbedModal(name, tabs) {
  subscribeOnce(`${name}-popup`, partial(injectTabSet, name, tabs));
  // subscribeOnce('qwtab-header', makePref);
  fshModalDialog(name);
}

var undefined$7 = undefined;

// import on from '../../common/on';
// import partial from '../../common/partial';

let actBody$1;
let tgCont$1;
let memberSelect$1;

function makeMemberHeader$1() {
  const memberHead = createTh({ textContent: 'Member' });
  memberSelect$1 = createDiv();
  insertElement(memberHead, memberSelect$1);
  return memberHead;
}

function headerRow$1(tg) {
  const hrow = tg.createTHead().insertRow(-1);
  insertHtmlBeforeEnd(hrow, '<th>Date</th>');
  const memberHead = makeMemberHeader$1();
  insertElement(hrow, memberHead);
  insertHtmlBeforeEnd(hrow, '<th>Level</th><th>VL</th>'
    + '<th>Stam</th><th>Max<br>Stam</th><th>Stam<br>%</th>'
    + '<th>Last<br>Activity<br>(Days)</th><th>GXP</th>');
}

function makeActBody$1(tg) {
  actBody$1 = createTBody();
  insertElement(tg, actBody$1);
}

function makeTg$1() {
  const tg = createTable({ id: 'tg' });
  headerRow$1(tg);
  makeActBody$1(tg);
  // on(tg, 'change', myChange);
  tgCont$1 = createDiv({ className: 'tgCont fshSpinner fshSpinner64' });
  insertElement(tgCont$1, tg);
  return tgCont$1;
}

function togglePref$1(evt) {
  if (evt.target.id === defEnableGuildActivityTracker) {
    setValue(defEnableGuildActivityTracker,
      !getValue(defEnableGuildActivityTracker));
  }
}

function injectContent(thisFn, thisDiv) {
  insertElement(thisDiv, thisFn());
}

function showDialog() {
  subscribeOnce('tracker-tab0', partial(injectContent, makeTg$1));
  // subscribeOnce('tracker-tab1', partial(injectContent, showAHInvManager, appInv));
  fshTabbedModal('tracker', ['Guild Activity Tracker', 'Import/Export']);
}

function injectShowTracker$1() {
  const gs = querySelector('#pCC img.guild_openGuildStore');
  const td = gs.parentNode;
  const container = createDiv({ className: 'fsh-tracker' });
  const myDiv = createDiv({
    innerHTML: `${simpleCheckboxHtml(defEnableGuildActivityTracker)
    }&nbsp;`,
  });
  on(myDiv, 'change', togglePref$1);
  const showTrackerDialog = createLabel({
    className: 'custombutton',
    htmlFor: 'tracker',
    textContent: 'Show',
  });
  once(showTrackerDialog, 'click', showDialog);
  insertElement(myDiv, showTrackerDialog);
  insertElement(container, gs);
  insertElement(container, myDiv);
  insertElementAfterBegin(td, container);
}

function guildTrackerV2() {
  injectShowTracker$1();
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
  return '#fshMemberList '
    + `tr:nth-child(${a.parentNode.parentNode.rowIndex + 1}) {`
    + `background: linear-gradient(to right, rgba(255, 153, 0, 0.5) ${perc}%, `
    + `transparent ${perc + 1}%)}`;
}

function injectStyle() {
  const tables = getElementsByTagName(defTable, pCC);
  const memberList = tables[tables.length - 1];
  memberList.id = 'fshMemberList';
  const memberLinks = querySelectorArray('a[href*="&player_id="]', memberList);
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

function doGuildTracker() {
  const test = 0;
  if (test === 0) {
    add(4, guildTracker);
  } else {
    // eslint-disable-next-line no-unused-labels, no-labels
    devLbl: { //  guildTrackerV2
      add(4, guildTrackerV2);
    }
  }
}

function ajaxStuff(leftHandSideColumnTable) {
  if (jQueryNotPresent()) { return; }
  // Detailed conflict information
  if (getValue('detailedConflictInfo')) {
    add(3, conflictInfo, [leftHandSideColumnTable]);
  }
  doGuildTracker();
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
  // eslint-disable-next-line no-unused-labels, no-labels
  devLbl: { //  guildXPLock
    add(3, guildXPLock);
  }
  add(3, activeMembers);

  if (calf.subcmd === 'manage') { manage(); }
  if (calf.subcmd === 'view') { injectViewGuild(); }
}

export default injectGuild;
//# sourceMappingURL=guild-21f41485.js.map
