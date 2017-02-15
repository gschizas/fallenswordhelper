import calf from './support/calf';
import * as debug from './support/debug';
import * as dataObj from './support/dataObj';
import * as system from './support/system';
import * as layout from './support/layout';
import * as ajax from './support/ajax';

var maxGroupSizeToJoin;

function parseMercStats(responseText) { // jQuery
  var attackRE = /<td>Attack:<\/td><td>(\d+)<\/td>/;
  var defenseRE = /<td>Defense:<\/td><td>(\d+)<\/td>/;
  var armorRE = /<td>Armor:<\/td><td>(\d+)<\/td>/;
  var damageRE = /<td>Damage:<\/td><td>(\d+)<\/td>/;
  var hpRE = /<td>HP:<\/td><td>(\d+)<\/td>/;
  var mercPage = system.createDocument(responseText);
  var mercElements = $('#pCC img[src*="/merc/"][data-tipped]',
    mercPage);
  var totalMercAttack = 0;
  var totalMercDefense = 0;
  var totalMercArmor = 0;
  var totalMercDamage = 0;
  var totalMercHP = 0;
  var merc;
  for (var i = 0; i < mercElements.length; i += 1) {
    merc = mercElements[i];
    var mouseoverText = $(merc).data('tipped');
    var mercAttackValue = attackRE.exec(mouseoverText)[1] * 1;
    totalMercAttack += mercAttackValue;
    var mercDefenseValue = defenseRE.exec(mouseoverText)[1] * 1;
    totalMercDefense += mercDefenseValue;
    var mercArmorValue = armorRE.exec(mouseoverText)[1] * 1;
    totalMercArmor += mercArmorValue;
    var mercDamageValue = damageRE.exec(mouseoverText)[1] * 1;
    totalMercDamage += mercDamageValue;
    var mercHPValue = hpRE.exec(mouseoverText)[1] * 1;
    totalMercHP += mercHPValue;
  }
  var attackValue = $('#fshAtk');
  attackValue.html(system.addCommas(system.intValue(
    attackValue.text()) - Math.round(totalMercAttack * 0.2)));
  var defenseValue = $('#fshDef');
  defenseValue.html(system.addCommas(system.intValue(
    defenseValue.text()) - Math.round(totalMercDefense * 0.2)));
  var armorValue = $('#fshArm');
  armorValue.html(system.addCommas(system.intValue(
    armorValue.text()) - Math.round(totalMercArmor * 0.2)));
  var damageValue = $('#fshDam');
  damageValue.html(system.addCommas(system.intValue(
    damageValue.text()) - Math.round(totalMercDamage * 0.2)));
  var hpValue = $('#fshHP');
  hpValue.html(system.addCommas(system.intValue(
    hpValue.text()) - Math.round(totalMercHP * 0.2)));
}

export function injectGroupStats() { // jQuery
  var attackValueElement = $('#stat-attack');
  attackValueElement.html(
    '<span class="fshBlue">' + attackValueElement.text() + '</span>' +
    ' ( <span id="fshAtk">' + attackValueElement.text() + '</span> )'
  );
  var defenseValueElement = $('#stat-defense');
  defenseValueElement.html(
    '<span class="fshBlue">' + defenseValueElement.text() + '</span>' +
    ' ( <span id="fshDef">' + defenseValueElement.text() + '</span> )'
  );
  var armorValueElement = $('#stat-armor');
  armorValueElement.html(
    '<span class="fshBlue">' + armorValueElement.text() + '</span>' +
    ' ( <span id="fshArm">' + armorValueElement.text() + '</span> )'
  );
  var damageValueElement = $('#stat-damage');
  damageValueElement.html(
    '<span class="fshBlue">' + damageValueElement.text() + '</span>' +
    ' ( <span id="fshDam">' + damageValueElement.text() + '</span> )'
  );
  var hpValueElement = $('#stat-hp');
  hpValueElement.html(
    '<span class="fshBlue">' + hpValueElement.text() + '</span>' +
    ' ( <span id="fshHP">' + hpValueElement.text() + '</span> )'
  );
  system.xmlhttp('index.php?cmd=guild&subcmd=mercs', parseMercStats);
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

function joinAllGroupsUnderSize() { // Legacy
  var joinButtons = system.findNodes(
    '//img[contains(@src,"skin/icon_action_join.gif")]');
  if (!joinButtons) {return;}
  var prm = [];
  for (var i = 0; i < joinButtons.length; i += 1) {
    var joinButton = joinButtons[i];
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
      prm.push(joinGroup(groupJoinURL, joinButton));
    }
  }
  $.when.apply($, prm).done(function() {
    location.href = 'index.php?cmd=guild&subcmd=groups';
  });
}

