import hasFailed from './hasFailed';
import partial from '../common/partial';
import useItem from './useItem';
import useitem from '../app/profile/useitem';

function doFallback(item) {
  return useItem(item);
}

function fallback(item, json) {
  if (hasFailed(json)) {return doFallback(item);}
  return json;
}

export default function daUseItem(item) {
  return useitem(item)
    .then(partial(fallback, item))
    .catch(partial(doFallback, item));
}
