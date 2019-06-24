import guildReport from './guildReport';
import hasFailed from './hasFailed';
import report from '../app/guild/inventory/report';

function doFallback() {
  return guildReport();
}

function fallback(json) {
  if (hasFailed(json)) {return doFallback();}
  return json;
}

export default function daGuildReport() {
  return report().then(fallback).catch(doFallback);
}
