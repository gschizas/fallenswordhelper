import {getElementById} from '../common/getElement';

var thisPlayerName;

export default function playerName() {
  if (!thisPlayerName) {
    thisPlayerName = getElementById('statbar-character').textContent;
  }
  return thisPlayerName;
}
