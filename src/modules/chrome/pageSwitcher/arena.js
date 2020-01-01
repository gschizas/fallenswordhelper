import arenaDoJoin from '../../arena/arenaDoJoin';
import arenaJoin from '../../arena/arenaJoin/arenaJoin';
import completedArenas from '../../arena/completedArenas';
import {injectArena} from '../../arena/arena';
//#if _DEV  //  arena results
import results from '../../arena/results';
//#endif
import setupMoves from '../../arena/arenaSetup/setup';
import storeMoves from '../../arena/store';

export default {
  '-': {'-': injectArena},
  dojoin: {'-': arenaDoJoin},
  join: {'-': arenaJoin},
  completed: {'-': completedArenas},
  pickmove: {'-': storeMoves},
  //#if _DEV  //  arena results
  results: {'-': results},
  //#endif
  setup: {'-': setupMoves}
};
