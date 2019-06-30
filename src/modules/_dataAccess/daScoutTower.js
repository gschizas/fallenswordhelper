import appScouttower from '../app/guild/scouttower';
import hasFailed from './hasFailed';
import scouttower from './scouttower';

const doFallback = () => scouttower();

function fallback(json) {
  if (hasFailed(json)) {return doFallback();}
  return json;
}

export default function daScoutTower() {
  return appScouttower().then(fallback).catch(doFallback);
}
