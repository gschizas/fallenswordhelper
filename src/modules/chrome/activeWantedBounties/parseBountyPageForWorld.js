import bountyPage from '../../ajax/bountyPage';
import calf from '../../support/calf';
import createDocument from '../../system/createDocument';
import findTarget from './findTarget';
import {getElementById} from '../../common/getElement';
import {injectBountyList} from './injectBountyList';
import {injectWantedList} from './injectWantedList';
import querySelector from '../../common/querySelector';
import {activeBountyListPosted, getActiveBountyList} from './lists';

var curPage;
var maxPage;

function getWantedBountyList(doc) {
  var page = querySelector('#pCC input[name="page"]', doc);
  if (!page) {return;}
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
  hazActiveBountyList(doc);
  if (calf.enableWantedList) {
    getWantedBountyList(doc);
    if (curPage < maxPage) {
      bountyPage(curPage + 1).done(parseBountyPageForWorld);
    } else {
      injectWantedList();
    }
  }
}
