import * as debug from '../support/debug';
import * as layout from '../support/layout';
import * as system from '../support/system';

function recallGuildStoreItemReturnMessage(responseText, callback) { // Legacy
  var target = callback.target;
  var info = layout.infoBox(responseText);
  var itemCellElement = target.parentNode;
  if (info.search('You successfully took the item into your backpack') !==
      -1) {
    itemCellElement.innerHTML =
      '<span style="color:green; font-weight:bold;">Taken</span>';
  } else if (info !== '') {
    itemCellElement.innerHTML =
      '<span style="color:red; font-weight:bold;">Error:' + info + '</span>';
  } else {
    itemCellElement.innerHTML = 'Weird Error: check the Tools>Error Console';
    debug.log('Post the previous HTML and the following message to the ' +
    'GitHub or to the forum to help us debug this error');
    debug.log(callback.url);
  }
}

function recallGuildStoreItem(evt) { // Legacy
  var guildStoreID = evt.target.getAttribute('itemID');
  var recallHref =
    'index.php?cmd=guild&subcmd=inventory&subcmd2=takeitem&guildstore_id=' +
    // guildStoreID + '&ajax=1'; // TODO
    guildStoreID;
  system.xmlhttp(recallHref,
    recallGuildStoreItemReturnMessage,
    {item: guildStoreID, target: evt.target, url: recallHref});
}

function doItemTable(itemTable) { // Legacy
  for (var i = 1; i < itemTable.rows.length; i += 1) {
    var aRow = itemTable.rows[i];
    if (aRow.cells[2]) { // itemRow
      var itemId = aRow.cells[0].firstChild.getAttribute('value');
      aRow.cells[2].innerHTML += '&nbsp;<span style="cursor:pointer; ' +
        'text-decoration:underline; color:blue;" itemID="' + itemId +
        '">Fast BP</span>';
      var itemRecall = aRow.cells[2].firstChild.nextSibling;
      itemRecall.addEventListener('click', recallGuildStoreItem);
    }
  }
}

export default function injectGuildAddTagsWidgets() { // Legacy
  var itemTable = system.findNode(
    '//img[contains(@src,"/items/")]/ancestor::table[1]');
  if (itemTable) {doItemTable(itemTable);}
  $('b:contains("100 x Item Level")').closest('tr').next()
    .children('td:first')
    .append('<input type="button" id="fshCheckAlTag" value="Check All">');
  $('#fshCheckAlTag').click(function() {
    $('input[name*=tagIndex]').each(function(ind, ele) {
      ele.click();
    });
  });
}
