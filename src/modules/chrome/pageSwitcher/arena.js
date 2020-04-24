// #if _DEV  //  arena results
import { results } from './loader';
// #endif
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

export default {
  '-': { '-': injectArena },
  dojoin: { '-': arenaDoJoin },
  join: { '-': arenaJoin },
  completed: { '-': completedArenas },
  pickmove: { '-': storeMoves },
  // #if _DEV  //  arena results
  results: { '-': results },
  // #endif
  setup: { '-': setupMoves },
};
