import getElementsByTagName from '../common/getElementsByTagName';
import getText from '../common/getText';
import { pCC } from '../support/layout';

let playerName;

export default function getPlayerName() {
  if (!playerName) {
    playerName = getText(getElementsByTagName('h1', pCC)[0]);
  }
  return playerName;
}
