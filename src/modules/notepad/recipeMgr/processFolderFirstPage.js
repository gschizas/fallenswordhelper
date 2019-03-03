import createDocument from '../../system/createDocument';
import getArrayByTagName from '../../common/getArrayByTagName';
import {getElementById} from '../../common/getElement';
import getElementsByClassName from '../../common/getElementsByClassName';
import getFolderImgs from './getFolderImgs';
import partial from '../../common/partial';
import processFolderAnyPage from './processFolderAnyPage';
import retryAjax from '../../ajax/retryAjax';

function thisInventFolder(el) {
  return /\/folder_on\.gif/.test(el.getAttribute('src'));
}

function thisFolderHref(doc) {
  return getFolderImgs(doc).find(thisInventFolder).parentNode.href;
}

function notThisPage(el, i) {return i !== 0;}

function pageNumber(el) {return el.value;}

function otherPages(doc) {
  return getArrayByTagName('option',
    getElementsByClassName('customselect', getElementById('pCC', doc))[0])
    .filter(notThisPage).map(pageNumber);
}

function getPage(thisFolder, bindFolderAnyPage, i) {
  return retryAjax(thisFolder + '&page=' + i)
    .then(bindFolderAnyPage);
}

function ajaxOtherPages(doc, thisFolder, bindFolderAnyPage) {
  return otherPages(doc).map(partial(getPage, thisFolder, bindFolderAnyPage));
}

export default function processFolderFirstPage(output, recipebook, html) { // jQuery.min
  var doc = createDocument(html);
  var thisFolder = thisFolderHref(doc);
  var bindFolderAnyPage = partial(processFolderAnyPage, output, recipebook);
  var prm = ajaxOtherPages(doc, thisFolder, bindFolderAnyPage);
  prm.push($.when(html).then(bindFolderAnyPage));
  return $.when.apply($, prm);
}
