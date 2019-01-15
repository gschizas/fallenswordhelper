import completedArenas from '../../arena/completedArenas';
import {injectArena} from '../../arena/arena';
import setupMoves from '../../arena/setup';
import storeMoves from '../../arena/store';

export default {
  '-': {'-': {'-': {'-': injectArena}}},
  join: {'-': {'-': {'-': injectArena}}},
  completed: {'-': {'-': {'-': completedArenas}}},
  pickmove: {'-': {'-': {'-': storeMoves}}},
  setup: {'-': {'-': {'-': setupMoves}}}
};
