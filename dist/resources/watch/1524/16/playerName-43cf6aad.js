import { x as getElementById, A as getText } from './calfSystem-6e4b53e3.js';

let thisPlayerName;

function playerName() {
  if (!thisPlayerName) {
    const statBarCharacter = getElementById('statbar-character');
    if (statBarCharacter) {
      thisPlayerName = getText(statBarCharacter);
    }
  }
  return thisPlayerName;
}

export { playerName as p };
//# sourceMappingURL=playerName-43cf6aad.js.map
