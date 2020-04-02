import batch from '../../common/batch';
import {entries} from '../../common/entries';
import partial from '../../common/partial';
import playerId from '../../common/playerId';
import toggleForce from '../../common/toggleForce';

function clearCheck(el) {
  el.parentNode.parentNode.previousElementSibling.children[0].checked = false;
}

function displayFolderItems(invItems, folderId, o) {
  var tr = o.injectHere.parentNode;
  var folder = invItems[o.invid].folder_id;
  var force = folderId !== 0 && folderId !== folder;
  if ([563116, 1963510].includes(playerId())) {
    console.log(folderId, folder, folderId !== folder); // eslint-disable-line no-console
  }
  toggleForce(tr, force);
  toggleForce(tr.nextElementSibling, force);
}

function updateList(invItems, folderId, o) {
  clearCheck(o.el);
  displayFolderItems(invItems, folderId, o);
}

export default function hideFolders(itemsAry, invItems, target) {
  if ([563116, 1963510].includes(playerId())) {
    console.log( // eslint-disable-line no-console
      'itemsAry.length',
      itemsAry.length,
      'entries(invItems).length',
      entries(invItems).length,
      itemsAry,
      invItems
    );
  }
  batch([
    2,
    3,
    itemsAry,
    0,
    partial(updateList, invItems, Number(target.dataset.folder))
  ]);
}
