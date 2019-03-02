import createDocument from '../../system/createDocument';
import getCustomUrlParameter from '../../system/getCustomUrlParameter';
import getFolderImgs from './getFolderImgs';
import getText from '../../common/getText';
import insertHtmlBeforeEnd from '../../common/insertHtmlBeforeEnd';
import partial from '../../common/partial';
import processFolderFirstPage from './processFolderFirstPage';
import retryAjax from '../../ajax/retryAjax';

function notUnassigned(el) {
  return getCustomUrlParameter(el.parentNode.href, 'folder_id') !== '-1';
}

function noQuests(output, el) {
  var folderName = getText(
    el.parentNode.nextElementSibling.nextElementSibling.firstChild); // Text Node
  var hasQuest = /quest/i.test(folderName);
  if (hasQuest) {
    insertHtmlBeforeEnd(output, 'Skipping folder "' +
      folderName + '"  as it has the word "quest" in folder name.<br>');
  }
  return !hasQuest;
}

function doAjax(bindFolderFirstPage, el) {
  return retryAjax(el.parentNode.href).pipe(bindFolderFirstPage);
}

function buildPrm(output, html, bindFolderFirstPage) {
  var doc = createDocument(html);
  var folderImgs = getFolderImgs(doc);
  return folderImgs
    .filter(notUnassigned)
    .filter(partial(noQuests, output))
    .map(partial(doAjax, bindFolderFirstPage));
}

export default function processFirstPage(output, recipebook, html) { // jQuery.min
  var bindFolderFirstPage = partial(processFolderFirstPage, output, recipebook);
  var prm = buildPrm(output, html, bindFolderFirstPage);
  prm.push($.when(html).pipe(bindFolderFirstPage));
  return $.when.apply($, prm);
}
