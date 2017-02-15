import * as system from '../support/system';
import * as layout from '../support/layout';

export function doSendGold() { // jQuery
  $.ajax({
    url: 'index.php',
    data: {
      cmd : 'trade',
      subcmd: 'sendgold',
      xc: window.ajaxXC,
      target_username: $('#HelperSendTo').html(),
      gold_amount: $('#HelperSendAmt').html().replace(/[^\d]/g,'')
    }
  }).done(function(data) {
    var info = layout.infoBox(data);
    if (info === 'You successfully sent gold!' || info === '') {
      system.setValue('currentGoldSentTotal',
        parseInt(system.getValue('currentGoldSentTotal'), 10) +
        parseInt(system.getValue('goldAmount'), 10));
      GameData.fetch(387);
    }
  });
}

export function injectSendGoldOnWorld() { // jQuery
  $('#statbar-gold-tooltip-general').append(
    '<dt class="stat-gold-sendTo">Send To:</dt>' +
    '<dd id="HelperSendTo">' + system.getValue('goldRecipient') +
    '</dd>' + 
    '<dt class="stat-gold-sendAmt">Amount:</dt>' +
    '<dd id="HelperSendAmt">' + system.getValue('goldAmount')
    .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,') + '</dd>' +
    '<dt class="stat-gold-sendTo">Send?</dt>' +
    '<dd><input id="HelperSendGold" value="Send!" class="custombutton" ' +
    'type="submit"><input type="hidden" id="xc" value=""</dd>' +
    '<dt class="stat-gold-sendTotal">Total Sent:</dt>' +
    '<dd id="HelperSendTotal">' +
      system.getValue('currentGoldSentTotal')
        .toString()
        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,') +
      '</dd>');
  $('#HelperSendGold').click(doSendGold);
}

export function updateSendGoldOnWorld(data) { // jQuery
  $('#HelperSendTotal')
    .html(system.getValue('currentGoldSentTotal')
    .toString()
    .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,'));
  if (parseInt(data.player.gold, 10) >
    system.getValue('goldAmount')){
    $('#statbar-gold').css('background-color','red');
  }else{
    $('#statbar-gold').css('background-color','inherit');
  }
}
