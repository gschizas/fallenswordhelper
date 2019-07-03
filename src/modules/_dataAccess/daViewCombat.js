import appViewCombat from '../app/combat/view';
import hasFailed from './hasFailed';
import partial from '../common/partial';
import viewCombat from './viewCombat';

const doFallback = id => viewCombat(id);

function fallback(id, json) {
  if (hasFailed(json)) {return doFallback(id);}
  return json;
}

export default function daViewCombat(id) {
  return appViewCombat(id)
    .then(partial(fallback, id))
    .catch(partial(doFallback, id));
}
