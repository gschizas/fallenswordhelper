import addCommas from '../../system/addCommas';
import allthen from '../../common/allthen';
import createButton from '../../common/cElement/createButton';
import createDiv from '../../common/cElement/createDiv';
import createInput from '../../common/cElement/createInput';
import { defShopPrompt } from '../../support/constants';
import fetchdata from '../../ajax/fetchdata';
import getElementById from '../../common/getElement';
import insertElement from '../../common/insertElement';
import insertHtmlBeforeEnd from '../../common/insertHtmlBeforeEnd';
import onclick from '../../common/onclick';
import setText from '../../dom/setText';
import testQuant from '../../system/testQuant';

let shoppingData;
let dialog;
let jDialog;
let fshDiv;
let numInput;
let qbBtn;
let resultDiv;

function quickBuy() {
  return fetchdata({
    a: 14,
    d: 0,
    id: shoppingData.id,
    item_id: shoppingData.itemId,
  });
}

function quickDone(data) {
  const resp = data.response.response;
  const rmsg = data.response.msg;
  let msg;
  if (resp !== 0) {
    const firstTag = rmsg.indexOf('<');
    if (firstTag !== -1) {
      msg = rmsg.substring(0, firstTag);
    } else {
      msg = rmsg;
    }
  } else {
    msg = `You purchased ${data.response.data.name
    } for ${addCommas(data.response.data.cost)} gold.`;
  }
  insertHtmlBeforeEnd(resultDiv, `${msg}<br>`);
}

function normalBuy() {
  GameData.doAction(14, 3, {
    id: shoppingData.id,
    item_id: shoppingData.itemId,
  }, 0);
  jDialog.close();
}

function qBuy() {
  const theValue = testQuant(numInput.value);
  if (!theValue) { return; }
  const prm = [];
  for (let i = 1; i < theValue; i += 1) {
    prm.push(quickBuy().then(quickDone));
  }
  allthen(prm, normalBuy);
}

function injectQuickBuy() {
  fshDiv = createDiv({
    className: 'fshClear',
    textContent: 'Select how many to quick-buy:',
  });
  numInput = createInput({
    id: 'buyAmount',
    className: 'fshNumberInput',
    min: 1,
    max: 99,
    value: 1,
    type: 'number',
  });
  insertElement(fshDiv, numInput);
  qbBtn = createButton({ textContent: 'Quick-buy' });
  onclick(qbBtn, qBuy);
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
  if (!dialog) { return; }
  jDialog = getJDialog();
  if (jDialog) { initQuickBuy(); }
}

export default function prepareShop() {
  $.subscribe(defShopPrompt, worldDialogShop);
}
