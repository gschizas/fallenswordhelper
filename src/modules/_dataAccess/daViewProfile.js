import hasFailed from './hasFailed';
import view from '../app/profile/view';
import viewProfile from './viewProfile';

const doFallback = () => viewProfile();

function fallback(json) {
  if (hasFailed(json)) {return doFallback();}
  return json;
}

export default function daViewProfile() {
  return view().then(fallback).catch(doFallback);
}
