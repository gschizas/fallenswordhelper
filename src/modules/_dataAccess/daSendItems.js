import appSend from '../app/trade/senditems';
import hasFailed from './hasFailed';
import partial from '../common/partial';
import senditems from './sendItems';

function doFallback(invIdAry) {
  return senditems(invIdAry);
}

function fallback(invIdAry, json) {
  if (hasFailed(json)) {return doFallback(invIdAry);}
  return json;
}

export default function daSendItems(invIdAry) {
  return appSend(invIdAry)
    .then(partial(fallback, invIdAry))
    .catch(partial(doFallback, invIdAry));
}
