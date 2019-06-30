import appGuildView from '../app/guild/view';
import guildView from './guildView';
import hasFailed from './hasFailed';
import partial from '../common/partial';

const doFallback = guildId => guildView(guildId);

function fallback(guildId, json) {
  if (hasFailed(json)) {return doFallback(guildId);}
  return json;
}

export default function daGuildView(guildId) {
  return appGuildView(guildId)
    .then(partial(fallback, guildId))
    .catch(partial(doFallback, guildId));
}
