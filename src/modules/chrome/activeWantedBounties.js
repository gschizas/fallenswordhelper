import calf from '../support/calf';
import * as system from '../support/system';
import * as task from '../support/task';

/* jshint latedef: nofunc */
var activeBountyListPosted;

function resetBountyList() { // Native
  system.setValueJSON('bountyList', null);
  location.reload();
}

function injectBountyList(bountyList) { // Native
  system.setValueJSON('bountyList', bountyList);
  var injectHere = document
    .getElementById('Helper:BountyListPlaceholder');
  var displayList = document.createElement('TABLE');
  displayList.cellPadding = 1;
  displayList.width = 125;

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
  var breaker = document.createElement('BR');
  injectHere.parentNode.insertBefore(breaker, injectHere.nextSibling);
  injectHere.parentNode.insertBefore(displayList, injectHere.nextSibling);
  document.getElementById('Helper:resetBountyList')
    .addEventListener('click', resetBountyList, true);
}

function resetWantedList() { // Legacy
  system.setValueJSON('wantedList', null);
  location.reload();
}

function injectWantedList(wantedList) { // Legacy
  system.setValueJSON('wantedList', wantedList);
  var injectHere = document
    .getElementById('Helper:WantedListPlaceholder');
  var displayList = document.createElement('TABLE');
  displayList.cellPadding = 3;
  displayList.width = 125;

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
        '<br/>Tickets Req.:  ' + wantedList.bounty[i].tickets;
      mouseOverText += '</div>" ';

      output += '<li style="padding-bottom:0px;margin-left:5px;">';
      output += '<a style= "font-size:10px;';
      if (wantedList.bounty[i].accept) {
        output += 'color:rgb(0,255,0); cursor:pointer; ' +
          'text-decoration:underline blink;" title = "Accept ' +
          'Bounty" onclick="' + wantedList.bounty[i].accept +
          '">[a]</a>&nbsp;';
      } else {
        output += 'color:red;" href="' + system.server +
          'index.php?cmd=attackplayer&target_username=' +
          wantedList.bounty[i].target + '">[a]</a>&nbsp;';
      }
      output += '<a style="color:#A0CFEC;font-size:10px;"href="j' +

        'avascript:openQuickMsgDialog(\'' + wantedList.bounty[i].target +
        '\');' +

        '">[m]</a> &nbsp;<a class="tip-static" data-tipped=' +
        mouseOverText +
        'style="color:#FFF380;font-size:10px;" href="' +
        wantedList.bounty[i].link + '">' +
        wantedList.bounty[i].target + '</a></li>';
    }
  }

  aCell.innerHTML = output;
  var breaker = document.createElement('BR');
  injectHere.parentNode.insertBefore(breaker, injectHere.nextSibling);
  injectHere.parentNode.insertBefore(displayList, injectHere.nextSibling);
  document.getElementById('Helper:resetWantedList')
    .addEventListener('click', resetWantedList);
}

function getWantedBountyList(doc, callback) { // Legacy
  var page = system.findNode('//input[@name="page"]', doc, $('body'));
  var curPage = parseInt(page.value, 10);
  var maxPage = page.parentNode.innerHTML.match(/of&nbsp;(\d*)/)[1];
  var activeTable = system.findNode('//table[@width = "630" and ' +
    'contains(.,"Target")]', doc);
  var wantedNames = system.getValue('wantedNames');
  var wantedArray = wantedNames.split(',');
  var wantedList = callback.wantedList;
  if (activeTable) {
    for (var i = 1; i < activeTable.rows.length - 2; i += 2) {
      var target = activeTable.rows[i].cells[0].firstChild
        .firstChild.firstChild.textContent;
      if (target === '[ No bounties available. ]') {break;}
      for (var j = 0; j < wantedArray.length; j += 1) {
        if (target === wantedArray[j].trim() ||
            wantedArray.indexOf('*') !== -1) {
          wantedList.wantedBounties = true;
          var bounty = {};
          bounty.target = target;
          bounty.link = activeTable.rows[i].cells[0]
            .firstChild.firstChild.getAttribute('href');
          bounty.lvl = activeTable.rows[i].cells[0]
            .firstChild.firstChild.nextSibling.textContent
              .replace(/\[/, '').replace(/\]/, '');
          bounty.offerer = activeTable.rows[i].cells[1]
            .firstChild.firstChild.firstChild.textContent;
          bounty.reward = activeTable.rows[i].cells[2]
            .textContent;
          bounty.rewardType = activeTable.rows[i].cells[2]
            .firstChild.firstChild.firstChild.firstChild
            .nextSibling.firstChild.title;
          bounty.xpLoss = activeTable.rows[i].cells[3]
            .textContent;
          bounty.posted = activeTable.rows[i].cells[4]
            .textContent;
          bounty.tickets = activeTable.rows[i].cells[5]
            .textContent;
          if (activeTable.rows[i].cells[6].textContent
            .trim() === '[active]') {
            bounty.active = true;
            bounty.accept = '';
          } else if (activeTable.rows[i].cells[6].textContent
            .trim() !== '[n/a]') { // TODO
            bounty.active = false;
            bounty.accept = activeTable.rows[i].cells[6]
              .firstChild.firstChild
              .getAttribute('onclick');
          }
          wantedList.bounty.push(bounty);
        }
      }
    }
  }
  if (curPage < maxPage) {
    system.xmlhttp('index.php?cmd=bounty&page=' + (curPage + 1),
      parseBountyPageForWorld, {wantedList: wantedList});
  } else {
    injectWantedList(wantedList);
  }
}

