import chunk from '../common/chunk';
import getArrayByTagName from '../common/getArrayByTagName';
import {getElementById} from '../common/getElement';
import insertElement from '../common/insertElement';
import insertElementBefore from '../common/insertElementBefore';
import {itemRE} from '../support/constants';
import jQueryNotPresent from '../common/jQueryNotPresent';
import jsonFail from '../common/jsonFail';
import on from '../common/on';
import once from '../common/once';
import outputResult from '../common/outputResult';
import {pCC} from '../support/layout';
import partial from '../common/partial';
import takeitems from '../app/tempinv/take';
import {
  createDiv,
  createInput,
  createLabel,
  createUl
} from '../common/cElement';

function makeQtLabel(id, text, injector) {
  var lbl = createLabel({
    id: id,
    className: 'sendLink',
    htmlFor: 'fshQuickTake',
    textContent: 'Toggle ' + text
  });
  insertElementBefore(lbl, injector);
  return lbl;
}

function reduceItems(prev, curr) {
  var img = curr.children[0];
  var tipped = img.dataset.tipped;
  var itemIDs = itemRE.exec(tipped);
  if (!itemIDs) {return prev;}
  var itemId = itemIDs[1];
  var invId = itemIDs[2];
  if (prev[itemId]) {
    prev[itemId].invIds.push(invId);
  } else {
    prev[itemId] = {
      invIds: [invId],
      tipped: tipped.replace(/&extra=\d/, ''),
      src: img.src
    };
  }
  return prev;
}

function basicQt() {
  return createDiv({
    id: 'quickTake',
    innerHTML: '<div class="fshCenter">' +
      '<br><font size="3"><b>Quick Take</b></font><br><br>' +
      'Select which item to take all similar items from your Mailbox.' +
    '</div><div></div>'
  });
}

function makeTakeResult(qt) {
  var takeContainer = createDiv();
  var takeResult = createUl();
  insertElement(takeContainer, takeResult);
  insertElement(qt, takeContainer);
  return takeResult;
}

function makeItemBox(itemTbl, pair) {
  var item = pair[1];
  var container = createDiv();
  var itemDiv = createDiv({
    innerHTML: '<img src="' + item.src + '" class="tip-dynamic" ' +
      'data-tipped="' + item.tipped + '">'
  });
  insertElement(container, itemDiv);
  var buttonDiv = createDiv({
    innerHTML: '<button class="fshBl fshBls" data-id="' + pair[0] +
      '">Take All ' + item.invIds.length + '</button>'
  });
  insertElement(container, buttonDiv);
  insertElement(itemTbl, container);
}

function makeItemBoxes(itemTbl, itemList) {
  Object.entries(itemList).forEach(partial(makeItemBox, itemTbl));
}

function killQTip(itemId) { // jQuery
  var qtipApi = $('#temp-inv-img-' + itemId).qtip('api');
  if (qtipApi) {qtipApi.destroy(true);}
}

function removeImg(item) {
  killQTip(item.id);
  var thisCell = getElementById('temp-inv-' + item.id);
  if (thisCell) {thisCell.innerHTML = '';}
}

function takeSuccess(takeResult, json) {
  json.r.forEach(removeImg);
  outputResult(json.r.length.toString() + ' item(s) taken.', takeResult);
}

function doneTake(takeResult, json) {
  if (jsonFail(json, takeResult)) {return;}
  if (Array.isArray(json.r)) {takeSuccess(takeResult, json);}
}

function doTakeItem(takeResult, el) {
  takeitems(el).done(partial(doneTake, takeResult));
}

function takeSimilar(itemList, takeResult, self) { // jQuery.min
  var type = self.dataset.id;
  var invIds = itemList[type].invIds;
  self.parentNode.innerHTML = 'taking all ' + invIds.length + ' items';
  chunk(40, invIds).forEach(partial(doTakeItem, takeResult));
}

function clickEvt(itemList, takeResult, evt) {
  if (evt.target.classList.contains('fshBls')) {
    takeSimilar(itemList, takeResult, evt.target);
  }
}

function makeItemTable(itemList, qt, takeResult) {
  var itemTbl = createDiv({className: 'fshTakeGrid'});
  makeItemBoxes(itemTbl, itemList);
  insertElement(qt, itemTbl);
  on(itemTbl, 'click', partial(clickEvt, itemList, takeResult));
}

function makeQtDiv(itemList) {
  var qt = basicQt();
  var takeResult = makeTakeResult(qt);
  insertElement(qt, createDiv());
  makeItemTable(itemList, qt, takeResult);
  insertElement(pCC, qt);
}

function toggleQuickTake(items, injector) {
  makeQtLabel('qtOn', 'Mailbox', injector);
  var itemList = items.reduce(reduceItems, {});
  makeQtDiv(itemList);
}

function makeQtCheckbox(items, injector) {
  var qtCheckbox = createInput({
    id: 'fshQuickTake',
    type: 'checkbox'
  });
  insertElementBefore(qtCheckbox, injector);
  once([qtCheckbox, 'change',
    partial(toggleQuickTake, items, injector)]);
}

export default function injectMailbox() {
  if (jQueryNotPresent()) {return;}
  var items = getArrayByTagName('a', pCC);
  if (items.length === 0) {return;} // Empty mailbox
  var injector = pCC.lastElementChild;
  makeQtCheckbox(items, injector);
  makeQtLabel('qtOff', 'Quick Take', injector);
}
