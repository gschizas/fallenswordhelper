import { t as indexAjaxData, aT as mercRE, av as defenderMultiplier, r as partial, s as createDocument, H as querySelectorArray } from './calfSystem-6e4b53e3.js';

function addMercStat(mouseover, stat, i) {
  return stat
    + Math.round(Number(mercRE[i].exec(mouseover)[1]) * defenderMultiplier);
}

function addMercStats(acc, merc) {
  return acc.map(partial(addMercStat, merc.dataset.tipped));
}

function addAllMercStats(mercElements) {
  return mercElements.reduce(addMercStats, [0, 0, 0, 0, 0]);
}

function transform(mercTotal) {
  return {
    attack: mercTotal[0],
    defense: mercTotal[1],
    armor: mercTotal[2],
    damage: mercTotal[3],
    hp: mercTotal[4],
  };
}

function parseMercStats(html) {
  const doc = createDocument(html);
  const mercElements = querySelectorArray('#pCC img[src*="/merc/"]', doc);
  const mercTotal = addAllMercStats(mercElements);
  return transform(mercTotal);
}

function getMercStats() {
  return indexAjaxData({
    cmd: 'guild',
    subcmd: 'mercs',
  }).then(parseMercStats);
}

export { getMercStats as g };
//# sourceMappingURL=getMercStats-ecfae282.js.map