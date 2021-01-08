import runDefault from '../../common/runDefault';

const injectArena = () => { runDefault(import('../../arena/arena')); };
const arenaDoJoin = () => { runDefault(import('../../arena/arenaDoJoin')); };
const arenaJoin = () => {
  runDefault(import('../../arena/arenaJoin/arenaJoin'));
};
const completedArenas = () => {
  runDefault(import('../../arena/completedArenas'));
};
const setupMoves = () => {
  runDefault(import('../../arena/arenaSetup/setup'));
};
const storeMoves = () => { runDefault(import('../../arena/store')); };
const results = () => { runDefault(import('../../arena/results')); };

const arena = {
  '-': { '-': injectArena },
  dojoin: { '-': arenaDoJoin },
  join: { '-': arenaJoin },
  completed: { '-': completedArenas },
  pickmove: { '-': storeMoves },
  setup: { '-': setupMoves },
};

// eslint-disable-next-line no-unused-labels, no-labels
devLbl: { //  arena results
  arena.results = { '-': results };
}

export default arena;
