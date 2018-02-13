import createDocument from './system/createDocument';
import jQueryPresent from './common/jQueryPresent';
import retryAjax from './ajax/retryAjax';

var playerBank = {
  headText: 'Bank',
  appLink: true,
  depoPos: 2,
  balPos: 1,
  data: {
    no_mobile: 1,
    cmd: 'bank',
    subcmd: 'transaction'
  },
  initWithdraw: ''
};
var guildBank = {
  headText: 'Guild Bank',
  appLink: false,
  depoPos: 3,
  balPos: 2,
  data: {
    no_mobile: 1,
    cmd: 'guild',
    subcmd: 'bank',
    subcmd2: 'transaction'
  },
  initWithdraw: '1'
};
var bankSettings;

function doInfoBox(infoBox) { // jQuery
  var target = $('#pCC #info-msg');
  if (target.length === 0) {
    $('#pCC').prepend(infoBox.closest('table'));
  } else {
    target.closest('table').replaceWith(infoBox.closest('table'));
  }
}

function disableDepo(o) { // jQuery
  if ($('#pCC b').eq(o.depoPos).text() === '0') {
    $('#pCC input[value="Deposit"]').prop('disabled', true);
  }
}

function updateDepoAmount(o, doc) { // jQuery
  if (o.data.deposit_amount !== '1') {
    $('#pCC #deposit_amount').val($('#pCC #deposit_amount', doc).val());
  } else {
    $('#pCC #deposit_amount').val('1');
  }
}

function transResponse(response) { // jQuery
  var doc = createDocument(response);
  var infoBox = $('#pCC #info-msg', doc);
  if (infoBox.length === 0) {return;}
  doInfoBox(infoBox);
  $('#pH #statbar-gold').text($('#pH #statbar-gold', doc).text());
  $('#pH #statbar-gold-tooltip-general dd').text(function(index) {
    return $('#pH #statbar-gold-tooltip-general dd', doc).eq(index).text();
  });
  var o = bankSettings;
  $('#pCC b').slice(o.balPos).text(function(index) {
    return $('#pCC b', doc).slice(o.balPos).eq(index).text();
  });
  disableDepo(o);
  updateDepoAmount(o, doc);
  $('#pCC #withdraw_amount').val(o.initWithdraw);
}

function invalidAmount(o, amount) { // jQuery
  return $('#pCC b').eq(o.depoPos).text() === '0' ||
    !$.isNumeric(amount) || amount < 1;
}

function doAjax(oData) {
  retryAjax({url: 'index.php', data: oData}).done(transResponse);
}

function bankDeposit(e) { // jQuery
  e.preventDefault();
  var o = bankSettings;
  var amount = $('#pCC #deposit_amount').val();
  if (invalidAmount(o, amount)) {return;}
  o.data.mode = 'deposit';
  o.data.deposit_amount = amount;
  doAjax(o.data);
}

function bankWithdrawal(e) { // jQuery
  e.preventDefault();
  var o = bankSettings;
  var amount = $('#pCC #withdraw_amount').val();
  if (!$.isNumeric(amount) || amount < 1) {return;}
  o.data.mode = 'withdraw';
  o.data.withdraw_amount = amount;
  doAjax(o.data);
}

function linkToGuildBank(o, bank) { // jQuery
  if (o.appLink) {
    bank.eq(0).closest('tr').after('<tr><td colspan="3" align="center">' +
      '<a href="/index.php?cmd=guild&subcmd=bank">Go to Guild Bank</a>' +
      '</td></tr>');
  }
}

function captureButtons(o, depo, withdraw) { // jQuery
  if ($('#pCC b').eq(o.depoPos).text() === '0') { // Check Deposits Available
    depo.prop('disabled', true);
  } else {
    depo.click(bankDeposit);
  }
  withdraw.click(bankWithdrawal);
}

function appLink(o, bank) { // jQuery
  linkToGuildBank(o, bank);
  var depo = $('#pCC input[value="Deposit"]');
  if (depo.length !== 1) {return;}
  var withdraw = $('#pCC input[value="Withdraw"]');
  if (withdraw.length !== 1) {return;}
  captureButtons(o, depo, withdraw);
}

function hasJquery() { // jQuery
  var o = bankSettings;
  var bank = $('#pCC b');
  if (bank.length !== 0 && bank.eq(0).text() === o.headText) {
    appLink(o, bank);
  }
}

function ajaxifyBank() {
  if (jQueryPresent()) {hasJquery();}
}

export function injectGuildBank() {
  bankSettings = guildBank;
  ajaxifyBank();
}

export function injectBank() {
  bankSettings = playerBank;
  ajaxifyBank();
}