function getActiveBountyList(doc) { // Legacy
  var activeTable = system.findNode('//table[@width = 620]', doc);
  var bountyList = {};
  bountyList.bounty = [];
  bountyList.isRefreshed = true;
  bountyList.lastUpdate = new Date();

  if (activeTable) {
    if (!/No bounties active/.test(activeTable.rows[1].cells[0]
      .innerHTML)) {
      bountyList.activeBounties = true;
      for (var i = 1; i < activeTable.rows.length - 2; i += 2) {
        var bounty = {};
        bounty.target = activeTable.rows[i].cells[0].firstChild
          .firstChild.firstChild.textContent;
        bounty.link = activeTable.rows[i].cells[0].firstChild
          .firstChild.getAttribute('href');
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
  injectBountyList(bountyList);
  activeBountyListPosted = true;
}

function parseBountyPageForWorld2(details, callback) { // Native
  var doc = system.createDocument(details);
  var enableActiveBountyList = calf.enableActiveBountyList;
  var enableWantedList = calf.enableWantedList;
  system.setValue('bwNeedsRefresh', false);
  if (enableWantedList) {
    getWantedBountyList(doc, callback);
  }
  if (enableActiveBountyList &&
      !activeBountyListPosted) {
    getActiveBountyList(doc);
  }
}

function parseBountyPageForWorld(details, callback) { // Native
  task.add(3, parseBountyPageForWorld2, [details, callback]);
}

function retrieveBountyInfo(enableActiveBountyList, enableWantedList) { // Legacy
  var bountyList = system.getValueJSON('bountyList');
  var wantedList = system.getValueJSON('wantedList');
  var bountyListRefreshTime = system.getValue('bountyListRefreshTime');
  var bwNeedsRefresh = system.getValue('bwNeedsRefresh');

  bountyListRefreshTime *= 1000;
  if (!bwNeedsRefresh) {
    if (bountyList) {
      if (Date.now() -
        bountyList.lastUpdate.getTime() >
        bountyListRefreshTime) {
        bwNeedsRefresh = true; // invalidate cache
      }
    }
    if (wantedList && !bwNeedsRefresh) {
      if (Date.now() -
        wantedList.lastUpdate.getTime() >
        bountyListRefreshTime) {
        bwNeedsRefresh = true; // invalidate cache
      }
    }
  }

  if (!bountyList || !wantedList || bwNeedsRefresh &&
    (enableActiveBountyList || enableWantedList)) {
    wantedList = {};
    wantedList.bounty = [];
    wantedList.isRefreshed = true;
    wantedList.lastUpdate = new Date();
    wantedList.wantedBounties = false;
    activeBountyListPosted = false;

    system.xmlhttp(
      'index.php?cmd=bounty&page=1',
      parseBountyPageForWorld,
      {wantedList: wantedList}
    );
  } else {
    if (enableWantedList) {
      wantedList.isRefreshed = false;
      injectWantedList(wantedList);
    }
    if (enableActiveBountyList) {
      bountyList.isRefreshed = false;
      injectBountyList(bountyList);
    }
  }
}

export function prepareBountyData() { // jQuery
  if (calf.enableWantedList) {
    $('#pCR').prepend('<div class="minibox"><span id="Helper:' +
      'WantedListPlaceholder"></span></div>');
  }
  if (calf.enableActiveBountyList) {
    $('#pCR').prepend('<div class="minibox"><span id="Helper:' +
      'BountyListPlaceholder"></span></div>');
  }
  retrieveBountyInfo(
    calf.enableActiveBountyList,
    calf.enableWantedList);
}
