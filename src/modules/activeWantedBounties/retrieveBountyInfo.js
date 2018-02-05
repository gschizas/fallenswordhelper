import calf from '../support/calf';
import findTarget from './findTarget';
import {getElementById} from '../common/getElement';
import getValue from '../system/getValue';
import injectBountyList from './injectBountyList';
import injectWantedList from './injectWantedList';
import {nowSecs} from '../support/dataObj';
import parseActiveBounty from './parseActiveBounty';
import retryAjax from '../ajax/retryAjax';
import {
  createDocument,
  getValueJSON,
  setValue,
} from '../system/system';

export var bountyList;
export var wantedList;
var bountyListRefreshTime;
var bwNeedsRefresh;
var curPage;
var maxPage;
var activeBountyListPosted;
var wantedNames;
export var wantedArray;
var bountyUrl = 'index.php?no_mobile=1&cmd=bounty&page=';

function getWantedBountyList(doc) {
  if (!calf.enableWantedList) {return;}
  var page = doc.querySelector('#pCC input[name="page"]');
  curPage = Number(page.value);
  maxPage = Number(page.parentNode.innerHTML.match(/of&nbsp;(\d*)/)[1]);
  var activeTable = getElementById('bounty-info', doc).parentNode.parentNode
    .nextElementSibling.children[0].children[0];
  if (activeTable) {findTarget(activeTable);}
}

function getActiveBountyList(doc) { // Legacy
  var activeTable = getElementById('bounty-info', doc).parentNode.parentNode
    .previousElementSibling.children[0].children[0];
  bountyList = {};
  bountyList.bounty = [];
  bountyList.isRefreshed = true;
  bountyList.lastUpdate = nowSecs;
  if (activeTable) {parseActiveBounty(activeTable);}
  injectBountyList();
  activeBountyListPosted = true;
}

function hazActiveBountyList(doc) {
  if (calf.enableActiveBountyList && !activeBountyListPosted) {
    getActiveBountyList(doc);
  }
}

function parseBountyPageForWorld(details) {
  var doc = createDocument(details);
  getWantedBountyList(doc);
  hazActiveBountyList(doc);
  if (curPage < maxPage) {
    retryAjax(bountyUrl + (curPage + 1).toString())
      .done(parseBountyPageForWorld);
  } else {
    injectWantedList();
  }
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

function invalidateCache() {
  bountyList = getValueJSON('bountyList');
  wantedList = getValueJSON('wantedList');
  bountyListRefreshTime = getValue('bountyListRefreshTime');
  bwNeedsRefresh = getValue('bwNeedsRefresh');
  if (bwNeedsRefresh) {return;}
  if (testCacheInvalid()) {
    bwNeedsRefresh = true; // invalidate cache
  }
}

function doRefresh() {
  wantedList = {};
  wantedList.bounty = [];
  wantedList.isRefreshed = true;
  wantedList.lastUpdate = nowSecs;
  activeBountyListPosted = false;
  wantedNames = getValue('wantedNames');
  wantedArray = wantedNames.split(/\s*,\s*/);
  retryAjax(bountyUrl + '1').done(parseBountyPageForWorld);
  setValue('bwNeedsRefresh', false);
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

var refreshConditions = [
  function() {return !bountyList;},
  function() {return !wantedList;},
  function() {return bwNeedsRefresh;}
];

function needsRefresh() {
  return refreshConditions.some(function(el) {
    return el();
  });
}

export function retrieveBountyInfo(enableActiveList, enableWantedList) {
  invalidateCache();
  if (needsRefresh()) {
    doRefresh();
  } else {
    notRefreshed(enableActiveList, enableWantedList);
  }
}
