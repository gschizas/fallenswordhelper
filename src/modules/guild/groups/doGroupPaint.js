import closestTr from '../../common/closestTr';
import csvSplit from '../../common/csvSplit';
import doBuffLinks from '../../common/doBuffLinks';
import getArrayByClassName from '../../common/getArrayByClassName';
import getText from '../../common/getText';
import insertElement from '../../common/insertElement';
import insertHtmlBeforeEnd from '../../common/insertHtmlBeforeEnd';
import onlineDot from '../../common/onlineDot';
import partial from '../../common/partial';
import setInnerHtml from '../../dom/setInnerHtml';
import { months, playerIdUrl } from '../../support/constants';
import { time, timeEnd } from '../../support/debug';

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

function groupLocalTime(row) {
  const theDateCell = row.cells[3];
  const x = xRE.exec(getText(theDateCell));
  const curYear = new Date().getFullYear(); // TODO Boundary condition
  insertHtmlBeforeEnd(theDateCell, `<br><span class="fshBlue fshXSmall">Local: ${
    dateFromUTC(x, curYear).toString().substr(0, 21)}</span>`);
}

function creatorDotAndLink(membrlist, creatorCell) {
  const creator = getText(creatorCell.children[0]);
  if (membrlist[creator]) {
    return `${onlineDot({ last_login: membrlist[creator].last_login })}&nbsp;<a href="${
      playerIdUrl}${membrlist[creator].id}"><b>${creator}</b></a> [${membrlist[creator].level}]`;
  }
  return `<b>${creator}</b>`;
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
  const listArr = csvSplit(membersCell.innerHTML);
  if (listArr.length > 1) { listArr.sort(partial(byMemberLevel, membrlist)); }
  return listArr;
}

function ourMembers(name) {
  return name !== '[none]' && name.indexOf('<font') === -1;
}

function buffLinks(creatorCell, listArr) {
  const buffList = listArr.filter(ourMembers);
  if (buffList.length > 0) { insertElement(creatorCell, doBuffLinks(buffList)); }
  insertHtmlBeforeEnd(creatorCell, `<span class="fshXSmall">Members: ${buffList.length}</span>`);
}

function memberProfileLinks(membrlist, membersCell, listArr) {
  const memberLinks = listArr.map(partial(profileLink, membrlist));
  setInnerHtml(`<span>${memberLinks.join(', ')}</span>`, membersCell);
}

function doGroupRow(membrlist, row) {
  const creatorCell = row.cells[0];
  setInnerHtml(creatorDotAndLink(membrlist, creatorCell), creatorCell);
  const membersCell = row.cells[1];
  const listArr = groupMembers(membrlist, membersCell);
  buffLinks(creatorCell, listArr);
  memberProfileLinks(membrlist, membersCell, listArr);
  groupLocalTime(row);
}

export default function doGroupPaint(membrlist) {
  // eslint-disable-next-line no-unused-labels, no-labels
  betaLbl: { //  Timing output
    time('groups.doGroupPaint');
  }
  getArrayByClassName('group-action-container')
    .map((c) => closestTr(c))
    .forEach(partial(doGroupRow, membrlist));
  // eslint-disable-next-line no-unused-labels, no-labels
  betaLbl: { //  Timing output
    timeEnd('groups.doGroupPaint');
  }
}
