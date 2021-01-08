import getPlayerName from './getPlayerName';
import playerName from '../common/playerName';

let haveSelf;
let isSelf;

export default function getIsSelf() {
  if (!haveSelf) {
    isSelf = getPlayerName() === playerName();
    haveSelf = true;
  }
  return isSelf;
}
