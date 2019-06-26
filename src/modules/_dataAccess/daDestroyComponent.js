import destroyComponent from '../app/profile/destroycomponent';
import dropComponent from './dropComponent';
import hasFailed from './hasFailed';
import partial from '../common/partial';

function doFallback(componentIdAry) {
  return dropComponent(componentIdAry);
}

function fallback(componentIdAry, json) {
  if (hasFailed(json)) {return doFallback(componentIdAry);}
  return json;
}

export default function daDestroyComponent(componentIdAry) {
  return destroyComponent(componentIdAry)
    .then(partial(fallback, componentIdAry))
    .catch(partial(doFallback, componentIdAry));
}
