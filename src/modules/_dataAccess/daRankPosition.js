import hasFailed from './hasFailed';
import moveRank from './moveRank';
import partial from '../common/partial';
import rankPosition from '../app/guild/ranks/position';

const doFallback = (direction, rankId) => moveRank(direction, rankId);

function fallback(direction, rankId, json) {
  if (hasFailed(json)) {return doFallback(direction, rankId);}
  return json;
}

export default function daRankPosition(direction, rankId) {
  return rankPosition(direction, rankId)
    .then(partial(fallback, direction, rankId))
    .catch(partial(doFallback, direction, rankId));
}
