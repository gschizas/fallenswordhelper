import doinvent from '../app/inventing/doinvent';
import hasFailed from './hasFailed';
import invent from './invent';
import partial from '../common/partial';

const doFallback = recipe => invent(recipe);

function fallback(recipe, json) {
  if (hasFailed(json)) {return doFallback(recipe);}
  return json;
}

export default function daDoInvent(recipe) {
  return doinvent(recipe)
    .then(partial(fallback, recipe))
    .catch(partial(doFallback, recipe));
}
