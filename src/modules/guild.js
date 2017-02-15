import * as debug from './support/debug';
import * as task from './support/task';
import * as system from './support/system';
import * as layout from './support/layout';
import * as ajax from './support/ajax';

var leftHandSideColumnTable;
var members;
var memCount;

function removeGuildAvyImgBorder() { // Native
  document.querySelector('#pCC img[oldtitle$="\'s Logo"]')
    .removeAttribute('style');
}

function guildXPLock() { // Native
  var xpLock = document
    .querySelector('#pCC a[data-tipped^="<b>Guild XP</b>"]');
  if (!xpLock) {return;}
  var xpLockmouseover = xpLock.getAttribute('data-tipped');
  var xpLockXP = system.getIntFromRegExp(xpLockmouseover,
    /XP Lock: <b>(\d*)/);
  var actualXP = system.getIntFromRegExp(xpLockmouseover,
    /XP: <b>(\d*)/);
  if (actualXP < xpLockXP) {
    xpLock.parentNode.nextElementSibling.insertAdjacentHTML('beforeend',
      ' (<b>' + system.addCommas(xpLockXP - actualXP) + '</b>)');
  }
}

export function injectViewGuild() { // Native
  task.add(3, layout.colouredDots);
  removeGuildAvyImgBorder();
  guildXPLock();
  var highlightPlayersNearMyLvl =
    system.getValue('highlightPlayersNearMyLvl');
  var highlightGvGPlayersNearMyLvl =
    system.getValue('highlightGvGPlayersNearMyLvl');
  if (!highlightPlayersNearMyLvl && !highlightGvGPlayersNearMyLvl) {return;}
  var levelToTest = system.intValue(document.getElementsByClassName(
    'stat-level')[0].nextElementSibling.textContent);
  var characterVirtualLevel = system.getValue('characterVirtualLevel');
  if (characterVirtualLevel) {levelToTest = characterVirtualLevel;}
  var memList = document.querySelectorAll(
    '#pCC a[data-tipped*="<td>VL:</td>"]');
  Array.prototype.forEach.call(memList, function(el) {
    var tipped = el.getAttribute('data-tipped');
    var vlevel = /VL:.+?(\d+)/.exec(tipped)[1];
    var aRow = el.parentNode.parentNode;
    if (highlightPlayersNearMyLvl &&
        Math.abs(vlevel - levelToTest) <= (levelToTest <= 205 ? 5 : 10)) {
      aRow.classList.add('lvlHighlight');
    } else if (highlightGvGPlayersNearMyLvl &&
        Math.abs(vlevel - levelToTest) <=
        (levelToTest <= 300 ? 25 : levelToTest <= 700 ? 50 : 100)) {
      aRow.classList.add('lvlGvGHighlight');
    }
  });
}

function gotConflictInfo(responseText, callback) { // Legacy
  var insertHere = callback.node;
  var doc = system.createDocument(responseText);

  var page = system.findNode('//td[contains(.,"Page:")]', doc);
  var curPage = parseInt(system.findNode('//input[@name="page"]',
    doc).value,10);
  var maxPage = page.innerHTML.match(/of&nbsp;(\d*)/);

  var conflictTable = system.findNode(
    '//font[contains(.,"Participants")]/ancestor::table[1]', doc);
  if (conflictTable && conflictTable.rows.length > 3) {
    if (curPage === 1) {
      var newNode = insertHere.insertRow(insertHere.rows.length-2);
      newNode.insertCell(0);
      newNode.insertCell(0);
      newNode.cells[0].innerHTML =
        '<a href="index.php?cmd=guild&subcmd=conflicts">Active Conflicts</a>';
      newNode.cells[1].innerHTML = 'Score';
    }
    for (var i = 1; i <= conflictTable.rows.length - 4; i+=2) {
      var newRow = insertHere.insertRow(insertHere.rows.length-2);
      newRow.insertCell(0);
      newRow.insertCell(0);
      newRow.cells[0].innerHTML = conflictTable.rows[i].cells[0].innerHTML;
      newRow.cells[1].innerHTML = '<b>' + conflictTable.rows[i].cells[6]
        .innerHTML + '</b>';
    }
  }
  if (maxPage && parseInt(maxPage[1],10) > curPage) {
    system.xmlhttp(
      'index.php?cmd=guild&subcmd=conflicts&subcmd2=&page=' +
      (curPage + 1) + '&search_text=',
      gotConflictInfo,
      {'node': callback.node});
  }
}

function conflictInfo() { // jQuery
  $.get('index.php?cmd=guild&subcmd=conflicts').done(function(data) {
    gotConflictInfo(data,
      {node: document.getElementById('statisticsControl')});
  });
}

