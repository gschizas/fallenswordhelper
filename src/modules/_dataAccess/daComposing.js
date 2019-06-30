import composing from './composing';
import composingView from '../app/composing/view';
import hasFailed from './hasFailed';

const doFallback = () => composing();

function fallback(json) {
  if (hasFailed(json)) {return doFallback();}
  return json;
}

export default function daComposing() {
  return composingView().then(fallback).catch(doFallback);
}
