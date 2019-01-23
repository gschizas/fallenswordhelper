import createDocument from '../system/createDocument';
import indexAjax from './indexAjax';
import partial from '../common/partial';
import querySelectorArray from '../common/querySelectorArray';
import {defenderMultiplier, mercRE} from '../support/constants';

function addMercStat(mouseover, stat, i) {
  return stat +
    Math.round(Number(mercRE[i].exec(mouseover)[1]) * defenderMultiplier);
}

function addMercStats(prev, merc) {
  return prev.map(partial(addMercStat, merc.dataset.tipped));
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
    hp: mercTotal[4]
  };
}

function parseMercStats(html) {
  var doc = createDocument(html);
  var mercElements = querySelectorArray('#pCC img[src*="/merc/"]', doc);
  var mercTotal = addAllMercStats(mercElements);
  return transform(mercTotal);
}

export default function getMercStats() {
  return indexAjax({
    cmd: 'guild',
    subcmd: 'mercs',
    no_mobile: '1'
  }).pipe(parseMercStats);
}
