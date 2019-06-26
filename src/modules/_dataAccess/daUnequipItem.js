import hasFailed from './hasFailed';
import partial from '../common/partial';
import unequip from './unequip';
import unequipitem from '../app/profile/unequipitem';

function doFallback(item) {
  return unequip(item);
}

function fallback(item, json) {
  if (hasFailed(json)) {return doFallback(item);}
  return json;
}

export default function daUnequipItem(item) {
  return unequipitem(item)
    .then(partial(fallback, item))
    .catch(partial(doFallback, item));
}
