import * as ajax from '../support/ajax';
import * as system from '../support/system';

export default function moveItemsToFolder(itemsAry) { // jQuery.min
  var folderId = document.getElementById('selectFolderId').value;
  var batchNo;
  var counter = 0;
  var invList = [];
  var prm = [];
  itemsAry.forEach(function(o) {
    var el = o.injectHere.previousElementSibling.previousElementSibling
      .firstElementChild;
    if (el.checked) {
      batchNo = Math.floor(counter / 50);
      invList[batchNo] = system.fallback(invList[batchNo], []);
      invList[batchNo].push(o.invid);
      counter += 1;
      if (counter % 50 === 0) {
        prm.push(ajax.moveItem(invList[batchNo], folderId));
      }
    }
  });
  if (counter % 50 !== 0) {
    prm.push(ajax.moveItem(invList[batchNo], folderId));
  }
  $.when.apply($, prm).done(function() {location.reload();});
}
