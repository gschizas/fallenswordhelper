import ajaxQb from './quickbuff';
import appQb from '../app/quickbuff';
import hasFailed from './hasFailed';
import partial from '../common/partial';

function doFallback(userAry, buffAry) {
  return ajaxQb(userAry, buffAry);
}

function fallback(userAry, buffAry, json) {
  if (hasFailed(json)) {return doFallback(userAry, buffAry);}
  return json;
}

export default function daQuickbuff(userAry, buffAry) {
  return appQb(userAry, buffAry)
    .then(partial(fallback, userAry, buffAry))
    .catch(partial(doFallback, userAry, buffAry));
}
