import {getElementById} from '../common/getElement';
import setValue from '../system/setValue';

export var pCC = getElementById('pCC');
export var pCR = getElementById('pCR');

export function playerId() {
  var thePlayerId = parseInt(getElementById('holdtext')
    .textContent.match(/fallensword.com\/\?ref=(\d+)/)[1], 10);
  setValue('playerID', thePlayerId);
  return thePlayerId;
}

export function playerName() {
  return getElementById('statbar-character').textContent;
}
