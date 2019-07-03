import hasFailed from './hasFailed';
import ranks from '../app/guild/ranks/ranks';
import ranksView from './ranksView';

const doFallback = () => ranksView();

function fallback(json) {
  if (hasFailed(json)) {return doFallback();}
  return json;
}

export default function daRanksView() {
  return ranks().then(fallback).catch(doFallback);
}
