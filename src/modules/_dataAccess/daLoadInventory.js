import fetchinv from './fetchinv';
import hasFailed from './hasFailed';
import loadInventory from '../app/profile/loadInventory';

function doFallback() {
  return fetchinv();
}

function fallback(json) {
  if (hasFailed(json)) {return doFallback();}
  return json;
}

export default function daLoadInventory() {
  return loadInventory().then(fallback).catch(doFallback);
}
