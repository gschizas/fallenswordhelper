import ajaxQb from '../ajax/quickbuff';
import appQb from '../app/quickbuff';
import partial from '../common/partial';

function doFallback(userAry, buffAry) {
  return ajaxQb(userAry, buffAry);
}

const fail = json => json && 's' in json &&
  json.e.message === 'Unknown Command';

function fallback(userAry, buffAry, json) {
  if (fail(json)) {return doFallback(userAry, buffAry);}
  return json;
}

export default function daQuickbuff(userAry, buffAry) {
  return appQb(userAry, buffAry)
    .then(partial(fallback, userAry, buffAry))
    .catch(partial(doFallback, userAry, buffAry));
}
