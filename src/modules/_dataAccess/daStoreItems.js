import dostoreitems from '../app/guild/inventory/dostoreitems';
import hasFailed from './hasFailed';
import partial from '../common/partial';
import storeitems from './storeitems';

function doFallback(invIdAry) {
  return storeitems(invIdAry);
}

function fallback(invIdAry, json) {
  if (hasFailed(json)) {return doFallback(invIdAry);}
  return json;
}

export default function daStoreItems(invIdAry) {
  return dostoreitems(invIdAry)
    .then(partial(fallback, invIdAry))
    .catch(partial(doFallback, invIdAry));
}
