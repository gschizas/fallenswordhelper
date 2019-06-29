import appGuildManage from '../app/guild/manage';
import guildManage from './guildManage';
import hasFailed from './hasFailed';

const doFallback = () => guildManage();

function fallback(json) {
  if (hasFailed(json)) {return doFallback();}
  return json;
}

export default function daGuildManage() {
  return appGuildManage().then(fallback).catch(doFallback);
}
