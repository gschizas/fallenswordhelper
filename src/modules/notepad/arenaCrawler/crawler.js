import all from '../../common/all';
import {assign} from '../../common/assign';
import completed from '../../app/arena/completed';
import {entries} from '../../common/entries';
import {fromEntries} from '../../common/fromEntries';
import insertElement from '../../common/insertElement';
import {pCC} from '../../support/layout';
import partial from '../../common/partial';
// import {removeKeys} from '../../common/removeKeys';
import results from '../../app/arena/results';
import round from '../../common/round';
import {createAnchor, createBr} from '../../common/cElement';
import {cyrb32, cyrb53, makeHash} from './makeHash';
import {get, set} from '../../system/idb';

const tabDelimited = (s, a) => s.concat(a.join('\t'), '\n');
const byWins = (a, b) => b[2] - a[2] || b[1] - a[1];
const addWinners = (arenaWinners, [name, entered]) =>
  [name, entered, arenaWinners[name] || 0];

function calcRatio(dividend, divisor) {
  let ratio = 0;
  if (divisor !== 0) {ratio = round(dividend / divisor, 3);}
  return ratio;
}

const addRatio = ([name, entered, wins]) =>
  [name, entered, wins, calcRatio(wins, entered)];

function findWinner(result) {
  const lastBattle = result.r[result.r.length - 1];
  if (lastBattle.attacker_win) {
    return lastBattle.attacker.name;
  }
  return lastBattle.defender.name;
}

async function getWinner(id) {
  const thisResult = await results(id);
  return [id, findWinner(thisResult)];
}

function makeDownloadAnchor(output, type, filename, text) {
  const blob = new Blob([output], {type});
  const url = URL.createObjectURL(blob);
  const anchor = createAnchor({
    download: filename,
    href: url,
    textContent: text
  });
  insertElement(pCC, anchor);
  insertElement(pCC, createBr());
}

// function makeArenaWins(typeWins) {
//   const sorted = typeWins.sort((a, b) => b[7] - a[7]);
//   const csv = sorted.reduce(tabDelimited,
//     'player\ttotal entered\ttotal won\tnovice entered\tnovice won\t' +
//     'novice ratio\tstandard entered\tstandard won\tstandard ratio\t' +
//     'basic entered\tbasic won\tbasic ratio\tmoves entered\tmoves won\t' +
//     'moves ratio\n');
//   makeDownloadAnchor(csv,
//     'text/plain', 'arena_wins.txt', 'arena_wins');
// }

const joinedFields = ['pvpId', 'helmet', 'armor', 'gloves', 'boots', 'weapon',
  'shield', 'ring', 'amulet', 'rune', 'stat_attack', 'stat_defense',
  'stat_armor', 'stat_damage', 'stat_hp', 'winner', 'cyrb32', 'cyrb53'];

async function makeArenaJoined(listOfWinners) {
  const fsh_arenaJoined = await get('fsh_arenaJoined');
  if (!fsh_arenaJoined) {return;}
  const output = fsh_arenaJoined
    .map(o =>
      fromEntries(entries(o)
        .concat([['winner', listOfWinners[o.pvpId]]])
        .concat([['cyrb32', makeHash(cyrb32, o)]])
        .concat([['cyrb53', makeHash(cyrb53, o)]])
      )
    )
    .map(o => joinedFields.map(j => o[j]))
    .reduce(tabDelimited, joinedFields.join('\t') + '\n');
  makeDownloadAnchor(output,
    'text/plain', 'fsh_arenaJoined.txt', 'fsh_arenaJoined');
}

function occurences(obj, player) {
  if (!obj[player]) {obj[player] = 0;}
  obj[player] += 1;
  return obj;
}

function countEntries(ary) {
  return entries([].concat(...ary.map(o => o.players)).reduce(occurences, {}));
}

async function getListOfWinners(thisArenas) {
  const fsh_arenaWinners = await get('fsh_arenaWinners') || {};
  const winnersToGet = thisArenas.filter(a => !fsh_arenaWinners[a.id])
    .map(o => o.id);
  const prm = winnersToGet.map(getWinner);
  const newWinners = fromEntries(await all(prm));
  const combinedWinners = assign(fsh_arenaWinners, newWinners);
  set('fsh_arenaWinners', combinedWinners);
  return combinedWinners;
}

function countWinners(ary) {
  return ary.map(o => o.winner).reduce(occurences, {});
}

function processArenas(arenas) {
  const arenaEntries = countEntries(arenas);
  const arenaWinners = countWinners(arenas);
  return arenaEntries
    .map(partial(addWinners, arenaWinners))
    .map(addRatio)
    .sort(byWins);
}

async function processCompleted(thisComplete) {
  // console.log('thisComplete', thisComplete);
  const thisArenas = thisComplete.r.arenas;
  // console.log('thisArenas', thisArenas);

  const listOfWinners = await getListOfWinners(thisArenas);
  // console.log('listOfWinners', listOfWinners);

  const arenaStandard = thisArenas.filter(o => o.type === 1).map(o => ({
    id: o.id,
    players: o.players.map(p => p.name),
    specials: o.specials,
    winner: listOfWinners[o.id]
  }));

  const arenaBasicStats = processArenas(arenaStandard.filter(o => !o.specials));
  console.log('arenaBasicStats', arenaBasicStats); // eslint-disable-line no-console

  const arenaSpecialStats =
    processArenas(arenaStandard.filter(o => o.specials));
  console.log('arenaSpecialStats', arenaSpecialStats); // eslint-disable-line no-console

  // makeArenaWins(typeWins);
  await makeArenaJoined(listOfWinners);
}

export default async function crawler() {
  const thisComplete = await completed();
  if (thisComplete.s) {processCompleted(thisComplete);}
}
