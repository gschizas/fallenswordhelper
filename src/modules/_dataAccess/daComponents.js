import components from './components';
import hasFailed from './hasFailed';
import loadComponents from '../app/profile/loadcomponents';

const doFallback = () => components();

function fallback(json) {
  if (hasFailed(json)) {return doFallback();}
  return json;
}

export default function daComponents() {
  return loadComponents().then(fallback).catch(doFallback);
}
