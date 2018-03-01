import toggleForce from '../common/toggleForce';

export default function hideFolders(itemsAry, invItems, self) {
  var folderId = Number(self.dataset.folder);
  itemsAry.forEach(function(o) {
    o.el.parentNode.parentNode.previousElementSibling.firstElementChild
      .checked = false;
    var tr = o.injectHere.parentNode;
    var separator = tr.nextElementSibling;
    if (folderId === 0) {
      tr.classList.remove('fshHide');
      separator.classList.remove('fshHide');
    } else {
      var folder = invItems[o.invid].folder_id;
      var force = folderId !== folder;
      toggleForce(tr, force);
      toggleForce(separator, force);
    }
  });
}
