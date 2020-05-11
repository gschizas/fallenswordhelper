import csvSplit from '../../common/csvSplit';
import doBuffLinks from '../../common/doBuffLinks';
import onlineDot from '../../common/onlineDot';
import partial from '../../common/partial';
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

export default function doGroupPaint(m) { // jQuery
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
