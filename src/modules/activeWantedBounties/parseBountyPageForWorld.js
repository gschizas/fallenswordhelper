import calf from '../support/calf';
import {createDocument} from '../system/system';
import findTarget from './findTarget';
import {getElementById} from '../common/getElement';
import {injectBountyList} from './injectBountyList';
import {injectWantedList} from './injectWantedList';
import retryAjax from '../ajax/retryAjax';
import {activeBountyListPosted, bountyUrl, getActiveBountyList} from './lists';

var curPage;
var maxPage;

function getWantedBountyList(doc) {
  if (!calf.enableWantedList) {return;}
  var page = doc.querySelector('#pCC input[name="page"]');
  curPage = Number(page.value);
  maxPage = Number(page.parentNode.innerHTML.match(/of&nbsp;(\d*)/)[1]);
  var activeTable = getElementById('bounty-info', doc).parentNode.parentNode
    .nextElementSibling.children[0].children[0];
  if (activeTable) {findTarget(activeTable);}
}

function hazActiveBountyList(doc) {
  if (calf.enableActiveBountyList && !activeBountyListPosted) {
    getActiveBountyList(doc);
    injectBountyList();
  }
}

export function parseBountyPageForWorld(details) {
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
