import bountyPage from '../../ajax/bountyPage';
import calf from '../../support/calf';
import jQueryNotPresent from '../../common/jQueryNotPresent';
import on from '../../common/on';
import {parseBountyPageForWorld} from './parseBountyPageForWorld';
import setValueJSON from '../../system/setValueJSON';
import {
  bountyList,
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
    injectWantedList();
  }
  if (enableActiveBountyList) {
    bountyList.isRefreshed = false;
    injectBountyList();
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
    bountyPage(1).done(parseBountyPageForWorld);
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

function doHandlers() {
  if (bountyListDiv) {on(bountyListDiv, 'click', resetList);}
  if (wantedListDiv) {on(wantedListDiv, 'click', resetList);}
}

export function prepareBountyData() {
  if (jQueryNotPresent()) {return;}
  createDivs();
  doHandlers();
  retrieveBountyInfo(calf.enableActiveBountyList, calf.enableWantedList);
}
