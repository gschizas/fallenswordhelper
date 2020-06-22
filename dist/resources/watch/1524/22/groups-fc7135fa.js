import { aX as time, s as partial, aY as timeEnd, aI as months, a1 as playerIdUrl, f as insertHtmlBeforeEnd, i as insertElement, o as onclick, E as querySelectorArray, D as querySelector, G as getValue, c as calf, bT as defJoinallgroupsundersize, A as setInnerHtml, u as indexAjaxData, B as getText, b as createDiv, W as sendEvent, x as jQueryNotPresent } from './calfSystem-995e3482.js';
import { c as createInput } from './createInput-8a491535.js';
import { o as onlineDot } from './onlineDot-266f3d0e.js';
import './currentGuildId-8e64bbe5.js';
import './intValue-0c980717.js';
import './fshOpen-301221f8.js';
import './openQuickBuffByName-791e4b36.js';
import './createUl-c8d7910b.js';
import './idb-ece4ba5b.js';
import './createButton-44149c43.js';
import './createLi-76d02a08.js';
import { h as hideElement } from './hideElement-26ab0eda.js';
import './indexAjaxJson-f24b8c24.js';
import './cmdExport-b739eae1.js';
import { c as csvSplit } from './csvSplit-40bd9bbc.js';
import { g as getMembrList } from './getMembrList-1de8624c.js';
import { d as doBuffLinks, g as getGroupStats } from './getGroupStats-aecd2103.js';
import './groupViewStats-57b69670.js';

const xRE = /([a-zA-Z]+), (\d+) ([a-zA-Z]+) (\d+):(\d+):(\d+) UTC/;

function dateFromUTC(x, curYear) {
  const groupDate = new Date();
  groupDate.setUTCDate(x[2]);
  groupDate.setUTCMonth(months.indexOf(x[3]));
  groupDate.setUTCFullYear(curYear);
  groupDate.setUTCHours(x[4]);
  groupDate.setUTCMinutes(x[5]);
  return groupDate;
}

function groupLocalTime(row) { // jQuery
  const theDateCell = $('td', row).eq(2);
  const x = xRE.exec(theDateCell.text());
  const curYear = new Date().getFullYear(); // TODO Boundary condition
  theDateCell.append(`<br><span class="fshBlue fshXSmall">Local: ${
    dateFromUTC(x, curYear).toString().substr(0, 21)}</span>`);
}

function creatorDotAndLink(membrlist, row) {
  const creator = $('b', row).text();
  if (membrlist[creator]) {
    return `${onlineDot({ last_login: membrlist[creator].last_login })
    }&nbsp;<a href="${playerIdUrl}${membrlist[creator].id
    }"><b>${creator}</b></a> [${membrlist[creator].level}]`;
  }
  return `<b>${creator}</b>`;
}

function getCreatorCell(membrlist, row) {
  const creatorCell = $('td', row).first();
  creatorCell.html(creatorDotAndLink(membrlist, row));
  return creatorCell;
}

function memberLevel(membrlist, member) {
  if (membrlist[member]) { return membrlist[member].level; }
  return 0;
}

function byMemberLevel(membrlist, a, b) {
  return memberLevel(membrlist, b) - memberLevel(membrlist, a);
}

function profileLink(membrlist, name) {
  if (!membrlist[name]) { return name; }
  return `<a href="${playerIdUrl}${membrlist[name].id}">${name}</a>`;
}

function groupMembers(membrlist, membersCell) {
  const listArr = csvSplit(membersCell.html());
  if (listArr.length > 1) { listArr.sort(partial(byMemberLevel, membrlist)); }
  return listArr;
}

function ourMembers(name) {
  return name !== '[none]' && name.indexOf('<font') === -1;
}

function buffLinks(creatorCell, listArr) {
  const buffList = listArr.filter(ourMembers);
  if (buffList.length > 0) { creatorCell.append(doBuffLinks(buffList)); }
  creatorCell.append(`<span class="fshXSmall">Members: ${
    buffList.length}</span>`);
}

function memberProfileLinks(membrlist, membersCell, listArr) {
  const memberLinks = listArr.map(partial(profileLink, membrlist));
  membersCell.html(`<span>${memberLinks.join(', ')}</span>`);
}

function doGroupRow(membrlist, i, row) { // jQuery
  const creatorCell = getCreatorCell(membrlist, row);
  const membersCell = $('td', row).eq(1);
  const listArr = groupMembers(membrlist, membersCell);
  buffLinks(creatorCell, listArr);
  memberProfileLinks(membrlist, membersCell, listArr);
  groupLocalTime(row);
}

function doGroupPaint(m) { // jQuery
  // eslint-disable-next-line no-unused-labels, no-labels
  betaLbl: { //  Timing output
    time('groups.doGroupPaint');
  }
  $('#pCC table table table tr').has('.group-action-container')
    .each(partial(doGroupRow, m));
  // eslint-disable-next-line no-unused-labels, no-labels
  betaLbl: { //  Timing output
    timeEnd('groups.doGroupPaint');
  }
}

