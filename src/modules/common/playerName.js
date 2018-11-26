import {getElementById} from './getElement';

var thisPlayerName;

export default function playerName() {
  if (!thisPlayerName) {
    var statBarCharacter = getElementById('statbar-character');
    if (statBarCharacter) {
      thisPlayerName = statBarCharacter.textContent;
    }
  }
  return thisPlayerName;
}
