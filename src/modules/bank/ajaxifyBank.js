import createDocument from '../system/createDocument';
import indexAjaxData from '../ajax/indexAjaxData';
import jQueryPresent from '../common/jQueryPresent';
import partial from '../common/partial';
import {def_table, guildSubcmdUrl} from '../support/constants';

var statbarGold = '#pH #statbar-gold';
var statbarGoldTooltip = '#pH #statbar-gold-tooltip-general dd';
var pccB = '#pCC b';
var infoMsg = '#pCC #info-msg';
var withdrawAmount = '#pCC #withdraw_amount';
var depositAmount = '#pCC #deposit_amount';
var disabled = 'disabled';
var inputDepo = '#pCC input[value="Deposit"]';

function doInfoBox(infoBox) { // jQuery
  var target = $(infoMsg);
  if (target.length === 0) {
    $('#pCC').prepend(infoBox.closest(def_table));
  } else {
    target.closest(def_table).replaceWith(infoBox.closest(def_table));
  }
}

function eachGoldValue(doc, index) {
  return $(statbarGoldTooltip, doc).eq(index).text();
}

function doStatBarGold(doc) {
  $(statbarGold).text($(statbarGold, doc).text());
  $(statbarGoldTooltip).text(partial(eachGoldValue, doc));
}

function newStats(doc, balPos, index) {
  return $(pccB, doc).slice(balPos).eq(index).text();
}

function doBoldText(doc, balPos) {
  $(pccB).slice(balPos).text(partial(newStats, doc, balPos));
}

function disableDepo(depoPos) { // jQuery
  if ($(pccB).eq(depoPos).text() === '0') {
    $(inputDepo).prop(disabled, true);
  }
}

function updateDepoAmount(o, doc) { // jQuery
  if (o.data.amount !== '1') {
    $(depositAmount).val($(depositAmount, doc).val());
  } else {
    $(depositAmount).val('1');
  }
}

function replaceValues(bankSettings, doc, infoBox) {
  doInfoBox(infoBox);
  doStatBarGold(doc);
  doBoldText(doc, bankSettings.balPos);
  disableDepo(bankSettings.depoPos);
  updateDepoAmount(bankSettings, doc);
  $(withdrawAmount).val(bankSettings.initWithdraw);
}

function transResponse(bankSettings, response) { // jQuery
  var doc = createDocument(response);
  var infoBox = $(infoMsg, doc);
  if (infoBox.length === 0) {return;}
  replaceValues(bankSettings, doc, infoBox);
}

function invalidAmount(o, amount) { // jQuery
  return $(pccB).eq(o.depoPos).text() === '0' ||
    !$.isNumeric(amount) || amount < 1;
}

function doAjax(bankSettings) {
  indexAjaxData(bankSettings.data).then(partial(transResponse, bankSettings));
}

function bankDeposit(bankSettings, e) { // jQuery
  e.preventDefault();
  var amount = $(depositAmount).val();
  if (invalidAmount(bankSettings, amount)) {return;}
  bankSettings.data.mode = 'deposit';
  bankSettings.data.amount = amount;
  doAjax(bankSettings);
}

function bankWithdrawal(bankSettings, e) { // jQuery
  e.preventDefault();
  var amount = $(withdrawAmount).val();
  if (!$.isNumeric(amount) || amount < 1) {return;}
  bankSettings.data.mode = 'withdraw';
  bankSettings.data.amount = amount;
  doAjax(bankSettings);
}

function linkToGuildBank(bankSettings, bank) { // jQuery
  if (bankSettings.appLink) {
    bank.after('<div class="fshCenter">' +
      '<a href="' + guildSubcmdUrl + 'bank">Go to Guild Bank</a>' +
      '</div>');
  }
}

function captureButtons(bankSettings, depo, withdraw) { // jQuery
  if ($(pccB).eq(bankSettings.depoPos).text() === '0') { // Check Deposits Available
    depo.prop(disabled, true);
  } else {
    depo.on('click', partial(bankDeposit, bankSettings));
  }
  withdraw.on('click', partial(bankWithdrawal, bankSettings));
}

function appLink(bankSettings, bank) { // jQuery
  linkToGuildBank(bankSettings, bank);
  var depo = $(inputDepo);
  if (depo.length !== 1) {return;}
  var withdraw = $('#pCC input[value="Withdraw"]');
  if (withdraw.length !== 1) {return;}
  captureButtons(bankSettings, depo, withdraw);
}

function hasJquery(bankSettings) { // jQuery
  var bank = $(bankSettings.headSelector);
  if (bank.length !== 0 && bank.eq(0).text() === bankSettings.headText) {
    appLink(bankSettings, bank);
  }
}

export default function ajaxifyBank(bankSettings) {
  if (jQueryPresent()) {hasJquery(bankSettings);}
}
