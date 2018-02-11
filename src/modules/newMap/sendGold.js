import getValue from '../system/getValue';
import {infoBox} from '../support/layout';
import retryAjax from '../ajax/retryAjax';
import setValue from '../system/setValue';

export function doSendGold() { // jQuery
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
      GameData.fetch(1);
    }
  });
}

export function injectSendGoldOnWorld() { // jQuery
  if (!getValue('sendGoldonWorld')) {return;}
  $('#statbar-gold-tooltip-general').append(
    '<dt class="stat-gold-sendTo">Send To:</dt>' +
    '<dd id="HelperSendTo">' + getValue('goldRecipient') +
    '</dd>' +
    '<dt class="stat-gold-sendAmt">Amount:</dt>' +
    '<dd id="HelperSendAmt">' + getValue('goldAmount')
      .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,') + '</dd>' +
    '<dt class="stat-gold-sendTo">Send?</dt>' +
    '<dd><input id="HelperSendGold" value="Send!" class="custombutton" ' +
    'type="submit"><input type="hidden" id="xc" value=""</dd>' +
    '<dt class="stat-gold-sendTotal">Total Sent:</dt>' +
    '<dd id="HelperSendTotal">' +
      getValue('currentGoldSentTotal')
        .toString()
        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,') +
      '</dd>');
  $('#HelperSendGold').click(doSendGold);
}

function updateGoldValue(data) {
  $('#HelperSendTotal')
    .html(getValue('currentGoldSentTotal')
      .toString()
      .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,'));
  if (parseInt(data.player.gold, 10) > getValue('goldAmount')) {
    $('#statbar-gold').css('background-color', 'red');
  } else {
    $('#statbar-gold').css('background-color', 'inherit');
  }
}

export function updateSendGoldOnWorld(data) { // jQuery
  if (data.player && getValue('sendGoldonWorld')) {
    updateGoldValue(data);
  }
}
