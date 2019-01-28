import csvSplit from '../../common/csvSplit';
import doBuffLinks from '../../common/doBuffLinks';
import onlineDot from '../../common/onlineDot';
import partial from '../../common/partial';
import {months, playerIdUrl} from '../../support/constants';
//#if _BETA  //  Timing output
import {time, timeEnd} from '../../support/debug';
//#endif

var xRE = /([a-zA-Z]+), (\d+) ([a-zA-Z]+) (\d+):(\d+):(\d+) UTC/;

function dateFromUTC(x, curYear) {
  var groupDate = new Date();
  groupDate.setUTCDate(x[2]);
  groupDate.setUTCMonth(months.indexOf(x[3]));
  groupDate.setUTCFullYear(curYear);
  groupDate.setUTCHours(x[4]);
  groupDate.setUTCMinutes(x[5]);
  return groupDate;
}

function groupLocalTime(row) { // jQuery
  var theDateCell = $('td', row).eq(2);
  var x = xRE.exec(theDateCell.text());
  var curYear = new Date().getFullYear(); // TODO Boundary condition
  theDateCell.append('<br><span class="fshBlue fshXSmall">' +
    'Local: ' + dateFromUTC(x, curYear).toString().substr(0, 21) + '</span>');
}

function creatorDotAndLink(membrlist, row) {
  var creator = $('b', row).text();
  if (membrlist[creator]) {
    return onlineDot({last_login: membrlist[creator].last_login}) +
      '&nbsp;<a href="' + playerIdUrl + membrlist[creator].id +
      '"><b>' + creator + '</b></a> [' + membrlist[creator].level + ']';
  }
  return '<b>' + creator + '</b>';
}

function getCreatorCell(membrlist, row) {
  var creatorCell = $('td', row).first();
  creatorCell.html(creatorDotAndLink(membrlist, row));
  return creatorCell;
}

function memberLevel(membrlist, member) {
  if (membrlist[member]) {return membrlist[member].level;}
  return 0;
}

function byMemberLevel(membrlist, a, b) {
  return memberLevel(membrlist, b) - memberLevel(membrlist, a);
}

function profileLink(membrlist, name) {
  if (!membrlist[name]) {return name;}
  return '<a href="' + playerIdUrl + membrlist[name].id + '">' + name + '</a>';
}

function groupMembers(membrlist, membersCell) {
  var listArr = csvSplit(membersCell.html());
  if (listArr.length > 1) {listArr.sort(partial(byMemberLevel, membrlist));}
  return listArr;
}

function ourMembers(name) {
  return name !== '[none]' && name.indexOf('<font') === -1;
}

function buffLinks(creatorCell, listArr) {
  var buffList = listArr.filter(ourMembers);
  if (buffList.length > 0) {creatorCell.append(doBuffLinks(buffList));}
  creatorCell.append('<span class="fshXSmall">Members: ' +
    buffList.length + '</span>');
}

function memberProfileLinks(membrlist, membersCell, listArr) {
  var memberLinks = listArr.map(partial(profileLink, membrlist));
  membersCell.html('<span>' + memberLinks.join(', ') + '</span>');
}

function doGroupRow(membrlist, i, row) { // jQuery
  var creatorCell = getCreatorCell(membrlist, row);
  var membersCell = $('td', row).eq(1);
  var listArr = groupMembers(membrlist, membersCell);
  buffLinks(creatorCell, listArr);
  memberProfileLinks(membrlist, membersCell, listArr);
  groupLocalTime(row);
}

export default function doGroupPaint(m) { // jQuery
  //#if _BETA  //  Timing output

  time('groups.doGroupPaint');

  //#endif
  $('#pCC table table table tr').has('.group-action-container')
    .each(partial(doGroupRow, m));
  //#if _BETA  //  Timing output

  timeEnd('groups.doGroupPaint');

  //#endif
}
