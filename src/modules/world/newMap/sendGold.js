import addCommas from '../../system/addCommas';
import getValue from '../../system/getValue';
import indexAjaxData from '../../ajax/indexAjaxData';
import infoBox from '../../common/infoBox';
import setValue from '../../system/setValue';
import {def_fetch_playerStats, def_playerGold} from '../../support/constants';

var goldAmount;
var sendGoldonWorld;

function doneSendGold(data) {
  var info = infoBox(data);
  if (info === 'You successfully sent gold!' || info === '') {
    setValue('currentGoldSentTotal',
      parseInt(getValue('currentGoldSentTotal'), 10) +
      parseInt(getValue('goldAmount'), 10));
    GameData.fetch(def_fetch_playerStats);
  }
}

export function doSendGold() { // jQuery
  if (!sendGoldonWorld) {return;}
  indexAjaxData({
    cmd: 'trade',
    subcmd: 'sendgold',
    xc: window.ajaxXC,
    target_username: $('#HelperSendTo').html(),
    gold_amount: $('#HelperSendAmt').html().replace(/[^\d]/g, '')
  }).done(doneSendGold);
}

function statbarGoldBackground(colour) {
  $('#statbar-gold').css('background-color', colour);
}

function updateSendGoldOnWorld() { // jQuery
  $('#HelperSendTotal').html(addCommas(getValue('currentGoldSentTotal')));
  if (Number(GameData.player().gold) > goldAmount) {
    statbarGoldBackground('red');
  } else {
    statbarGoldBackground('inherit');
  }
}

function extraHtml() {
  return '<dt class="stat-gold-sendTo">Send To:</dt>' +
    '<dd id="HelperSendTo">' + getValue('goldRecipient') + '</dd>' +
    '<dt class="stat-gold-sendAmt">Amount:</dt>' +
    '<dd id="HelperSendAmt">' + addCommas(goldAmount) + '</dd>' +
    '<dt class="stat-gold-sendTo">Send?</dt>' +
    '<dd><input id="HelperSendGold" value="Send!" class="custombutton" ' +
    'type="submit"><input type="hidden" id="xc" value=""</dd>' +
    '<dt class="stat-gold-sendTotal">Total Sent:</dt>' +
    '<dd id="HelperSendTotal">' +
      addCommas(getValue('currentGoldSentTotal')) + '</dd>';
}

function prepareSendGoldOnWorld() {
  goldAmount = getValue('goldAmount');
  $('#statbar-gold-tooltip-general').append(extraHtml());
  $('#HelperSendGold').click(doSendGold);
  updateSendGoldOnWorld();
  $.subscribe(def_playerGold, updateSendGoldOnWorld);
}

export function injectSendGoldOnWorld() { // jQuery
  sendGoldonWorld = getValue('sendGoldonWorld');
  if (sendGoldonWorld) {prepareSendGoldOnWorld();}
}
