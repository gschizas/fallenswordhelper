import gsTake from './gsTake';
import hasFailed from './hasFailed';
import partial from '../common/partial';
import takeitem from '../app/guild/inventory/takeitem';

function doFallback(invId) {
  return gsTake(invId);
}

function fallback(invId, json) {
  if (hasFailed(json)) {return doFallback(invId);}
  return json;
}

export default function daGsTake(invId) {
  return takeitem(invId)
    .then(partial(fallback, invId))
    .catch(partial(doFallback, invId));
}
