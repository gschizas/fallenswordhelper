import all from '../../common/all';
import completed from '../../app/arena/completed';
import {removeKeys} from '../../common/removeKeys';
import results from '../../app/arena/results';
import round from '../../common/round';

function addArenaInfoToPlayers(o) {
  const tmpObj = removeKeys(['id', 'players'], o);
  tmpObj.arena_id = o.id;
  return o.players.map(p => Object.assign(
    {player_id: p.id, name: p.name, win: p.win}, tmpObj));
}

function getJoinsByPlayer(o, p) {
  o[p.name] = o[p.name] || [p.name, []];
  o[p.name][1].push(p);
  return o;
}

function calcRatio(dividend, divisor) {
  let ratio = 0;
  if (divisor !== 0) {ratio = round(dividend / divisor, 3);}
  return ratio;
}

// const thisSort = (a, b) => b[4] - a[4] || b[3] - a[3] || b[2] - a[2];

function setWinner(arena, thisResult) {
  const lastBattle = thisResult.r[thisResult.r.length - 1];
  let thisWinner = 0;
  if (lastBattle.attacker_win) {
    thisWinner = lastBattle.attacker.id;
  } else {
    thisWinner = lastBattle.defender.id;
  }
  arena.players.forEach(p => {
    if (p.id === thisWinner) {
      p.win = 1;
    } else {
      p.win = 0;
    }
  });
}

async function getCombats(arena) {
  const thisResult = await results(arena.id);
  if (thisResult.s) {
    setWinner(arena, thisResult);
  }
  return arena;
}

function breakdown(ary) {
  const joins = ary.length;
  const wins = ary.filter(o => o.win === 1).length;
  return [joins, wins, calcRatio(wins, joins)];
}

export default async function crawler() {
  const thisComplete = await completed();
  if (!thisComplete.s) {return;}
  const prm = thisComplete.r.arenas.map(getCombats);
  const ary = await all(prm);
  // console.log(ary);
  const playerJoins = [].concat(...ary.map(addArenaInfoToPlayers));
  // console.log(playerJoins);
  const joinsByPlayer = Object.values(playerJoins.reduce(getJoinsByPlayer, {}));
  // console.log(joinsByPlayer);
  const overallTotals = joinsByPlayer.map(a => [
    a[0],
    a[1].length,
    a[1].filter(o => o.win === 1).length,
    a[1].filter(o => o.type === 0),
    a[1].filter(o => o.type === 1)
  ]);
  // console.log(overallTotals);
  const byType = overallTotals.map(a => a.slice(0, -2).concat(
    breakdown(a[3]),
    breakdown(a[4]),
    [
      a[4].filter(o => !o.specials),
      a[4].filter(o => o.specials)
    ]));
  // console.log(byType);
  const typeWins = byType.map(a => a.slice(0, -2).concat(
    breakdown(a[9]), breakdown(a[10])
  ));
  console.log(typeWins.sort((a, b) => b[7] - a[7]));
}