function logoToggle() { // Native
  var changeLogoCell = leftHandSideColumnTable.rows[0].cells[1].firstChild;
  changeLogoCell.insertAdjacentHTML('beforeend', '[ <span class="fshLink' +
    ' tip-static" id="toggleGuildLogoControl" ' +
    'linkto="guildLogoControl" data-tipped="Toggle Section">X</span> ]');
  var guildLogoElement = leftHandSideColumnTable.rows[2].cells[0]
    .firstChild.nextSibling;
  guildLogoElement.id = 'guildLogoControl';
  if (system.getValue('guildLogoControl')) {
    guildLogoElement.classList.add('fshHide');
  }
  document.getElementById('toggleGuildLogoControl')
    .addEventListener('click', system.toggleVisibilty);
}

function statToggle() { // Native
  var leaveGuildCell = leftHandSideColumnTable.rows[4].cells[1].firstChild;
  leaveGuildCell.insertAdjacentHTML('beforeend', '<span class="fshNoWrap">' +
    '[ <span class="fshLink tip-static" id="toggleStatisticsControl" ' +
    'linkto="statisticsControl" data-tipped="Toggle Section">X</span> ]' +
    '</span>');
  var statisticsControlElement = leftHandSideColumnTable.rows[6].cells[0]
    .firstChild.nextSibling;
  statisticsControlElement.id = 'statisticsControl';
  if (system.getValue('statisticsControl')) {
    statisticsControlElement.classList.add('fshHide');
  }
  document.getElementById('toggleStatisticsControl')
    .addEventListener('click', system.toggleVisibilty);
}

function structureToggle() { // Native
  var buildCell = leftHandSideColumnTable.rows[15].cells[1].firstChild;
  buildCell.insertAdjacentHTML('beforeend', '[ <span class="fshLink ' +
    'tip-static" id="toggleGuildStructureControl" ' +
    'linkto="guildStructureControl" data-tipped="Toggle Section">X</span> ]');
  var guildStructureControlElement = leftHandSideColumnTable.rows[17]
    .cells[0].firstChild.nextSibling;
  guildStructureControlElement.id = 'guildStructureControl';
  if (system.getValue('guildStructureControl')) {
    guildStructureControlElement.classList.add('fshHide');
  }
  document.getElementById('toggleGuildStructureControl')
    .addEventListener('click', system.toggleVisibilty);
}

function batchBuffLinks() { // Native
  var limit = performance.now() + 5;
  while (performance.now() < limit && memCount < members.length) {
    members[memCount].parentNode.insertAdjacentHTML('beforeend',
      ' <span class="smallLink">[b]</span>');
    memCount += 1;
  }
  if (memCount < members.length) {
    task.add(3, batchBuffLinks);
  }
}

function buffLinks() { // Native
  // TODO preference
  memCount = 0;
  members = document.querySelectorAll(
    '#pCC a[href^="index.php?cmd=profile&player_id="]');
  task.add(3, batchBuffLinks);
  document.getElementById('pCC').addEventListener('click', function(evt) {
    if (evt.target.className !== 'smallLink') {return;}
    window.openWindow('index.php?cmd=quickbuff&t=' + evt.target
      .previousElementSibling.text, 'fsQuickBuff', 618, 1000, ',scrollbars');
  });
}

function selfRecall() { // Native
  // self recall
  var getLi = leftHandSideColumnTable.getElementsByTagName('LI');
  var selfRecall = getLi[getLi.length - 1].parentNode;
  selfRecall.insertAdjacentHTML('beforeend',
    '<li><a href="index.php?cmd=guild&subcmd=inventory&subcmd2=report&' +
    'user=' + layout.playerName() +
    '" class="tip-static" data-tipped="Self Recall">Self Recall</a></li>');
}

export function injectGuild() { // Native
  task.add(3, layout.colouredDots);
  task.add(3, removeGuildAvyImgBorder);
  task.add(3, guildXPLock);
  leftHandSideColumnTable = document.getElementById('pCC')
    .lastElementChild.rows[2].cells[0].firstElementChild;
  task.add(3, logoToggle);
  task.add(3, statToggle);
  task.add(3, structureToggle);
  task.add(3, buffLinks);
  task.add(3, selfRecall);

  //Detailed conflict information
  if (system.getValue('detailedConflictInfo')) {
    task.add(3, conflictInfo);
  }

}

