var memberNamesAsStrings;
var listOfAllies;
var listOfEnemies;

function setColour(el, col) {
  el.classList.add(col);
}

function isEnemy(playerName, playerElement) {
  if (listOfEnemies.includes(playerName)) {
    setColour(playerElement, 'fshRed');
  }
}

function isAlly(playerName, playerElement) {
  if (listOfAllies.includes(playerName)) {
    setColour(playerElement, 'fshBlue');
  }
}

export function playerColor(colorPlayerName, playerName, playerElement) {
  if (!colorPlayerName) {return false;}
  if (memberNamesAsStrings.includes(playerName)) {
    setColour(playerElement, 'fshGreen');
    return true;
  }
  isEnemy(playerName, playerElement);
  isAlly(playerName, playerElement);
  return false;
}

export function getKeys(data) {
  memberNamesAsStrings = Object.keys(data);
}

function justUsername(obj) {
  return obj.username;
}

export function prepareAlliesEnemies(data) {
  listOfAllies = data._allies.map(justUsername);
  listOfEnemies = data._enemies.map(justUsername);
}
