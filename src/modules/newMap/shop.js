import * as system from '../support/system';

var shoppingData;
var dialog;
var jDialog;
var fshDiv;
var numInput;
var qbBtn;
var resultDiv;

function quickBuy() {
  return $.ajax({
    cache: false,
    url: 'fetchdata.php',
    data: {
      a: 14,
      d: 0,
      id: shoppingData.id,
      item_id: shoppingData.itemId,
      _rnd: Math.floor(Math.random() * 8999999998) + 1000000000
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
      ' for ' + system.addCommas(data.response.data.cost) + ' gold.';
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
  var theValue = system.testQuant(numInput.value);
  if (!theValue) {return;}
  var prm = [];
  for (var i = 1; i < theValue; i += 1) {
    prm.push(quickBuy().done(quickDone));
  }
  $.when.apply($, prm).done(normalBuy);
}

function injectQuickBuy() {
  fshDiv = document.createElement('div');
  fshDiv.className = 'fshClear';
  fshDiv.textContent = 'Select how many to quick-buy:';
  numInput = document.createElement('input');
  numInput.id = 'buyAmount';
  numInput.className = 'fshNumberInput';
  numInput.min = 1;
  numInput.max = 99;
  numInput.value = 1;
  numInput.type = 'number';
  fshDiv.appendChild(numInput);
  qbBtn = document.createElement('button');
  qbBtn.textContent = 'Quick-buy';
  qbBtn.addEventListener('click', qBuy);
  fshDiv.appendChild(qbBtn);
  resultDiv = document.createElement('div');
  fshDiv.appendChild(resultDiv);
  dialog.appendChild(fshDiv);
}

function worldDialogShop(e, data) {
  shoppingData = data;
  dialog = dialog || document.getElementById('shopDialogConfirm');
  if (!dialog) {return;}
  jDialog = jDialog || $(dialog).data('worldDialogShopConfirm');
  if (!fshDiv) {injectQuickBuy();}
  else {resultDiv.textContent = '';}
}

export function prepareShop() {
  $.subscribe('prompt.worldDialogShop', worldDialogShop);
}
