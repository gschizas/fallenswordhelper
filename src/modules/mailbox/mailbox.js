import {getElementById} from '../common/getElement';
import {itemRE} from '../support/dataObj';
import jQueryNotPresent from '../common/jQueryNotPresent';
import outputResult from '../common/outputResult';
import retryAjax from '../ajax/retryAjax';

function showError(data) { // jQuery
  var $tempError = $('#temp_error');
  $tempError.html('<span style="color: red">Error:</span> ' + data.m);
  $tempError.show().delay(5000).hide(400);
}

function failHndlr(jqXHR) {
  showError({m: jqXHR.status + ' ' + jqXHR.statusText});
}

function quickDoneTaken(data) { // jQuery
  if (data.r !== 0) {
    showError(data);
  } else {
    var qtipId = $('#temp-inv-img-' + data.temp_id).data('hasqtip');
    $('#temp-inv-' + data.temp_id).remove();
    $('#qtip-' + qtipId).remove();
  }
  outputResult('Item taken.', getElementById('take_result'));
}

function takeAllSimilar(evt) { // jQuery.min
  var invIds = evt.target.getAttribute('invIDs').split(',');
  evt.target.parentNode.innerHTML = 'taking all ' +
    invIds.length + ' items';
  invIds.forEach(function(invId) {
    retryAjax({
      type: 'POST',
      url: 'index.php',
      data: {
        cmd: 'tempinv',
        subcmd: 'takeitem',
        temp_id: invId,
        ajax: '1'
      },
      dataType: 'json'
    }).done(quickDoneTaken).fail(failHndlr);
  });
}

function toggleQuickTake() { // jQuery
  if ($('#currentMBDisplay').attr('value') === 'mailbox') {
    $('#mailboxSwitcher').html('Toggle Mailbox');
    $('#quickTake').css('display', 'block');
    $('#regularMailbox').css('display', 'none');
    $('#currentMBDisplay').attr('value', 'quicktake');
  } else {
    $('#mailboxSwitcher').html('Toggle Quick Take');
    $('#quickTake').css('display', 'none');
    $('#regularMailbox').css('display', 'block');
    $('#currentMBDisplay').attr('value', 'mailbox');
  }
}

export default function injectMailbox() { // Bad jQuery
  if (jQueryNotPresent()) {return;}
  var items = $('#pCC a');
  if (items.length === 0) {return;} // Empty mailbox
  $('#pCC').wrapInner('<div id="regularMailbox" />');
  var quickTakeDiv = '<div id="quickTake" style="display:none"><br />' +
    '<br /><center><font size="3"><b>Quick Take</b></font>' +
    '<br />Select which item to take all similar items from your ' +
    'Mailbox.<br /></center>' +
    '<table id="quickTakeTable" align="left"><tr><th width=20%>' +
    'Actions</th><th>Items</th></tr><tr><td id="take_result" ' +
    'colspan=2></td></tr></table>' +
    '</div>';
  $('#pCC').prepend('<span id="mailboxSwitcher" ' +
    'style="cursor:pointer; text-decoration:underline; ' +
    'color:blue;">Toggle Quick Take</span><input type="hidden" ' +
    'id="currentMBDisplay" value="mailbox" />' + quickTakeDiv);
  var itemList = {};
  $('#regularMailbox img[data-tipped*="t=5"]').each(function(i, e) {
    var itemIDs = itemRE.exec($(e).attr('data-tipped'));
    if (!itemIDs) {return;}
    var itemId = itemIDs[1];
    var invId = itemIDs[2];
    var tipped = $(e).attr('data-tipped');
    var src = $(e).attr('src');
    if (!itemList[itemId]) {
      var invIds = [];
      invIds.push(invId);
      itemList[itemId] = {
        invIds: invIds,
        tipped: tipped,
        src: src
      };
    } else {
      itemList[itemId].invIds.push(invId);
    }
  });
  var quickTakeTable = $('#quickTakeTable');
  Object.keys(itemList).forEach(function(id) {
    var titem = itemList[id];
    quickTakeTable.append('<tr><td align=center>' +
      '<span style="cursor:pointer; text-decoration:underline; ' +
      'color:blue; font-size:x-small;" ' +
      'id="Helper:takeAllSimilar' + id + '" invIDs="' + titem.invIds.join() +
      '">Take All ' + titem.invIds.length + '</span></td>' +
      '<td><img src="' + titem.src +
      '" class="tip-dynamic" border="0" data-tipped="' +
      titem.tipped + '"></td></tr>');
    getElementById('Helper:takeAllSimilar' + id)
      .addEventListener('click', takeAllSimilar, true);
  });
  getElementById('mailboxSwitcher')
    .addEventListener('click', toggleQuickTake, true);
}
