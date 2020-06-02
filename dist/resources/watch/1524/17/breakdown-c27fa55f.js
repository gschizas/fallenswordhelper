import { q as indexAjax, w as jQueryNotPresent, D as getValue, r as partial, bN as composingUrl, aq as defSubcmd, T as setValue, e as insertHtmlBeforeEnd, p as pCC, o as onclick, x as getElementById } from './calfSystem-f6498976.js';
import './isChecked-b18ca318.js';
import { s as simpleCheckbox } from './simpleCheckbox-fe263785.js';
import './getArrayByClassName-fc2e1014.js';
import './indexAjaxJson-d6e4bb8c.js';
import './cmdExport-04d8cb57.js';
import './guildStore-e39312dd.js';
import './getInventory-04903f78.js';
import './getInventoryById-691c7cb0.js';
import { p as perfFilter } from './perfFilter-1e5829f1.js';

function doBreakdown(selectedList) {
  return indexAjax({
    type: 'POST',
    data: {
      cmd: 'composing',
      subcmd: 'dobreakdown',
      item_list: selectedList,
    },
    dataType: 'json',
  });
}

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
  if (!evt.target.classList.contains('selectable-item')) { return; }
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

function composingBreakdown() {
  if (jQueryNotPresent()) { return; }
  perfFilter('composing');
  disableBreakdownPrompts = getValue(prefDisableBreakdownPrompts);
  prefBox();
  setupHandlers();
}

export default composingBreakdown;
//# sourceMappingURL=breakdown-c27fa55f.js.map