function recallGuildStoreItemReturnMessage(responseText, callback) { // Legacy
  var target = callback.target;
  var info = layout.infoBox(responseText);
  var itemCellElement = target.parentNode;
  if (info.search('You successfully took the item into your backpack') !==
      -1) {
    itemCellElement.innerHTML =
      '<span style="color:green; font-weight:bold;">Taken</span>';
  } else if (info!=='') {
    itemCellElement.innerHTML =
      '<span style="color:red; font-weight:bold;">Error:' + info + '</span>';
  } else {
    itemCellElement.innerHTML = 'Weird Error: check the Tools>Error Console';
    debug.log('Post the previous HTML and the following message to the ' +
    'GitHub or to the forum to help us debug this error');
    debug.log(callback.url);
  }
}

function recallGuildStoreItem(evt) { // Legacy
  var guildStoreID=evt.target.getAttribute('itemID');
  var recallHref =
    'index.php?cmd=guild&subcmd=inventory&subcmd2=takeitem&guildstore_id=' +
    // guildStoreID + '&ajax=1'; // TODO
    guildStoreID;
  system.xmlhttp(recallHref,
    recallGuildStoreItemReturnMessage,
    {'item': guildStoreID, 'target': evt.target, 'url': recallHref});
}

export function injectGuildAddTagsWidgets() { // Legacy
  var itemTable = system.findNode(
    '//img[contains(@src,"/items/")]/ancestor::table[1]');
  if (itemTable) {
    for (var i=1;i<itemTable.rows.length;i += 1) {
      var aRow = itemTable.rows[i];
      if (aRow.cells[2]) { // itemRow
        var itemId = aRow.cells[0].firstChild.getAttribute('value');
        aRow.cells[2].innerHTML += '&nbsp;<span style="cursor:pointer; ' +
          'text-decoration:underline; color:blue;" itemID="' + itemId +
          '">Fast BP</span>';
        var itemRecall = aRow.cells[2].firstChild.nextSibling;
        itemRecall.addEventListener('click', recallGuildStoreItem);
      }
    }
  }
  $('b:contains("100 x Item Level")').closest('tr').next()
    .children('td:first')
    .append('<input type="button" id="fshCheckAlTag" value="Check All">');
  $('#fshCheckAlTag').click(function() {
    $('input[name*=tagIndex]').each(function() {
      this.click();
    });
  });
}

function updateHistoryCharacters() { // Legacy
  var textArea = system.findNode('//textarea[@id="textInputBox"]');
  var previewArea = system.findNode('//span[@findme="biopreview"]');
  var bioPreviewHTML = system.convertTextToHtml(textArea.value);
  previewArea.innerHTML = bioPreviewHTML;
}

export function addHistoryWidgets() { // Legacy
  var textArea = system.findNode('//textarea[@name="history"]');
  if (!textArea) {return;}
  textArea.value = textArea.value.replace(/<br \/>/ig,'');
  var textAreaDiv = textArea.parentNode;
  var bioPreviewHTML = system.convertTextToHtml(textArea.value);
  var newDiv = document.createElement('div');
  textAreaDiv.appendChild(newDiv);
  newDiv.innerHTML = '<table align="center" width="325" border="1"><tbody>' +
    '<tr><td style="text-align:center;color:#7D2252;' +
    'background-color:#CD9E4B">Preview</td></tr>' +
    '<tr><td align="left" width="325"><span style="font-size:small;" ' +
    'findme="biopreview">' + bioPreviewHTML +
    '</span></td></tr></tbody></table>';

  document.getElementById('textInputBox').addEventListener('keyup',
    updateHistoryCharacters);
}

function parseProfileAndPostWarnings(data) { // Native
  var myBuffs = data._skills.reduce(function(prev, curr) {
    // What happens if I'm not buffed? TODO
    prev[curr.name] = curr.level;
    return prev;
  }, {});

  var nodeList = document.getElementById('pCC').firstElementChild.rows[9]
    .cells[0].firstElementChild.getElementsByTagName('A');
  Array.prototype.forEach.call(nodeList, function(el) {
    var tipped = el.getAttribute('data-tipped');
    var packRE = />([ a-zA-Z]+) Level (\d+)/g;
    var packBuffs;
    while ((packBuffs = packRE.exec(tipped)) !== null) {
      if (myBuffs[packBuffs[1]] === packBuffs[2]) {
        el.parentNode.insertAdjacentHTML('beforeend',
          '<br><span class="fshRed fshNoWrap">' + packBuffs[1] + ' ' +
          packBuffs[2] + ' active</span>');
      }
    }
  });
}

export function injectRPUpgrades() { // jQuery
  ajax.myStats().done(parseProfileAndPostWarnings);
}
