import calf from '../support/calf';
import doBuffLinks from '../common/doBuffLinks';
import findNode from '../system/findNode';
import findNodes from '../system/findNodes';
import {getElementById} from '../common/getElement';
import getGroupStats from '../ajax/getGroupStats';
import getMembrList from '../ajax/getMembrList';
import getValue from '../system/getValue';
import jQueryNotPresent from '../common/jQueryNotPresent';
import {months} from '../support/constants';
import {onlineDot} from '../common/colouredDots';
import retryAjax from '../ajax/retryAjax';
import {server} from '../system/system';
import {time, timeEnd} from '../support/debug';

var maxGroupSizeToJoin;

function displayMinGroupLevel() { // jQuery
  var minGroupLevel = getValue('minGroupLevel');
  if (minGroupLevel) {
    $('#pCC > table > tbody > tr > td > table td').first()
      .append('<span style="color:blue"> ' +
      'Current Min Level Setting: ' + minGroupLevel + '</span>');
  }
}

function filterMercs(e) {return e.search('#000099') === -1;}

function joinGroup(groupJoinURL, joinButton) { // jQuery
  return retryAjax(groupJoinURL).done(function() {
    joinButton.classList.add('fshHide');
  });
}

function doJoinUnderSize(prev, joinButton) { // Legacy
  var memList = joinButton.parentNode.parentNode.parentNode
    .previousSibling.previousSibling.previousSibling.previousSibling;
  var memListArrayWithMercs = memList.innerHTML.split(',');
  var memListArrayWithoutMercs = memListArrayWithMercs
    .filter(filterMercs);
  if (memListArrayWithoutMercs.length < maxGroupSizeToJoin) {
    var groupID = /javascript:confirmJoin\((\d+)\)/.exec(
      joinButton.parentNode.href)[1];
    var groupJoinURL = 'index.php?no_mobile=1&cmd=guild&subcmd=groups' +
      '&subcmd2=join&group_id=' + groupID;
    prev.push(joinGroup(groupJoinURL, joinButton));
  }
  return prev;
}

function joinAllGroupsUnderSize() { // Legacy
  var joinButtons = findNodes(
    '//img[contains(@src,"skin/icon_action_join.gif")]');
  if (!joinButtons) {return;}
  var prm = joinButtons.reduce(doJoinUnderSize, []);
  $.when.apply($, prm).done(function() {
    location.href = 'index.php?cmd=guild&subcmd=groups';
  });
}

function parseGroupData(linkElement, obj) {
  var extraText = '<table class="fshgrpstat">' +
    '<tr>' +
    '<td class="fshBrown">Attack</td>' +
    '<td class="fshRight">' + obj.attack + '</td>' +
    '<td class="fshBrown">Defense</td>' +
    '<td class="fshRight">' + obj.defense + '</td>' +
    '</tr><tr>' +
    '<td class="fshBrown">Armor</td>' +
    '<td class="fshRight">' + obj.armor + '</td>' +
    '<td class="fshBrown">Damage</td>' +
    '<td class="fshRight">' + obj.damage + '</td>' +
    '</tr><tr>' +
    '<td class="fshBrown">HP</td>' +
    '<td class="fshRight">' + obj.hp + '</td>' +
    '<td colspan="2"></td>' +
    '</tr></table>';
  var expiresLocation = linkElement.parentNode.parentNode
    .previousElementSibling;
  expiresLocation.insertAdjacentHTML('beforeend', extraText);
}

function fetchGroupData(evt) {
  evt.target.classList.add('fshHide');
  var allItems = document.querySelectorAll('#pCC a[href*="=viewstats&"]');
  Array.prototype.forEach.call(allItems, function(aLink) {
    getGroupStats(aLink.href).done(parseGroupData.bind(null, aLink));
  });
}

function groupButtons() { // Legacy
  var buttonElement = findNode('//td[input[@value="Join All ' +
    'Available Groups"]]');
  var enableMaxGroupSizeToJoin =
    getValue('enableMaxGroupSizeToJoin');
  if (enableMaxGroupSizeToJoin) {
    maxGroupSizeToJoin = getValue('maxGroupSizeToJoin');
    var joinAllInput = buttonElement.firstChild.nextSibling.nextSibling;
    joinAllInput.classList.add('fshHide');
    buttonElement.innerHTML += '&nbsp;<input id="joinallgroupsunder' +
      'size" type="button" value="Join All Groups < ' +
      maxGroupSizeToJoin + ' Members" class="custombutton">&nbsp;' +
      '<input id="fetchgroupstats" type="button" value="Fetch ' +
      'Group Stats" class="custombutton">';
    getElementById('joinallgroupsundersize')
      .addEventListener('click', joinAllGroupsUnderSize, true);
  } else {
    buttonElement.innerHTML += '&nbsp;<input id="fetchgroupstats" ' +
      'type="button" value="Fetch Group Stats" class="custombutton">';
  }
  getElementById('fetchgroupstats')
    .addEventListener('click', fetchGroupData);

  if (calf.subcmd2 === 'joinallgroupsundersize') {
    joinAllGroupsUnderSize();
  }
}

function fixTable() { // jQuery
  // Cows don't add!
  var tds = $('#pCC td.header-dark');
  tds.eq(0).attr('width', '20%');
  tds.eq(1).attr('width', '51%');
  tds.eq(2).attr('width', '22%');
  tds.eq(3).attr('width', '7%');
}

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
  if (listArr.length > 1) {listArr.sort(byMember.bind(null, membrlist));}
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

function doGroupPaint(m) { // jQuery

  time('groups.doGroupPaint');

  $('#pCC table table table tr').has('.group-action-container')
    .each(function(i, e) {
      doGroupRow(e, m);
    });

  timeEnd('groups.doGroupPaint');

}

export default function injectGroups() { // jQuery
  if (jQueryNotPresent()) {return;}
  getMembrList(false)
    .done(doGroupPaint);
  displayMinGroupLevel();
  groupButtons();
  fixTable();
}
