import getValue from './getValue';

export default function shouldBeArray(pref) {
  var stored = getValue(pref);
  if (stored && stored !== '') {return stored.split(/\s*,\s*/);}
  return [];
}
