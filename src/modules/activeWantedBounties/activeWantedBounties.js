import calf from '../support/calf';
import {parseBountyPageForWorld} from './parseBountyPageForWorld';
import retryAjax from '../ajax/retryAjax';
import setValueJSON from '../system/setValueJSON';
import {
  bountyList,
  bountyUrl,
  bwNeedsRefresh,
  doRefresh,
  invalidateCache,
  wantedList
} from './lists';
import {bountyListDiv, createDivs, wantedListDiv} from './createDivs';
import {bountyListReset, injectBountyList} from './injectBountyList';
import {injectWantedList, wantedListReset} from './injectWantedList';

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

function retrieveBountyInfo(enableActiveList, enableWantedList) {
  invalidateCache();
  if (needsRefresh()) {
    doRefresh();
    retryAjax(bountyUrl + '1').done(parseBountyPageForWorld);
  } else {
    notRefreshed(enableActiveList, enableWantedList);
  }
}

function resetList(e) {
  if (e.target === bountyListReset) {
    setValueJSON('bountyList', null);
    retrieveBountyInfo(calf.enableActiveBountyList, calf.enableWantedList);
  }
  if (e.target === wantedListReset) {
    setValueJSON('wantedList', null);
    retrieveBountyInfo(calf.enableActiveBountyList, calf.enableWantedList);
  }
}

export function prepareBountyData() {
  createDivs();
  bountyListDiv.addEventListener('click', resetList);
  wantedListDiv.addEventListener('click', resetList);
  retrieveBountyInfo(calf.enableActiveBountyList, calf.enableWantedList);
}
