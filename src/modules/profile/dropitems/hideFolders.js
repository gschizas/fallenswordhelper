import partial from '../../common/partial';
import toggleForce from '../../common/toggleForce';

function clearCheck(el) {
  el.parentNode.parentNode.previousElementSibling.children[0].checked = false;
}

function displayFolderItems(invItems, folderId, o) {
  var tr = o.injectHere.parentNode;
  var folder = invItems[o.invid].folder_id;
  var force = folderId !== 0 && folderId !== folder;
  toggleForce(tr, force);
  toggleForce(tr.nextElementSibling, force);
}

function updateList(invItems, folderId, o) {
  clearCheck(o.el);
  displayFolderItems(invItems, folderId, o);
}

export default function hideFolders(itemsAry, invItems, self) {
  itemsAry.forEach(partial(updateList, invItems, Number(self.dataset.folder)));
}
