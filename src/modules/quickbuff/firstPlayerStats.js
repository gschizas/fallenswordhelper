import {getElementById} from '../common/getElement';
import getElementsByTagName from '../common/getElementsByTagName';

var retries = 0;

function waitForPlayer(firstPlayer) {
  return !firstPlayer && retries < 9;
}

function haveTargets() {
  var firstPlayer = getElementsByTagName('h1', getElementById('players'))[0];
  if (waitForPlayer(firstPlayer)) {
    retries += 1;
    setTimeout(haveTargets, 100);
    return;
  }
  if (!firstPlayer) {return;}
  firstPlayer.click();
}

export default function firstPlayerStats() {
  var targets = getElementById('targetPlayers')
    .getAttribute('value');
  if (targets && targets !== '') {haveTargets();}
}
