import { y as getElementById, B as getText } from './calfSystem-d357ca6f.js';

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
//# sourceMappingURL=playerName-35237fe6.js.map
