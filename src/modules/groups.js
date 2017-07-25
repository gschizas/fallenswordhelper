import calf from './support/calf';
import getGroupStats from './ajax/getGroupStats';
import getMembrList from './ajax/getMembrList';
import getMercStats from './ajax/getMercStats';
import groupViewStats from './ajax/groupViewStats';
import * as dataObj from './support/dataObj';
import * as debug from './support/debug';
import * as layout from './support/layout';
import * as system from './support/system';

var maxGroupSizeToJoin;
var groupStats;

function parseMercStats(mercStats) { // Native
  groupStats.attackElement.innerHTML = '<span class="fshBlue">' +
    system.addCommas(groupStats.attack) + '</span>' +
    ' ( ' + system.addCommas(groupStats.attack - mercStats.attack) + ' )';
  groupStats.defenseElement.innerHTML = '<span class="fshBlue">' +
    system.addCommas(groupStats.defense) + '</span>' +
    ' ( ' + system.addCommas(groupStats.defense - mercStats.defense) + ' )';
  groupStats.armorElement.innerHTML = '<span class="fshBlue">' +
    system.addCommas(groupStats.armor) + '</span>' +
    ' ( ' + system.addCommas(groupStats.armor - mercStats.armor) + ' )';
  groupStats.damageElement.innerHTML = '<span class="fshBlue">' +
    system.addCommas(groupStats.damage) + '</span>' +
    ' ( ' + system.addCommas(groupStats.damage - mercStats.damage) + ' )';
  groupStats.hpElement.innerHTML = '<span class="fshBlue">' +
    system.addCommas(groupStats.hp) + '</span>' +
    ' ( ' + system.addCommas(groupStats.hp - mercStats.hp) + ' )';
}

export function injectGroupStats() { // jQuery
  groupStats = groupViewStats(document);
  getMercStats().done(parseMercStats);
}

function displayMinGroupLevel() { // jQuery
  var minGroupLevel = system.getValue('minGroupLevel');
  if (minGroupLevel) {
    $('#pCC > table > tbody > tr > td > table td').first()
      .append('<span style="color:blue"> ' +
      'Current Min Level Setting: ' + minGroupLevel + '</span>');
  }
}

function filterMercs(e) {return e.search('#000099') === -1;}

function joinGroup(groupJoinURL, joinButton) { // jQuery
  return $.get(groupJoinURL).done(function() {
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
      joinButton.parentNode.getAttribute('href'))[1];
    var groupJoinURL = 'index.php?cmd=guild&subcmd=groups&subcmd2=join' +
      '&group_id=' + groupID;
    prev.push(joinGroup(groupJoinURL, joinButton));
  }
  return prev;
}

function joinAllGroupsUnderSize() { // Legacy
  var joinButtons = system.findNodes(
    '//img[contains(@src,"skin/icon_action_join.gif")]');
  if (!joinButtons) {return;}
  var prm = joinButtons.reduce(doJoinUnderSize, []);
  $.when.apply($, prm).done(function() {
    location.href = 'index.php?cmd=guild&subcmd=groups';
  });
}

function parseGroupData(linkElement, obj) { // Native
  var extraText = '<table id="stat">' +
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

function fetchGroupData(evt) { // Native
  evt.target.classList.add('fshHide');
  var allItems = document.querySelectorAll('#pCC a[href*="=viewstats&"]');
  Array.prototype.forEach.call(allItems, function(aLink) {
    getGroupStats(aLink.href).done(parseGroupData.bind(null, aLink));
  });
}

function groupButtons() { // Legacy
  var buttonElement = system.findNode('//td[input[@value="Join All ' +
    'Available Groups"]]');
  var enableMaxGroupSizeToJoin =
    system.getValue('enableMaxGroupSizeToJoin');
  if (enableMaxGroupSizeToJoin) {
    maxGroupSizeToJoin = system.getValue('maxGroupSizeToJoin');
    var joinAllInput = buttonElement.firstChild.nextSibling.nextSibling;
    joinAllInput.classList.add('fshHide');
    buttonElement.innerHTML += '&nbsp;<input id="joinallgroupsunder' +
      'size" type="button" value="Join All Groups < ' +
      maxGroupSizeToJoin + ' Members" class="custombutton">&nbsp;' +
      '<input id="fetchgroupstats" type="button" value="Fetch ' +
      'Group Stats" class="custombutton">';
    document.getElementById('joinallgroupsundersize')
      .addEventListener('click', joinAllGroupsUnderSize, true);
  } else {
    buttonElement.innerHTML += '&nbsp;<input id="fetchgroupstats" ' +
      'type="button" value="Fetch Group Stats" class="custombutton">';
  }
  document.getElementById('fetchgroupstats')
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
  var month = dataObj.months.indexOf(x[3]);
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

function getCreator(membrlist, creator) { // Native
  if (membrlist[creator]) {
    return layout.onlineDot({last_login: membrlist[creator].last_login}) +
      '&nbsp;<a href="' + system.server + 'index.php?cmd=profile&player_id=' +
      membrlist[creator].id + '"><b>' + creator + '</b></a> [' +
      membrlist[creator].level + ']';
  }
  return '<b>' + creator + '</b>';
}

function memberLevel(membrlist, member) { // Native
  if (membrlist[member]) {return membrlist[member].level;}
  return 0;
}

function byMember(membrlist, a, b) { // Native
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
  if (buffList.length > 0) {td.append(layout.doBuffLinks(buffList));}
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

  debug.time('groups.doGroupPaint');

  $('#pCC table table table tr').has('.group-action-container')
    .each(function(i, e) {
      doGroupRow(e, m);
    });

  debug.timeEnd('groups.doGroupPaint');

}

export function injectGroups() { // jQuery
  getMembrList(false)
    .done(doGroupPaint);
  displayMinGroupLevel();
  groupButtons();
  fixTable();
}
