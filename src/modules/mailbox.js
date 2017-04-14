import * as ajax from './support/ajax';
import * as dataObj from './support/dataObj';

var cn;

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
  cn += 1;
  $('#take_result').append('<br>' + cn + '. Item taken.');
}

function takeAllSimilar(evt) { // jQuery.min
  var invIds = evt.target.getAttribute('invIDs').split(',');
  evt.target.parentNode.innerHTML = 'taking all ' +
    invIds.length + ' items';
  cn = 0;
  invIds.forEach(function(invId) {
    $.ajax({
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

export function injectMailbox() { // Bad jQuery
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
    var itemIDs = dataObj.itemRE.exec($(e).attr('data-tipped'));
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
    document.getElementById('Helper:takeAllSimilar' + id)
      .addEventListener('click', takeAllSimilar, true);
  });
  document.getElementById('mailboxSwitcher')
    .addEventListener('click', toggleQuickTake, true);
}

function guildTake(e) { // jQuery
  var self = $(e.target);
  ajax.guildMailboxTake(self.attr('href')).done(function(data) {
    if (data.r === 1) {return;}
    self.removeClass();
    self.closest('table').next().find('td')
      .html('<span class="fshGreen">Taken</span>');
  });
}

export function guildMailbox() { // Bad jQuery
  var items = $('#pCC a');
  if (items.length === 0) {return;}
  items.wrap(function(i) {
    return '<span class="helperQC" href="' + items[i].attr('href') +
      '"></span>';
  }).children().unwrap();
  $('#pCC').on('click', '.helperQC', guildTake);

  var takeItems = $('<div class="fshCenter"><span class="reportLink">' +
    'Take All</span></div>');
  $('#pCC td[height="25"]').append(takeItems);
  takeItems.click(function() {
    $('#pCC span.helperQC').click();
  });
}