function addButton(target, val) {
  const theButton = createInput({
    className: 'custombutton',
    type: 'button',
    value: val,
  });
  insertHtmlBeforeEnd(target, '&nbsp;');
  insertElement(target, theButton);
  return theButton;
}

var undefined$1 = undefined;

function parseGroupData(linkElement, obj) {
  const extraText = '<table class="fshgrpstat">'
    + '<tr>'
    + '<td class="fshBrown">Attack</td>'
    + `<td class="fshRight">${obj.attack}</td>`
    + '<td class="fshBrown">Defense</td>'
    + `<td class="fshRight">${obj.defense}</td>`
    + '</tr><tr>'
    + '<td class="fshBrown">Armor</td>'
    + `<td class="fshRight">${obj.armor}</td>`
    + '<td class="fshBrown">Damage</td>'
    + `<td class="fshRight">${obj.damage}</td>`
    + '</tr><tr>'
    + '<td class="fshBrown">HP</td>'
    + `<td class="fshRight">${obj.hp}</td>`
    + '<td colspan="2"></td>'
    + '</tr></table>';
  const expiresLocation = linkElement.parentNode.parentNode
    .previousElementSibling;
  insertHtmlBeforeEnd(expiresLocation, extraText);
}

function thisLink(aLink) {
  getGroupStats(aLink.href).then(partial(parseGroupData, aLink));
}

function fetchGroupData(evt) {
  // eslint-disable-next-line no-param-reassign
  evt.target.disabled = true;
  querySelectorArray('#pCC a[href*="=viewstats&"]').forEach(thisLink);
}

function fetchGroupStatsButton(buttonRow) {
  const fetchStats = addButton(buttonRow, 'Fetch Group Stats');
  onclick(fetchStats, fetchGroupData);
}

let maxGroupSizeToJoin;

function filterMercs(e) { return !e.includes('#000099'); }

function joined(container) {
  setInnerHtml('<span class="fshXSmall fshBlue" '
    + 'style="line-height: 19px;">Joined</span>', container);
}

function joinGroup(groupID, container) { // jQuery.min
  indexAjaxData({
    cmd: 'guild',
    subcmd: 'groups',
    subcmd2: 'join',
    group_id: groupID,
  }).then(partial(joined, container));
}

function doJoinUnderSize(joinButton) {
  const memList = joinButton.parentNode.parentNode.parentNode.cells[1];
  const memListArrayWithMercs = csvSplit(getText(memList));
  const memListArrayWithoutMercs = memListArrayWithMercs
    .filter(filterMercs);
  if (memListArrayWithoutMercs.length < maxGroupSizeToJoin) {
    const container = createDiv({
      className: 'group-action-link fshRelative',
      innerHTML: '<span class="fshSpinner fshSpinner12"></span>',
      style: { height: '19px', width: '19px' },
    });
    joinButton.parentNode.replaceChild(container, joinButton);
    const groupID = /confirmJoin\((\d+)\)/.exec(joinButton.href)[1];
    joinGroup(groupID, container);
  }
}

function joinAllGroupsUnderSize() {
  sendEvent('groups', 'joinAllGroupsUnderSize');
  querySelectorArray('#pCC a[href*="confirmJoin"]').forEach(doJoinUnderSize);
}

function joinUnderButton(buttonRow) {
  const joinUnder = addButton(buttonRow,
    `Join All Groups < ${maxGroupSizeToJoin} Members`);
  onclick(joinUnder, joinAllGroupsUnderSize);
}

function groupButtons() {
  const joinAll = querySelector('#pCC input[value="Join All Available Groups"]');
  const buttonRow = joinAll.parentNode;
  const enableMaxGroupSizeToJoin = getValue('enableMaxGroupSizeToJoin');
  if (enableMaxGroupSizeToJoin) {
    maxGroupSizeToJoin = getValue('maxGroupSizeToJoin');
    hideElement(joinAll);
    joinUnderButton(buttonRow);
  }

  fetchGroupStatsButton(buttonRow);

  if (calf.subcmd2 === defJoinallgroupsundersize) {
    joinAllGroupsUnderSize();
  }
}

function displayMinGroupLevel() { // jQuery
  const minGroupLevel = getValue('minGroupLevel');
  if (minGroupLevel) {
    $('#pCC > table > tbody > tr > td > table td').first()
      .append(`<span style="color:blue"> Current Min Level Setting: ${
        minGroupLevel}</span>`);
  }
}

function fixTable() { // jQuery
  // Cows don't add!
  const tds = $('#pCC td.header-dark');
  tds.eq(0).attr('width', '20%');
  tds.eq(1).attr('width', '51%');
  tds.eq(2).attr('width', '22%');
  tds.eq(3).attr('width', '7%');
}

function injectGroups() { // jQuery
  if (jQueryNotPresent()) { return; }
  getMembrList(false).then(doGroupPaint);
  displayMinGroupLevel();
  groupButtons();
  fixTable();
}

export default injectGroups;
//# sourceMappingURL=groups-fc7135fa.js.map
