import doBreakdown from '../ajax/doBreakdown';
import {getElementById} from '../common/getElement';
import getValue from '../system/getValue';
import insertHtmlBeforeEnd from '../common/insertHtmlBeforeEnd';
import jQueryNotPresent from '../common/jQueryNotPresent';
import on from '../common/on';
import {pCC} from '../support/layout';
import partial from '../common/partial';
import perfFilter from '../common/perfFilter';
import setValue from '../system/setValue';
import {simpleCheckbox} from '../settings/simpleCheckbox';
import {composingUrl, def_subcmd} from '../support/constants';

var prefDisableBreakdownPrompts = 'disableBreakdownPrompts';
var disableBreakdownPrompts;
var selectedList = [];

function disappearance(self) {self.hide();}

function goDown(self, disappear) {self.animate({height: 0}, 500, disappear);}

function fadeAway() {
  var self = $('#composingMessageContainer');
  self.animate({opacity: 0}, 500,
    partial(goDown, self, partial(disappearance, self)));
}

function msgText(message, bgcolor) {
  return $('<div/>', {id: 'composingMessageText'})
    .css({
      width: '90%',
      'text-align': 'center',
      'background-color': bgcolor,
      color: 'rgb(255, 255, 255)',
      margin: '5px auto 5px auto',
      padding: '2px'
    })
    .html(message);
}

function showComposingMessage(message, bgcolor) { // jQuery
  $('#composingMessageContainer').remove();

  $('#composingMessage')
    .append(
      $('<div/>', {
        id: 'composingMessageContainer',
        width: '100%'
      }).append(msgText(message, bgcolor))
    );

  setTimeout(fadeAway, 5000);
}

function handleResponse(response) {
  if (response.error !== 0) {
    showComposingMessage('Error: ' + response.msg, 'rgb(164, 28, 28)');
  } else {
    window.location = composingUrl + def_subcmd + 'breakdown&m=1';
  }
}

function breakItems() { // jQuery.min
  doBreakdown(selectedList).then(handleResponse);
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
  setValue(prefDisableBreakdownPrompts, disableBreakdownPrompts);
}

function prefBox() {
  insertHtmlBeforeEnd(pCC,
    '<table class="fshTblCenter"><tbody>' +
    simpleCheckbox(prefDisableBreakdownPrompts) +
    '</tbody></table>');
}

function setupHandlers() {
  on(getElementById('breakdown-selected-items').parentNode, 'click', breakEvt,
    true);
  on(getElementById('composing-items'), 'click', itemClick);
  on(getElementById(prefDisableBreakdownPrompts), 'click', togglePref);
}

export default function composingBreakdown() {
  if (jQueryNotPresent()) {return;}
  perfFilter('composing');
  disableBreakdownPrompts = getValue(prefDisableBreakdownPrompts);
  prefBox();
  setupHandlers();
}
