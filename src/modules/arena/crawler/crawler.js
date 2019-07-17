import all from '../../common/all';
import completed from '../../app/arena/completed';
import {entries} from '../../common/entries';
import hideQTip from '../../common/hideQTip';
import insertElement from '../../common/insertElement';
import on from '../../common/on';
import {pCC} from '../../support/layout';
import partial from '../../common/partial';
import results from '../../app/arena/results';
import round from '../../common/round';
import {createButton, createDiv} from '../../common/cElement';

let container;

function setWinner(arena, thisResult) {
  const lastBattle = thisResult.r[thisResult.r.length - 1];
  if (lastBattle.attacker_win) {
    arena.winner = lastBattle.attacker;
  } else {
    arena.winner = lastBattle.defender;
  }
}

async function getCombats(arena) {
  const thisResult = await results(arena.id);
  if (thisResult.s) {
    setWinner(arena, thisResult);
  }
  return arena;
}

function doRollup(obj, result) {
  result.players.forEach(function(player) {
    if (!obj[player.name]) {
      obj[player.name] = {
        novice_entered: 0,
        novice_won: 0,
        standard_entered: 0,
        standard_won: 0
      };
    }
    if (result.type === 0) {
      obj[player.name].novice_entered += 1;
    } else {
      obj[player.name].standard_entered += 1;
    }
  });
  if (result.type === 0) {
    obj[result.winner.name].novice_won += 1;
  } else {
    obj[result.winner.name].standard_won += 1;
  }
  return obj;
}

async function startCrawl(start) {
  hideQTip(start);
  start.remove();
  const thisComplete = await completed();
  if (!thisComplete.s) {return;}
  const prm = thisComplete.r.arenas.map(getCombats);
  const ary = await all(prm);
  // console.log(ary);
  const rollup = ary.reduce(doRollup, {});
  console.log( // eslint-disable-line no-console
    entries(rollup).map(([name, obj]) => {
      let standard_ratio = 0;
      if (obj.standard_entered !== 0) {
        standard_ratio = round(obj.standard_won / obj.standard_entered, 3);
      }
      return [
        name,
        obj.novice_entered,
        obj.novice_won,
        obj.standard_entered,
        obj.standard_won,
        standard_ratio
      ];
    }).sort((a, b) => b[4] - a[4] || b[3] - a[3] || b[2] - a[2])
  );
}

export default function crawler() {
  container = createDiv();
  const start = createButton({
    className: 'fshBl tip-static',
    dataset: {tipped: 'DANGER!'},
    textContent: 'Start crawl'
  });
  insertElement(container, start);
  insertElement(pCC, container);
  on(start, 'click', partial(startCrawl, start));
}
