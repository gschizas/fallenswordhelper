import appFindPlayer from '../app/findplayer';
import findPlayer from './findPlayer';
import hasFailed from './hasFailed';
import partial from '../common/partial';

const doFallback = username => findPlayer(username);

function fallback(username, json) {
  if (hasFailed(json)) {return doFallback(username);}
  return json;
}

export default function daFindPlayer(username) {
  return appFindPlayer(username)
    .then(partial(fallback, username))
    .catch(partial(doFallback, username));
}
