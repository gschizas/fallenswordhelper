import * as common from '../support/common';
import * as layout from '../support/layout';
import * as settingsPage from '../settings/settingsPage';
import * as system from '../support/system';

var disableBreakdownPrompts;
var selectedList = [];

function showComposingMessage(message, bgcolor) { // jQuery
  $('#composingMessageContainer').remove();

  $('#composingMessage')
    .append(
      $('<div/>', {
        id: 'composingMessageContainer',
        width: '100%'
      })
        .append(
          $('<div/>', {id: 'composingMessageText'})
            .css({
              width: '90%',
              'text-align': 'center',
              'background-color': bgcolor,
              color: 'rgb(255, 255, 255)',
              margin: '5px auto 5px auto',
              padding: '2px'
            })
            .html(message)
        )
    );

  setTimeout(function() {
    $('#composingMessageContainer').animate({opacity: 0}, 500, function() {
      $(this).animate({height: 0}, 500, function() {$(this).hide();});
    });
  }, 5000);
}

function breakItems() { // jQuery.min
  return $.ajax({
    type: 'POST',
    url: 'index.php?cmd=composing&subcmd=dobreakdown',
    data: {'item_list[]': selectedList},
    dataType: 'json'
  }).done(function(response) {
    if (response.error !== 0) {
      showComposingMessage('Error: ' + response.msg, 'rgb(164, 28, 28)');
    }
    window.location = 'index.php?cmd=composing&subcmd=breakdown&m=1';
    // if (response.error === 0) {
    //   window.location = 'index.php?cmd=composing&subcmd=breakdown&m=1';
    //   return;
    // } else {
    //   showComposingMessage('Error: ' + response.msg, 'rgb(164, 28, 28)');
    // }
  });
}

function breakEvt(evt) { // Native
  if (!disableBreakdownPrompts ||
      evt.target.id !== 'breakdown-selected-items') {return;}
  evt.stopPropagation();
  if (selectedList.length === 0) {
    showComposingMessage('Error: No items selected.', 'rgb(164, 28, 28)');
    return;
  }
  breakItems();
}

function itemClick(evt) { // Native
  if (!evt.target.classList.contains('selectable-item')) {return;}
  var myItem = evt.target.id.replace('composing-item-', '');
  var itemPos = selectedList.indexOf(myItem);
  if (itemPos === -1) {
    selectedList.push(myItem);
  } else {
    selectedList.splice(itemPos, 1);
  }
}

function togglePref() { // Native
  disableBreakdownPrompts = !disableBreakdownPrompts;
  system.setValue('disableBreakdownPrompts', disableBreakdownPrompts);
}

export function composingBreakdown() { // Native
  common.perfFilter('composing');
  disableBreakdownPrompts = system.getValue('disableBreakdownPrompts');
  document.getElementById('breakdown-selected-items').parentNode
    .addEventListener('click', breakEvt, true);
  document.getElementById('composing-items')
    .addEventListener('click', itemClick);
  layout.pCC.insertAdjacentHTML('beforeend',
    '<table class="fshTblCenter"><tbody>' +
    settingsPage.simpleCheckbox('disableBreakdownPrompts') +
    '</tbody></table>');
  document.getElementById('disableBreakdownPrompts')
    .addEventListener('click', togglePref);
}
