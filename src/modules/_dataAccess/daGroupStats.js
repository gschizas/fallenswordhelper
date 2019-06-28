import groupStats from './groupStats';
import groupsViewStats from '../app/guild/groups/viewStats';
import hasFailed from './hasFailed';
import partial from '../common/partial';

const doFallback = groupId => groupStats(groupId);

function fallback(groupId, json) {
  if (hasFailed(json)) {return doFallback(groupId);}
  return json;
}

export default function daGroupStats(groupId) {
  return groupsViewStats(groupId)
    .then(partial(fallback, groupId))
    .catch(partial(doFallback, groupId));
}
