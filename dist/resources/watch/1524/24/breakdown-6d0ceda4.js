import { r as indexAjax, x as jQueryNotPresent, G as getValue, s as partial, bJ as composingUrl, aq as defSubcmd, h as hasClass, V as setValue, f as insertHtmlBeforeEnd, p as pCC, o as onclick, y as getElementById } from './calfSystem-dea093d3.js';
import './isChecked-2d5427f6.js';
import { s as simpleCheckbox } from './simpleCheckbox-ee30f49f.js';
import './indexAjaxJson-42210c04.js';
import './cmdExport-2be3c3da.js';
import './guildStore-d76ccf39.js';
import './getInventory-7e53f2c7.js';
import './getInventoryById-a6d25985.js';
import './getArrayByClassName-2f189483.js';
import { p as perfFilter } from './perfFilter-96c325e4.js';

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
//# sourceMappingURL=breakdown-6d0ceda4.js.map
