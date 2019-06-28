import advisorView from '../app/guild/advisorView';
import hasFailed from './hasFailed';
import partial from '../common/partial';
import viewAdvisor from './viewAdvisor';

const doFallback = period => viewAdvisor(period);

function fallback(period, json) {
  if (hasFailed(json)) {return doFallback(period);}
  return json;
}

export default function daAdvisor(period) {
  return advisorView(period)
    .then(partial(fallback, period))
    .catch(partial(doFallback, period));
}
