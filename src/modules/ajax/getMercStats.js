import createDocument from '../system/createDocument';
import partial from '../common/partial';
import retryAjax from './retryAjax';
import {defenderMultiplier, mercRE} from '../support/constants';

function addMercStat(mouseover, stat, i) {
  return stat +
    Math.round(Number(mercRE[i].exec(mouseover)[1]) * defenderMultiplier);
}

function addMercStats(prev, merc) {
  return prev.map(partial(addMercStat, merc.dataset.tipped));
}

function addAllMercStats(mercElements) {
  return Array.prototype.reduce.call(mercElements, addMercStats,
    [0, 0, 0, 0, 0]);
}

function transform(mercTotal) {
  return {
    attack: mercTotal[0],
    defense: mercTotal[1],
    armor: mercTotal[2],
    damage: mercTotal[3],
    hp: mercTotal[4]
  };
}

function parseMercStats(html) {
  var doc = createDocument(html);
  var mercElements = doc.querySelectorAll('#pCC img[src*="/merc/"]');
  var mercTotal = addAllMercStats(mercElements);
  return transform(mercTotal);
}

export default function getMercStats() {
  return retryAjax(
    'index.php?no_mobile=1&cmd=guild&subcmd=mercs').pipe(parseMercStats);
}
