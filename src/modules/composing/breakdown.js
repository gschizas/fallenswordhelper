import doBreakdown from '../ajax/doBreakdown';
import getElementById from '../common/getElement';
import getValue from '../system/getValue';
import hasClass from '../common/hasClass';
import insertHtmlBeforeEnd from '../common/insertHtmlBeforeEnd';
import jQueryNotPresent from '../common/jQueryNotPresent';
import onclick from '../common/onclick';
import { pCC } from '../support/layout';
import partial from '../common/partial';
import perfFilter from '../common/perfFilter';
import setValue from '../system/setValue';
import { simpleCheckbox } from '../settings/simpleCheckbox';
import { composingUrl, defSubcmd } from '../support/constants';

const prefDisableBreakdownPrompts = 'disableBreakdownPrompts';
let disableBreakdownPrompts;
const selectedList = [];

function disappearance(target) { target.hide(); }

function goDown(target, disappear) {
  target.animate({ height: 0 }, 500, disappear);
}

function fadeAway() {
  const target = $('#composingMessageContainer');
  target.animate({ opacity: 0 }, 500,
    partial(goDown, target, partial(disappearance, target)));
}

function msgText(message, bgcolor) {
  return $('<div/>', { id: 'composingMessageText' })
    .css({
      width: '90%',
      'text-align': 'center',
      'background-color': bgcolor,
      color: 'rgb(255, 255, 255)',
      margin: '5px auto 5px auto',
      padding: '2px',
    })
    .html(message);
}

function showComposingMessage(message, bgcolor) { // jQuery
  $('#composingMessageContainer').remove();

  $('#composingMessage')
    .append(
      $('<div/>', {
        id: 'composingMessageContainer',
        width: '100%',
      }).append(msgText(message, bgcolor)),
    );

  setTimeout(fadeAway, 5000);
}

function handleResponse(response) {
  if (response.error !== 0) {
    showComposingMessage(`Error: ${response.msg}`, 'rgb(164, 28, 28)');
  } else {
    window.location = `${composingUrl + defSubcmd}breakdown&m=1`;
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
  if (disableBreakdownPrompts
      && evt.target.id === 'breakdown-selected-items') {
    validBreakEvent(evt);
  }
}

function itemClick(evt) {
  if (!hasClass('selectable-item', evt.target)) { return; }
  const myItem = evt.target.id.replace('composing-item-', '');
  const itemPos = selectedList.indexOf(myItem);
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
    `<table class="fshTblCenter"><tbody>${
      simpleCheckbox(prefDisableBreakdownPrompts)
    }</tbody></table>`);
}

function setupHandlers() {
  onclick(getElementById('breakdown-selected-items').parentNode, breakEvt,
    true);
  onclick(getElementById('composing-items'), itemClick);
  onclick(getElementById(prefDisableBreakdownPrompts), togglePref);
}

export default function composingBreakdown() {
  if (jQueryNotPresent()) { return; }
  perfFilter('composing');
  disableBreakdownPrompts = getValue(prefDisableBreakdownPrompts);
  prefBox();
  setupHandlers();
}
