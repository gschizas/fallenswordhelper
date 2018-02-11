import {getElementById} from '../common/getElement';
import getValue from '../system/getValue';
import {pCC} from '../support/layout';
import perfFilter from '../common/perfFilter';
import retryAjax from '../ajax/retryAjax';
import setValue from '../system/setValue';
import {simpleCheckbox} from '../settings/simpleCheckbox';

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
    var self = $('#composingMessageContainer');
    self.animate({opacity: 0}, 500, function() {
      self.animate({height: 0}, 500, function() {
        self.hide();
      });
    });
  }, 5000);
}

function breakItems() { // jQuery.min
  return retryAjax({
    type: 'POST',
    url: 'index.php?cmd=composing&subcmd=dobreakdown',
    data: {'item_list[]': selectedList},
    dataType: 'json'
  }).done(function(response) {
    if (response.error !== 0) {
      showComposingMessage('Error: ' + response.msg, 'rgb(164, 28, 28)');
    }
    window.location = 'index.php?cmd=composing&subcmd=breakdown&m=1';
  });
}

function validBreakEvent(evt) {
  evt.stopPropagation();
  if (selectedList.length === 0) {
    showComposingMessage('Error: No items selected.', 'rgb(164, 28, 28)');
    return;
  }
  breakItems();
}

function breakEvt(evt) {
  if (disableBreakdownPrompts &&
      evt.target.id === 'breakdown-selected-items') {
    validBreakEvent(evt);
  }
}

function itemClick(evt) {
  if (!evt.target.classList.contains('selectable-item')) {return;}
  var myItem = evt.target.id.replace('composing-item-', '');
  var itemPos = selectedList.indexOf(myItem);
  if (itemPos === -1) {
    selectedList.push(myItem);
  } else {
    selectedList.splice(itemPos, 1);
  }
}

function togglePref() {
  disableBreakdownPrompts = !disableBreakdownPrompts;
  setValue('disableBreakdownPrompts', disableBreakdownPrompts);
}

export default function composingBreakdown() {
  perfFilter('composing');
  disableBreakdownPrompts = getValue('disableBreakdownPrompts');
  getElementById('breakdown-selected-items').parentNode
    .addEventListener('click', breakEvt, true);
  getElementById('composing-items')
    .addEventListener('click', itemClick);
  pCC.insertAdjacentHTML('beforeend',
    '<table class="fshTblCenter"><tbody>' +
    simpleCheckbox('disableBreakdownPrompts') +
    '</tbody></table>');
  getElementById('disableBreakdownPrompts')
    .addEventListener('click', togglePref);
}
