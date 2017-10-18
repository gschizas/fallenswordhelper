import calf from '../support/calf';
import {now} from '../support/dataObj';
import {createBr, createTable} from '../common/cElement';
import * as system from '../support/system';

var bountyList;
var wantedList;
var bountyListRefreshTime;
var bwNeedsRefresh;
var curPage;
var maxPage;
var activeBountyListPosted;
var wantedNames;
var wantedArray;

function resetBountyList() {
  system.setValueJSON('bountyList', null);
  location.reload();
}

function injectBountyList() {
  system.setValueJSON('bountyList', bountyList);
  var injectHere = document
    .getElementById('Helper:BountyListPlaceholder');
  var displayList = createTable({cellPadding: 1, width: 125});

  var aRow = displayList.insertRow(0); // bountyList.rows.length
  var aCell = aRow.insertCell(0);
  var output = '<h3>Active Bounties</h3><ol style="color:#FFF380;font-' +
    'size:10px;list-style-type:decimal;margin-left:1px;margin-top:' +
    '1px;margin-bottom:1px;padding-left:20px;"><nobr><span id="' +
    'Helper:resetBountyList" style=" font-size:8px; cursor:pointer; ' +
    'text-decoration:underline;">Reset</span><nobr><br>';

  if (bountyList.activeBounties === false) {
    output += '</ol> \f <ol style="color:orange;font-size:10px;list-' +
      'style-type:decimal;margin-left:1px;margin-top:1px;margin-' +
      'bottom:1px;padding-left:10px;">[No Active bounties]</ol>';
  } else {
    for (var i = 0; i < bountyList.bounty.length; i += 1) {
      var mouseOverText = '<div>Level:  ' + bountyList.bounty[i].lvl +
        '<br/>Reward: ' + bountyList.bounty[i].reward + ' ' +
        bountyList.bounty[i].rewardType +
        '<br/>XP Loss Remaining: ' + bountyList.bounty[i].xpLoss +
        '<br/>Progress:  ' + bountyList.bounty[i].progress +
        '</div>';

      output += '<li style="padding-bottom:0px;"><a style="color:' +
        'red;font-size:10px;"href="' + system.server +
        'index.php?cmd=attackplayer&mode=bounty&target_username=' +
        bountyList.bounty[i].target + '">[a]</a>&nbsp;<a style="' +
        'color:#A0CFEC;font-size:10px;"href="' + system.server +
        'index.php?cmd=message&target_player=' +
        bountyList.bounty[i].target + '">[m]</a> &nbsp;<a href="' +
        bountyList.bounty[i].link + '" class="tip-static" ' +
        'data-tipped="' + mouseOverText + '" style="color:' +
        '#FFF380;font-size:10px;">' + bountyList.bounty[i].target +
        '</a></li>';
    }
  }

  aCell.innerHTML = output;
  var breaker = createBr();
  injectHere.parentNode.insertBefore(breaker, injectHere.nextSibling);
  injectHere.parentNode.insertBefore(displayList, injectHere.nextSibling);
  document.getElementById('Helper:resetBountyList')
    .addEventListener('click', resetBountyList, true);
}

function resetWantedList() { // Legacy
  system.setValueJSON('wantedList', null);
  location.reload();
}

function acceptOrAttack(bounty) { // Legacy
  if (bounty.accept) {
    return 'color:rgb(0,255,0); cursor:pointer; ' +
      'text-decoration:underline blink;" title = "Accept ' +
      'Bounty" onclick="' + bounty.accept +
      '">[a]</a>&nbsp;';
  }
  return 'color:red;" href="' + system.server +
    'index.php?cmd=attackplayer&target_username=' +
    bounty.target + '">[a]</a>&nbsp;';
}

