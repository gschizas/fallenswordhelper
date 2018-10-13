import doBuffLinks from '../common/doBuffLinks';
import {months} from '../support/constants';
import {onlineDot} from '../common/colouredDots';
import partial from '../common/partial';
import {server} from '../system/system';
import {time, timeEnd} from '../support/debug';

function groupLocalTime(theDateCell) { // jQuery
  var xRE = /([a-zA-Z]+), (\d+) ([a-zA-Z]+) (\d+):(\d+):(\d+) UTC/;
  var x = xRE.exec(theDateCell.text());
  var month = months.indexOf(x[3]);
  var curYear = new Date().getFullYear(); // Boundary condition
  var groupDate = new Date();
  groupDate.setUTCDate(x[2]);
  groupDate.setUTCMonth(month);
  groupDate.setUTCFullYear(curYear);
  groupDate.setUTCHours(x[4]);
  groupDate.setUTCMinutes(x[5]);
  theDateCell.append('<br><span style="color:blue; font-size:x-small">' +
    'Local: ' + groupDate.toString().substr(0, 21) + '</span>');
}

function getCreator(membrlist, creator) {
  if (membrlist[creator]) {
    return onlineDot({last_login: membrlist[creator].last_login}) +
      '&nbsp;<a href="' + server + 'index.php?cmd=profile&player_id=' +
      membrlist[creator].id + '"><b>' + creator + '</b></a> [' +
      membrlist[creator].level + ']';
  }
  return '<b>' + creator + '</b>';
}

function memberLevel(membrlist, member) {
  if (membrlist[member]) {return membrlist[member].level;}
  return 0;
}

function byMember(membrlist, a, b) {
  return memberLevel(membrlist, b) - memberLevel(membrlist, a);
}

function doGroupRow(row, membrlist) { // jQuery
  var creator = $('b', row).text();
  var td = $('td', row).first();
  td.html(getCreator(membrlist, creator));
  var td2 = $('td', row).eq(1);
  var theList = td2.html();
  var listArr = theList.split(', ');
  if (listArr.length > 1) {listArr.sort(partial(byMember, membrlist));}
  var buffList = listArr.filter(function(name) {
    return name !== '[none]' && name.indexOf('<font') === -1;
  });
  if (buffList.length > 0) {td.append(doBuffLinks(buffList));}
  td.append('<span class="fshXSmall">Members: ' +
    buffList.length + '</span>');
  listArr = listArr.map(function(name) {
    if (!membrlist[name]) {return name;}
    return '<a href="index.php?cmd=profile&player_id=' +
      membrlist[name].id + '">' + name + '</a>';
  });
  td2.html('<span>' + listArr.join(', ') + '</span>');
  groupLocalTime($('td', row).eq(2));
}

export default function doGroupPaint(m) { // jQuery

  time('groups.doGroupPaint');

  $('#pCC table table table tr').has('.group-action-container')
    .each(function(i, e) {
      doGroupRow(e, m);
    });

  timeEnd('groups.doGroupPaint');

}
