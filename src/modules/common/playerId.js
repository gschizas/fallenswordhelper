import {getElementById} from '../common/getElement';

var thePlayerId;

export default function playerId() {
  if (!thePlayerId) {
    thePlayerId = Number(
      getElementById('holdtext')
        .textContent.match(/fallensword.com\/\?ref=(\d+)/)[1]
    );
  }
  return thePlayerId;
}
