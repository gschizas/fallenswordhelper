import calf from '../../support/calf';
import hideNodeList from './hideNodeList';
import querySelectorAll from '../../common/querySelectorAll';

var hideBtn = [
  {
    condition: function() {return calf.hideGuildInfoTrade;},
    guildSelector: '#guild-minibox-action-trade',
    allySelector: '#online-allies-action-trade'
  },
  {
    condition: function() {return calf.hideGuildInfoSecureTrade;},
    guildSelector: '#guild-minibox-action-secure-trade',
    allySelector: '#online-allies-action-secure-trade'
  },
  {
    condition: function() {return calf.hideGuildInfoBuff;},
    guildSelector: '#guild-minibox-action-quickbuff',
    allySelector: '#online-allies-action-quickbuff'
  },
  {
    condition: function() {return calf.hideGuildInfoMessage;},
    guildSelector: '#guild-minibox-action-send-message',
    allySelector: '#online-allies-action-send-message'
  }
];

export default function doHideBtn(context, selector) {
  hideBtn.forEach(function(el) {
    if (el.condition()) {
      hideNodeList(querySelectorAll(el[selector], context));
    }
  });
}
