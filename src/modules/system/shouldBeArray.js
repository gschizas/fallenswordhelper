import csvSplit from '../common/csvSplit';
import getValue from './getValue';

export default function shouldBeArray(pref) {
  var stored = getValue(pref);
  if (stored) {return csvSplit(stored);}
  return [];
}
