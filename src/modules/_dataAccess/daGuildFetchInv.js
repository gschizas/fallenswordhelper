import fetchinv from '../app/guild/fetchinv';
import guildFetchInv from './guildFetchInv';
import hasFailed from './hasFailed';

function doFallback() {
  return guildFetchInv();
}

function fallback(json) {
  if (hasFailed(json)) {return doFallback();}
  return json;
}

export default function daGuildFetchInv() {
  return fetchinv().then(fallback).catch(doFallback);
}
