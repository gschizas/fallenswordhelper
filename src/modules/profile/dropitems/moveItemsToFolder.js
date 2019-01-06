import chunk from '../../common/chunk';
import {getElementById} from '../../common/getElement';
import partial from '../../common/partial';
import sendtofolder from '../../app/profile/sendtofolder';

function checked(o) {
  if (!o.injectHere) {return;}
  return o.injectHere.previousElementSibling.previousElementSibling
    .children[0].checked;
}

function invid(o) {return o.invid;}

function itemByInvId(invId, item) {
  return invId.toString() === item.invid;
}

function removeInvId(itemsAry, invId) {
  var o = itemsAry.find(partial(itemByInvId, invId));
  if (o) {
    var tr = o.injectHere.parentNode;
    tr.nextElementSibling.remove();
    tr.remove();
    o.el = null;
    o.invid = null;
    o.injectHere = null;
  }
}

function removeInvIds(itemsAry, json) {
  if (Array.isArray(json.r)) {
    json.r.forEach(partial(removeInvId, itemsAry));
  }
}

function moveList(itemsAry, folderId, list) {
  return sendtofolder(folderId, list).done(partial(removeInvIds, itemsAry));
}

export default function moveItemsToFolder(itemsAry) { // jQuery.min
  var folderId = getElementById('selectFolderId').value;
  chunk(50, itemsAry.filter(checked).map(invid))
    .forEach(partial(moveList, itemsAry, folderId));
}
