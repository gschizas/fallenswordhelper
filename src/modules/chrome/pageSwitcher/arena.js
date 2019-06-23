import arenaDoJoin from '../../arena/arenaDoJoin';
import arenaJoin from '../../arena/arenaJoin';
import completedArenas from '../../arena/completedArenas';
import {injectArena} from '../../arena/arena';
import setupMoves from '../../arena/setup';
import storeMoves from '../../arena/store';

export default {
  '-': {'-': injectArena},
  dojoin: {'-': arenaDoJoin},
  join: {'-': arenaJoin},
  completed: {'-': completedArenas},
  pickmove: {'-': storeMoves},
  setup: {'-': setupMoves}
};
