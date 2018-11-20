import addCommas from '../../system/addCommas';
import {def_fetch_playerStats} from '../../support/constants';
import getValue from '../../system/getValue';
import infoBox from '../../common/infoBox';
import retryAjax from '../../ajax/retryAjax';
import setValue from '../../system/setValue';

var goldAmount;
var sendGoldonWorld;

export function doSendGold() { // jQuery
  if (!sendGoldonWorld) {return;}
  retryAjax({
    url: 'index.php',
    data: {
      no_mobile: 1,
      cmd: 'trade',
      subcmd: 'sendgold',
      xc: window.ajaxXC,
      target_username: $('#HelperSendTo').html(),
      gold_amount: $('#HelperSendAmt').html().replace(/[^\d]/g, '')
    }
  }).done(function(data) {
    var info = infoBox(data);
    if (info === 'You successfully sent gold!' || info === '') {
      setValue('currentGoldSentTotal',
        parseInt(getValue('currentGoldSentTotal'), 10) +
        parseInt(getValue('goldAmount'), 10));
      GameData.fetch(def_fetch_playerStats);
    }
  });
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

export function injectSendGoldOnWorld() { // jQuery
  sendGoldonWorld = getValue('sendGoldonWorld');
  if (!sendGoldonWorld) {return;}
  goldAmount = getValue('goldAmount');
  $('#statbar-gold-tooltip-general').append(
    '<dt class="stat-gold-sendTo">Send To:</dt>' +
    '<dd id="HelperSendTo">' + getValue('goldRecipient') + '</dd>' +
    '<dt class="stat-gold-sendAmt">Amount:</dt>' +
    '<dd id="HelperSendAmt">' + addCommas(goldAmount) + '</dd>' +
    '<dt class="stat-gold-sendTo">Send?</dt>' +
    '<dd><input id="HelperSendGold" value="Send!" class="custombutton" ' +
    'type="submit"><input type="hidden" id="xc" value=""</dd>' +
    '<dt class="stat-gold-sendTotal">Total Sent:</dt>' +
    '<dd id="HelperSendTotal">' +
      addCommas(getValue('currentGoldSentTotal')) + '</dd>'
  );
  $('#HelperSendGold').click(doSendGold);
  updateSendGoldOnWorld();
  $.subscribe('gold.stats-player', updateSendGoldOnWorld);
}
