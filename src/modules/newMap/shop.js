import addCommas from '../system/addCommas';
import fallback from '../system/fallback';
import {getElementById} from '../common/getElement';
import retryAjax from '../ajax/retryAjax';
import rnd from '../system/rnd';
import testQuant from '../system/testQuant';
import {createButton, createDiv, createInput} from '../common/cElement';

var shoppingData;
var dialog;
var jDialog;
var fshDiv;
var numInput;
var qbBtn;
var resultDiv;

function quickBuy() {
  return retryAjax({
    cache: false,
    url: 'fetchdata.php',
    data: {
      a: 14,
      d: 0,
      id: shoppingData.id,
      item_id: shoppingData.itemId,
      _rnd: rnd()
    },
    dataType: 'json'
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
  resultDiv.insertAdjacentHTML('beforeend', msg + '<br>');
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
  $.when.apply($, prm).done(normalBuy);
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
  fshDiv.appendChild(numInput);
  qbBtn = createButton({textContent: 'Quick-buy'});
  qbBtn.addEventListener('click', qBuy);
  fshDiv.appendChild(qbBtn);
  resultDiv = createDiv();
  fshDiv.appendChild(resultDiv);
  dialog.appendChild(fshDiv);
}

function worldDialogShop(e, data) {
  shoppingData = data;
  dialog = fallback(dialog,
    getElementById('shopDialogConfirm'));
  if (!dialog) {return;}
  jDialog = fallback(jDialog, $(dialog).data('worldDialogShopConfirm'));
  if (!fshDiv) {injectQuickBuy();} else {resultDiv.textContent = '';}
}

export default function prepareShop() {
  $.subscribe('prompt.worldDialogShop', worldDialogShop);
}
