import bazaarBuy from './bazaarBuy';
import buyitem from '../app/potionbazaar/buyitem';
import hasFailed from './hasFailed';
import partial from '../common/partial';

function doFallback(item) {
  return bazaarBuy(item);
}

function fallback(item, json) {
  if (hasFailed(json)) {return doFallback(item);}
  return json;
}

export default function daBazaarBuy(item) {
  return buyitem(item)
    .then(partial(fallback, item))
    .catch(partial(doFallback, item));
}
