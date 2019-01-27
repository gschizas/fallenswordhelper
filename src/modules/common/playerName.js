import {getElementById} from './getElement';
import getText from './getText';

var thisPlayerName;

export default function playerName() {
  if (!thisPlayerName) {
    var statBarCharacter = getElementById('statbar-character');
    if (statBarCharacter) {
      thisPlayerName = getText(statBarCharacter);
    }
  }
  return thisPlayerName;
}
