import guildInvRecall from './guildInvRecall';
import hasFailed from './hasFailed';
import partial from '../common/partial';
import recall from '../app/guild/inventory/recall';

function doFallback(invId, playerId, mode) {
  return guildInvRecall(invId, playerId, mode);
}

function fallback(invId, playerId, mode, json) {
  if (hasFailed(json)) {return doFallback(invId, playerId, mode);}
  return json;
}

export default function daGuildRecall(invId, playerId, mode) {
  return recall(invId, playerId, mode)
    .then(partial(fallback, invId, playerId, mode))
    .catch(partial(doFallback, invId, playerId, mode));
}
