import { x as getElementById, A as getText } from './calfSystem-b469667c.js';

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
//# sourceMappingURL=playerName-701fa211.js.map
