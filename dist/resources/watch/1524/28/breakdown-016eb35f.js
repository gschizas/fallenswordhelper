import { r as indexAjax, x as jQueryNotPresent, G as getValue, s as partial, bF as composingUrl, aq as defSubcmd, h as hasClass, V as setValue, f as insertHtmlBeforeEnd, p as pCC, o as onclick, y as getElementById } from './calfSystem-21d16a0e.js';
import './isChecked-12c32ad5.js';
import { s as simpleCheckbox } from './simpleCheckbox-2103e041.js';
import './indexAjaxJson-299742b0.js';
import './cmdExport-ad1c09dc.js';
import './guildStore-c1ac187c.js';
import './getInventory-179ae68f.js';
import './getInventoryById-6e9f9651.js';
import './getArrayByClassName-e8f48aca.js';
import { p as perfFilter } from './perfFilter-4b6adddf.js';

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

function composingBreakdown() {
  if (jQueryNotPresent()) { return; }
  perfFilter('composing');
  disableBreakdownPrompts = getValue(prefDisableBreakdownPrompts);
  prefBox();
  setupHandlers();
}

export default composingBreakdown;
//# sourceMappingURL=breakdown-016eb35f.js.map
