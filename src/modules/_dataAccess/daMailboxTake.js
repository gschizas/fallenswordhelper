import hasFailed from './hasFailed';
import mailboxTake from './mailboxTake';
import partial from '../common/partial';
import takeitems from '../app/tempinv/take';

function doFallback(invIdAry) {
  return mailboxTake(invIdAry);
}

function fallback(invIdAry, json) {
  if (hasFailed(json)) {return doFallback(invIdAry);}
  return json;
}

export default function daMailboxTake(invIdAry) {
  return takeitems(invIdAry)
    .then(partial(fallback, invIdAry))
    .catch(partial(doFallback, invIdAry));
}
