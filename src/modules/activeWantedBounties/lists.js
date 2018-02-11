import {getElementById} from '../common/getElement';
import getValue from '../system/getValue';
import getValueJSON from '../system/getValueJSON';
import {nowSecs} from '../support/dataObj';
import setValue from '../system/setValue';

export var bountyList;
export var wantedList;
export var activeBountyListPosted;
var bountyListRefreshTime;
export var bwNeedsRefresh;
var wantedNames;
export var wantedArray;
export var bountyUrl = 'index.php?no_mobile=1&cmd=bounty&page=';

function parseActiveBounty(activeTable) { // Legacy
  if (!/No bounties active/.test(activeTable.rows[1].cells[0].innerHTML)) {
    for (var i = 1; i < activeTable.rows.length - 2; i += 2) {
      var theCells = activeTable.rows[i].cells;
      var thisBounty = {};
      thisBounty.target = theCells[0].firstChild
        .firstChild.firstChild.textContent;
      thisBounty.link = theCells[0].firstChild.firstChild.href;
      thisBounty.lvl = theCells[0].firstChild
        .firstChild.nextSibling.textContent
        .replace(/\[/, '').replace(/\]/, '');
      thisBounty.reward = theCells[2].textContent;
      thisBounty.rewardType = theCells[2]
        .firstChild.firstChild.firstChild.firstChild
        .nextSibling.firstChild.title;
      thisBounty.posted = theCells[3].textContent;
      thisBounty.xpLoss = theCells[4].textContent;
      thisBounty.progress = theCells[5].textContent;
      bountyList.bounty.push(thisBounty);
    }
  }
}

export function getActiveBountyList(doc) { // Legacy
  var activeTable = getElementById('bounty-info', doc).parentNode.parentNode
    .previousElementSibling.children[0].children[0];
  bountyList = {};
  bountyList.bounty = [];
  bountyList.isRefreshed = true;
  bountyList.lastUpdate = nowSecs;
  if (activeTable) {parseActiveBounty(activeTable);}
  activeBountyListPosted = true;
}

function testBountyList() {
  return bountyList &&
    nowSecs - bountyList.lastUpdate > bountyListRefreshTime;
}

function testWantedList() {
  return wantedList &&
    nowSecs - wantedList.lastUpdate > bountyListRefreshTime;
}

function testCacheInvalid() {
  return testBountyList() || testWantedList();
}

export function invalidateCache() {
  bountyList = getValueJSON('bountyList');
  wantedList = getValueJSON('wantedList');
  bountyListRefreshTime = getValue('bountyListRefreshTime');
  bwNeedsRefresh = getValue('bwNeedsRefresh');
  if (bwNeedsRefresh) {return;}
  if (testCacheInvalid()) {
    bwNeedsRefresh = true; // invalidate cache
  }
}

export function doRefresh() {
  wantedList = {};
  wantedList.bounty = [];
  wantedList.isRefreshed = true;
  wantedList.lastUpdate = nowSecs;
  activeBountyListPosted = false;
  wantedNames = getValue('wantedNames');
  wantedArray = wantedNames.split(/\s*,\s*/);
  setValue('bwNeedsRefresh', false);
}
