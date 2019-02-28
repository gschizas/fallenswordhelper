import addCommas from '../../system/addCommas';
import {def_shopPrompt} from '../../support/constants';
import fetchdata from '../../ajax/fetchdata';
import {getElementById} from '../../common/getElement';
import insertElement from '../../common/insertElement';
import insertHtmlBeforeEnd from '../../common/insertHtmlBeforeEnd';
import on from '../../common/on';
import setText from '../../common/setText';
import testQuant from '../../system/testQuant';
import when from '../../common/when';
import {createButton, createDiv, createInput} from '../../common/cElement';

var shoppingData;
var dialog;
var jDialog;
var fshDiv;
var numInput;
var qbBtn;
var resultDiv;

function quickBuy() {
  return fetchdata({
    a: 14,
    d: 0,
    id: shoppingData.id,
    item_id: shoppingData.itemId
  });
}

function quickDone(data) {
  var resp = data.response.response;
  var rmsg = data.response.msg;
  var msg;
  if (resp !== 0) {
    var firstTag = rmsg.indexOf('<');
    if (firstTag !== -1) {
      msg = rmsg.substring(0, firstTag);
    } else {
      msg = rmsg;
    }
  } else {
    msg = 'You purchased ' + data.response.data.name +
      ' for ' + addCommas(data.response.data.cost) + ' gold.';
  }
  insertHtmlBeforeEnd(resultDiv, msg + '<br>');
}

function normalBuy() {
  GameData.doAction(14, 3, {
    id: shoppingData.id,
    item_id: shoppingData.itemId
  }, 0);
  jDialog.close();
}

function qBuy() {
  var theValue = testQuant(numInput.value);
  if (!theValue) {return;}
  var prm = [];
  for (var i = 1; i < theValue; i += 1) {
    prm.push(quickBuy().done(quickDone));
  }
  when(prm, normalBuy);
}

function injectQuickBuy() {
  fshDiv = createDiv({
    className: 'fshClear',
    textContent: 'Select how many to quick-buy:'
  });
  numInput = createInput({
    id: 'buyAmount',
    className: 'fshNumberInput',
    min: 1,
    max: 99,
    value: 1,
    type: 'number'
  });
  insertElement(fshDiv, numInput);
  qbBtn = createButton({textContent: 'Quick-buy'});
  on(qbBtn, 'click', qBuy);
  insertElement(fshDiv, qbBtn);
  resultDiv = createDiv();
  insertElement(fshDiv, resultDiv);
  insertElement(dialog, fshDiv);
}

function getDialog() {
  return dialog || getElementById('shopDialogConfirm');
}

function getJDialog() { // jQuery
  return jDialog || $(dialog).data('hcsWorldDialogShopConfirm');
}

function initQuickBuy() {
  if (!fshDiv) {
    injectQuickBuy();
  } else {
    setText('', resultDiv);
  }
}

function worldDialogShop(e, data) {
  shoppingData = data;
  dialog = getDialog();
  if (!dialog) {return;}
  jDialog = getJDialog();
  if (jDialog) {initQuickBuy();}
}

export default function prepareShop() {
  $.subscribe(def_shopPrompt, worldDialogShop);
}
