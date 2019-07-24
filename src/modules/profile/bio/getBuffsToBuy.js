import calf from '../../support/calf';
import getElementsByTagName from '../../common/getElementsByTagName';
import getText from '../../common/getText';
import getValue from '../../system/getValue';
import {keys} from '../../common/keys';
import {pCC} from '../../support/layout';
import partial from '../../common/partial';
import playerName from '../../common/playerName';
import {sendEvent} from '../../support/fshGa';

function profileBuyBuffsEvent() {
  if (calf.subcmd === '-') {sendEvent('profile', 'formatBuffsToBuy');}
}

function getTargetPlayer() {
  var targetPlayer = getElementsByTagName('h1', pCC);
  if (targetPlayer.length !== 0) {
    targetPlayer = getText(targetPlayer[0]);
  } else {
    targetPlayer = playerName();
  }
  return targetPlayer;
}

var buyFormatter = [
  [
    function(greetingText) {return !greetingText.includes('{buffs}');},
    function(greetingText, buffsToBuy) {return greetingText + ' ' + buffsToBuy;}
  ],
  [
    function(greetingText) {return !greetingText.includes('{cost}');},
    function(greetingText, buffsToBuy) {
      return greetingText.replace(/{buffs}/g, '`~' + buffsToBuy + '~`');
    }
  ],
  [
    function() {return true;},
    function(greetingText, buffsToBuy, buffCost) {
      return greetingText
        .replace(/{buffs}/g, '`~' + buffsToBuy + '~`')
        .replace(/{cost}/g, buffCost.buffCostTotalText);
    }
  ]
];

function formatToUse(greetingText, el) {return el[0](greetingText);}

function formatGreetingText(greetingText, buffCost) {
  return buyFormatter.find(partial(formatToUse, greetingText))[1](
    greetingText, keys(buffCost.buffs).join(', '), buffCost);
}

function formatBuffsToBuy(buffCost) { // Legacy
  profileBuyBuffsEvent();
  var targetPlayer = getTargetPlayer();
  var greetingText = getValue('buyBuffsGreeting').trim();
  greetingText = greetingText.replace(/{playername}/g, targetPlayer);
  greetingText = formatGreetingText(greetingText, buffCost);
  window.openQuickMsgDialog(targetPlayer, greetingText, '');
}

export default function getBuffsToBuy(buffCost) { // Legacy
  if (buffCost.count > 0) {formatBuffsToBuy(buffCost);}
}
