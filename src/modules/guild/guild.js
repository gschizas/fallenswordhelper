import add from '../support/task';
import {colouredDots} from '../common/colouredDots';
import {createDocument} from '../system/system';
import findNode from '../system/findNode';
import {getElementById} from '../common/getElement';
import getValue from '../system/getValue';
import guildTracker from './guildTracker/guildTracker';
import moreToDo from '../common/moreToDo';
import retryAjax from '../ajax/retryAjax';
import toggleVisibilty from '../common/toggleVisibilty';
import {guildXPLock, removeGuildAvyImgBorder} from './guildUtils';
import {
  openQuickBuffByName,
  pCC,
  playerName
} from '../support/layout';

var leftHandSideColumnTable;
var members;
var memCount;

function hazConflict(conflictTable, curPage, insertHere) { // Legacy
  if (curPage === 1) {
    var newNode = insertHere.insertRow(insertHere.rows.length - 2);
    newNode.insertCell(0);
    newNode.insertCell(0);
    newNode.cells[0].innerHTML =
      '<a href="index.php?cmd=guild&subcmd=conflicts">Active Conflicts</a>';
    newNode.cells[1].innerHTML = 'Score';
  }
  for (var i = 1; i <= conflictTable.rows.length - 4; i += 2) {
    var newRow = insertHere.insertRow(insertHere.rows.length - 2);
    newRow.insertCell(0);
    newRow.insertCell(0);
    newRow.cells[0].innerHTML = conflictTable.rows[i].cells[0].innerHTML;
    newRow.cells[1].innerHTML = '<b>' + conflictTable.rows[i].cells[6]
      .innerHTML + '</b>';
  }
}

function activeConflicts(doc, curPage, insertHere) { // Legacy
  var conflictTable = findNode(
    '//font[contains(.,"Participants")]/ancestor::table[1]', doc);
  if (conflictTable && conflictTable.rows.length > 3) {
    hazConflict(conflictTable, curPage, insertHere);
  }
}

function gotConflictInfo(responseText, callback) { // Legacy
  var doc = createDocument(responseText);
  var page = findNode('//td[contains(.,"Page:")]', doc);
  var curPage = parseInt(findNode('//input[@name="page"]',
    doc).value, 10);
  var maxPage = page.innerHTML.match(/of&nbsp;(\d*)/);
  activeConflicts(doc, curPage, callback.node);
  if (maxPage && parseInt(maxPage[1], 10) > curPage) {
    retryAjax('index.php?no_mobile=1&cmd=guild&subcmd=conflicts&page=' +
      (curPage + 1).toString()
    ).done(function(html) {
      gotConflictInfo(html, {node: callback.node});
    });
  }
}

function conflictInfo() { // jQuery
  retryAjax('index.php?no_mobile=1&cmd=guild&subcmd=conflicts')
    .done(function(data) {
      gotConflictInfo(data,
        {node: getElementById('statisticsControl')});
    });
}

function logoToggle() {
  var changeLogoCell = leftHandSideColumnTable.rows[0].cells[1].firstChild;
  changeLogoCell.insertAdjacentHTML('beforeend', '[ <span class="fshLink' +
    ' tip-static" id="toggleGuildLogoControl" ' +
    'linkto="guildLogoControl" data-tipped="Toggle Section">X</span> ]');
  var guildLogoElement = leftHandSideColumnTable.rows[2].cells[0]
    .firstChild.nextSibling;
  guildLogoElement.id = 'guildLogoControl';
  if (getValue('guildLogoControl')) {
    guildLogoElement.classList.add('fshHide');
  }
  getElementById('toggleGuildLogoControl')
    .addEventListener('click', toggleVisibilty);
}

function statToggle() {
  var leaveGuildCell = leftHandSideColumnTable.rows[4].cells[1].firstChild;
  leaveGuildCell.insertAdjacentHTML('beforeend', '<span class="fshNoWrap">' +
    '[ <span class="fshLink tip-static" id="toggleStatisticsControl" ' +
    'linkto="statisticsControl" data-tipped="Toggle Section">X</span> ]' +
    '</span>');
  var statisticsControlElement = leftHandSideColumnTable.rows[6].cells[0]
    .firstChild.nextSibling;
  statisticsControlElement.id = 'statisticsControl';
  if (getValue('statisticsControl')) {
    statisticsControlElement.classList.add('fshHide');
  }
  getElementById('toggleStatisticsControl')
    .addEventListener('click', toggleVisibilty);
}

function structureToggle() {
  var buildCell = leftHandSideColumnTable.rows[15].cells[1].firstChild;
  buildCell.insertAdjacentHTML('beforeend', '[ <span class="fshLink ' +
    'tip-static" id="toggleGuildStructureControl" ' +
    'linkto="guildStructureControl" data-tipped="Toggle Section">X</span> ]');
  var guildStructureControlElement = leftHandSideColumnTable.rows[17]
    .cells[0].firstChild.nextSibling;
  guildStructureControlElement.id = 'guildStructureControl';
  if (getValue('guildStructureControl')) {
    guildStructureControlElement.classList.add('fshHide');
  }
  getElementById('toggleGuildStructureControl')
    .addEventListener('click', toggleVisibilty);
}

function batchBuffLinks() {
  var limit = performance.now() + 5;
  while (moreToDo(limit, memCount, members)) {
    members[memCount].parentNode.insertAdjacentHTML('beforeend',
      ' <span class="smallLink">[b]</span>');
    memCount += 1;
  }
  if (memCount < members.length) {
    add(3, batchBuffLinks);
  }
}

function buffLinks() {
  // TODO preference
  memCount = 0;
  members = document.querySelectorAll(
    '#pCC a[href^="index.php?cmd=profile&player_id="]');
  add(3, batchBuffLinks);
  pCC.addEventListener('click', function(evt) {
    if (evt.target.className !== 'smallLink') {return;}
    openQuickBuffByName(evt.target.previousElementSibling.text);
  });
}

function selfRecallLink() {
  // self recall
  var getLi = leftHandSideColumnTable.getElementsByTagName('LI');
  var selfRecall = getLi[getLi.length - 1].parentNode;
  selfRecall.insertAdjacentHTML('beforeend',
    '<li><a href="index.php?cmd=guild&subcmd=inventory&subcmd2=report&' +
    'user=' + playerName() +
    '" class="tip-static" data-tipped="Self Recall">Self Recall</a></li>');
}

export default function injectGuild() {
  add(3, colouredDots);
  add(3, removeGuildAvyImgBorder);
  add(3, guildXPLock);
  leftHandSideColumnTable = pCC
    .lastElementChild.rows[2].cells[0].firstElementChild;
  add(3, logoToggle);
  add(3, statToggle);
  add(3, structureToggle);
  add(3, buffLinks);
  add(3, selfRecallLink);
  // Detailed conflict information
  if (getValue('detailedConflictInfo')) {
    add(3, conflictInfo);
  }
  add(4, guildTracker);
}