function parseGroupData(responseText, linkElement) { // Legacy
  var attackValue;
  var defenseValue;
  var armorValue;
  var damageValue;
  var hpValue;
  var doc=system.createDocument(responseText);
  var allItems = doc.getElementsByTagName('TD');

  for (var i=0;i<allItems.length;i += 1) {
    var anItem=allItems[i];
    if (anItem.innerHTML === '<font color="#333333">Attack:&nbsp;</font>'){
      var attackLocation = anItem.nextSibling;
      attackValue = attackLocation.textContent;
    }
    if (anItem.innerHTML === '<font color="#333333">Defense:&nbsp;</font>'){
      var defenseLocation = anItem.nextSibling;
      defenseValue = defenseLocation.textContent;
    }
    if (anItem.innerHTML === '<font color="#333333">Armor:&nbsp;</font>'){
      var armorLocation = anItem.nextSibling;
      armorValue = armorLocation.textContent;
    }
    if (anItem.innerHTML === '<font color="#333333">Damage:&nbsp;</font>'){
      var damageLocation = anItem.nextSibling;
      damageValue = damageLocation.textContent;
    }
    if (anItem.innerHTML === '<font color="#333333">HP:&nbsp;</font>'){
      var hpLocation = anItem.nextSibling;
      hpValue = hpLocation.textContent;
    }
  }
  var extraText = '<table cellpadding="1" style="font-size:x-small; ' +
    'border-top:2px black solid; border-spacing: 1px; ' +
    'border-collapse: collapse;">';
  extraText += '<tr>';
  extraText += '<td style="color:brown;">Attack</td><td align="right">' +
    attackValue + '</td>';
  extraText += '<td style="color:brown;">Defense</td><td align="right">' +
    defenseValue + '</td></tr>';
  extraText += '<tr>';
  extraText += '<td style="color:brown;">Armor</td><td align="right">' +
    armorValue + '</td>';
  extraText += '<td style="color:brown;">Damage</td><td align="right">' +
    damageValue + '</td></tr>';
  extraText += '<tr>';
  extraText += '<td style="color:brown;">HP</td><td align="right">' +
    hpValue + '</td>';
  extraText += '<td colspan="2"></td></tr>';
  extraText += '</table>';
  var expiresLocation = linkElement.parentNode.parentNode.previousSibling
    .previousSibling;
  expiresLocation.innerHTML += extraText;
}

function fetchGroupData() { // Legacy
  var calcButton = system.findNode('//input[@id="fetchgroupstats"]');
  calcButton.style.display = 'none';
  var allItems = system.findNodes(
    '//a[contains(@href,"index.php?cmd=guild&subcmd=groups' +
    '&subcmd2=viewstats&group_id=")]/img');
  for (var i=0; i<allItems.length; i += 1) {
    system.xmlhttp(allItems[i].parentNode.getAttribute('href'),
      parseGroupData, allItems[i].parentNode);
  }
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
    .addEventListener('click', fetchGroupData, true);

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
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
    'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
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
    'Local: ' + groupDate.toString().substr(0,21)+'</span>');
}

function doGroupRow(e, m) { // jQuery
  var creator = $('b', e).text();
  var td = $('td', e).first();
  var inject = '';
  if (m[creator]) {
    inject += layout.onlineDot({last_login: m[creator].last_login}) +
      '&nbsp;<a href="' + system.server +
      'index.php?cmd=profile&player_id=' + m[creator].id + '">' + td.html() +
      '</a>' + ' [' + m[creator].level + ']';
  } else {inject += td.html();}
  var td2 = $('td', e).eq(1);
  var theList = td2.html();
  var listArr = theList.split(', ');
  if (listArr.length > 1) {
    listArr.sort(function(a, b) {
      return (m[b] ? m[b].level : 0) - (m[a] ? m[a].level : 0);
    });
  }
  var countMembers = 0;
  var buffList = [];
  listArr.forEach(function(v, i, a) {
    if (v.indexOf('<font') !== -1) {return;}
    countMembers += 1;
    buffList[Math.floor(i / 16)] = buffList[Math.floor(i / 16)] || [];
    buffList[Math.floor(i / 16)].push(v);
    if (!m[v]) {return;}
    a[i] = ' <a href="index.php?cmd=profile&player_id=' +
      m[v].id + '">' + v + '</a>';
  });
  buffList.forEach(function(v, i) {
    inject += '<br><a href=\'' + layout.buffAllHref(v) +
      '\'><span style="color:blue; font-size:x-small;" title="Quick ' +
      'buff functionality from HCS only does 16">Buff ' +
      dataObj.places[i] + ' 16</span></a>';
  });
  td.html(inject + '<br><span style="font-size:x-small;">Members: ' +
    countMembers + '</span>');
  td2.html('<span>' + listArr.join(', ') + '</span>');
  groupLocalTime($('td', e).eq(2));
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
  ajax.getMembrList(false)
    .done(doGroupPaint);
  displayMinGroupLevel();
  groupButtons();
  fixTable();
}
