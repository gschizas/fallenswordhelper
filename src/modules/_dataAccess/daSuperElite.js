import appSe from '../app/superelite';
import hasFailed from './hasFailed';
import superelite from './superelite';

const doFallback = () => superelite();

function fallback(json) {
  if (hasFailed(json)) {return doFallback();}
  return json;
}

export default function daSuperElite() {
  return appSe().then(fallback).catch(doFallback);
}
