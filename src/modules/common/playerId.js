import {getElementById} from './getElement';
import getText from './getText';

var thePlayerId;

export default function playerId() {
  if (!thePlayerId) {
    thePlayerId = Number(
      getText(getElementById('holdtext'))
        .match(/fallensword.com\/\?ref=(\d+)/)[1]
    );
  }
  return thePlayerId;
}