function injectWantedList() { // Legacy
  system.setValueJSON('wantedList', wantedList);
  var injectHere = document
    .getElementById('Helper:WantedListPlaceholder');
  var displayList = createTable({cellPadding: 3, width: 125});

  var aRow = displayList.insertRow(0);
  var aCell = aRow.insertCell(0);
  var output = '<h3>Wanted Bounties</h3><ol style="color:#FFF380;font-' +
    'size:10px;list-style-type:decimal;margin-left:1px;margin-top:' +
    '1px;margin-bottom:1px;padding-left:12px;"><nobr> <span id="' +
    'Helper:resetWantedList" font-size:8px; cursor:pointer; text-' +
    'decoration:underline;">Reset</span></nobr><br>';

  if (wantedList.wantedBounties === false) {
    output += '</ol> \f <ol style="color:orange;font-size:10px;list-' +
      'style-type:decimal;margin-left:1px;margin-top:1px;margin-' +
      'bottom:1px;padding-left:7px;">[No wanted bounties]</ol>';
  } else {
    for (var i = 0; i < wantedList.bounty.length; i += 1) {
      var mouseOverText = '"<div style=\'text-align:center;width:' +
        '205px;\'>Target Level:  ' + wantedList.bounty[i].lvl +
        '<br/>Offerer: ' + wantedList.bounty[i].offerer +
        '<br/>Reward: ' + wantedList.bounty[i].reward + ' ' +
        wantedList.bounty[i].rewardType +
        '<br/>XP Loss Remaining: ' + wantedList.bounty[i].xpLoss +
        '<br/>Posted: ' + wantedList.bounty[i].posted +
        '<br/>Tickets Req.:  ' + wantedList.bounty[i].tickets + '</div>" ';

      output += '<li style="padding-bottom:0px;margin-left:5px;">' +
        '<a style= "font-size:10px;' + acceptOrAttack(wantedList.bounty[i]) +
        '<a style="color:#A0CFEC;font-size:10px;"href="j' +
        'avascript:openQuickMsgDialog(\'' + wantedList.bounty[i].target +
        '\');">[m]</a> &nbsp;<a class="tip-static" data-tipped=' +
        mouseOverText + 'style="color:#FFF380;font-size:10px;" href="' +
        wantedList.bounty[i].link + '">' +
        wantedList.bounty[i].target + '</a></li>';
    }
  }

  aCell.innerHTML = output;
  var breaker = createBr();
  injectHere.parentNode.insertBefore(breaker, injectHere.nextSibling);
  injectHere.parentNode.insertBefore(displayList, injectHere.nextSibling);
  document.getElementById('Helper:resetWantedList')
    .addEventListener('click', resetWantedList);
}

function getTarget(target, theRow) {
  wantedList.wantedBounties = true;
  var bounty = {};
  bounty.target = target;
  bounty.link = theRow.cells[0]
    .firstChild.firstChild.href;
  bounty.lvl = theRow.cells[0]
    .firstChild.firstChild.nextSibling.textContent
    .replace(/\[/, '').replace(/\]/, '');
  bounty.offerer = theRow.cells[1]
    .firstChild.firstChild.firstChild.textContent;
  bounty.reward = theRow.cells[2].textContent;
  bounty.rewardType = theRow.cells[2]
    .firstChild.firstChild.firstChild.firstChild
    .nextSibling.firstChild.title;
  bounty.xpLoss = theRow.cells[3].textContent;
  bounty.posted = theRow.cells[4].textContent;
  bounty.tickets = theRow.cells[5].textContent;
  if (theRow.cells[6].textContent.trim() === '[active]') {
    bounty.active = true;
    bounty.accept = '';
  } else if (theRow.cells[6].textContent.trim() !== '[n/a]') { // TODO
    bounty.active = false;
    bounty.accept = theRow.cells[6]
      .firstChild.firstChild
      .getAttribute('onclick');
  }
  wantedList.bounty.push(bounty);
}

function wantedTarget(target, theRow, el) {
  if (target === el.trim() ||
      wantedArray.indexOf('*') !== -1) {
    getTarget(target, theRow);
  }
}

function findTarget(activeTable) {
  for (var i = 1; i < activeTable.rows.length - 2; i += 2) {
    var theRow = activeTable.rows[i];
    var target = theRow.cells[0].firstChild
      .firstChild.firstChild.textContent;
    if (target === '[ No bounties available. ]') {break;}
    wantedArray.forEach(wantedTarget.bind(null, target, theRow));
  }
}

function getWantedBountyList(doc) { // Legacy
  if (!calf.enableWantedList) {return;}
  var page = system.findNode('//input[@name="page"]', doc);
  curPage = parseInt(page.value, 10);
  maxPage = page.parentNode.innerHTML.match(/of&nbsp;(\d*)/)[1];
  var activeTable = system.findNode('//table[@width = "630" and ' +
    'contains(.,"Target")]', doc);
  if (activeTable) {findTarget(activeTable);}
}

