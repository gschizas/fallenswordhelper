import groupsView from '../app/guild/groups/view';
import hasFailed from './hasFailed';
import viewGroups from './viewGroups';

const doFallback = () => viewGroups();

function fallback(json) {
  if (hasFailed(json)) {return doFallback();}
  return json;
}

export default function daViewGroups() {
  return groupsView().then(fallback).catch(doFallback);
}
