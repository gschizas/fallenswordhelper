import * as dataObj from '../support/dataObj';
import * as system from '../support/system';

function parseMercStats(html) {
  var doc = system.createDocument(html);
  var mercElements = doc.querySelectorAll('#pCC img[src*="/merc/"]');
  var mercTotal = [0, 0, 0, 0, 0];
  Array.prototype.forEach.call(mercElements, function(merc) {
    var mouseoverText = merc.dataset.tipped;
    mercTotal = mercTotal.map(function(el, i) {
      return el + Number(dataObj.mercRE[i].exec(mouseoverText)[1]);
    });
  });
  mercTotal = mercTotal.map(function(el) {
    return Math.round(el * dataObj.defenderMultiplier);
  });
  return {
    attack: mercTotal[0],
    defense: mercTotal[1],
    armor: mercTotal[2],
    damage: mercTotal[3],
    hp: mercTotal[4]
  };
}

export default function getMercStats() {
  return $.ajax('index.php?cmd=guild&subcmd=mercs').pipe(parseMercStats);
}