function parseActiveBounty(activeTable) { // Legacy
  if (!/No bounties active/.test(activeTable.rows[1].cells[0].innerHTML)) {
    bountyList.activeBounties = true;
    for (var i = 1; i < activeTable.rows.length - 2; i += 2) {
      var bounty = {};
      bounty.target = activeTable.rows[i].cells[0].firstChild
        .firstChild.firstChild.textContent;
      bounty.link = activeTable.rows[i].cells[0].firstChild
        .firstChild.href;
      bounty.lvl = activeTable.rows[i].cells[0].firstChild
        .firstChild.nextSibling.textContent
        .replace(/\[/, '').replace(/\]/, '');
      bounty.reward = activeTable.rows[i].cells[2]
        .textContent;
      bounty.rewardType = activeTable.rows[i].cells[2]
        .firstChild.firstChild.firstChild.firstChild
        .nextSibling.firstChild.title;
      bounty.posted = activeTable.rows[i].cells[3]
        .textContent;
      bounty.xpLoss = activeTable.rows[i].cells[4]
        .textContent;
      bounty.progress = activeTable.rows[i].cells[5]
        .textContent;
      bountyList.bounty.push(bounty);
    }
  } else {
    bountyList.activeBounties = false;
  }
}

function getActiveBountyList(doc) { // Legacy
  var activeTable = system.findNode('//table[@width = 620]', doc);
  bountyList = {};
  bountyList.bounty = [];
  bountyList.isRefreshed = true;
  bountyList.lastUpdate = new Date();
  if (activeTable) {parseActiveBounty(activeTable);}
  injectBountyList();
  activeBountyListPosted = true;
}

function parseBountyPageForWorld(details) {
  var doc = system.createDocument(details);
  getWantedBountyList(doc);
  if (calf.enableActiveBountyList &&
      !activeBountyListPosted) {
    getActiveBountyList(doc);
  }
  if (curPage < maxPage) {
    system.xmlhttp('index.php?cmd=bounty&page=' + (curPage + 1),
      parseBountyPageForWorld);
  } else {
    injectWantedList();
  }
}

function testCacheInvalid() { // Legacy
  return bountyList &&
    now - bountyList.lastUpdate.getTime() > bountyListRefreshTime ||
    wantedList &&
    now - wantedList.lastUpdate.getTime() > bountyListRefreshTime;
}

function invalidateCache() { // Legacy
  bountyList = system.getValueJSON('bountyList');
  wantedList = system.getValueJSON('wantedList');
  bountyListRefreshTime = system.getValue('bountyListRefreshTime');
  bwNeedsRefresh = system.getValue('bwNeedsRefresh');
  bountyListRefreshTime *= 1000;
  if (bwNeedsRefresh) {return;}
  if (testCacheInvalid()) {
    bwNeedsRefresh = true; // invalidate cache
  }
}

function doRefresh() { // Legacy
  wantedList = {};
  wantedList.bounty = [];
  wantedList.isRefreshed = true;
  wantedList.lastUpdate = new Date();
  wantedList.wantedBounties = false;
  activeBountyListPosted = false;
  wantedNames = system.getValue('wantedNames');
  wantedArray = wantedNames.split(',');
  system.xmlhttp('index.php?cmd=bounty&page=1', parseBountyPageForWorld);
  system.setValue('bwNeedsRefresh', false);
}

function notRefreshed(enableActiveBountyList, enableWantedList) {
  if (enableWantedList) {
    wantedList.isRefreshed = false;
    injectWantedList(wantedList);
  }
  if (enableActiveBountyList) {
    bountyList.isRefreshed = false;
    injectBountyList(bountyList);
  }
}

var testConditions = [
  function() {return !bountyList;},
  function() {return !wantedList;},
  function() {return bwNeedsRefresh;}
];

function testForRefresh() {
  for (var i = 0; i < testConditions.length; i += 1) {
    if (testConditions[i]()) {return true;}
  }
  return false;
}

function retrieveBountyInfo(enableActiveBountyList, enableWantedList) { // Legacy
  invalidateCache();
  if (testForRefresh()) {
    doRefresh();
  } else {
    notRefreshed(enableActiveBountyList, enableWantedList);
  }
}

export default function prepareBountyData() {
  var pCR = document.getElementById('pCR');
  if (calf.enableWantedList) {
    pCR.insertAdjacentHTML('afterbegin', '<div class="minibox">' +
      '<span id="Helper:WantedListPlaceholder"></span></div>');
  }
  if (calf.enableActiveBountyList) {
    pCR.insertAdjacentHTML('afterbegin', '<div class="minibox">' +
      '<span id="Helper:BountyListPlaceholder"></span></div>');
  }
  retrieveBountyInfo(
    calf.enableActiveBountyList,
    calf.enableWantedList);
}
