import alpha from '../common/alpha';
import calf from '../support/calf';
import path from './path';
import sortDesc from './sortDesc';

export default function stringSort(aa, bb) {
  var a = path(aa, calf.sortBy, 'a');
  var b = path(bb, calf.sortBy, 'a');
  return sortDesc(alpha(a, b));
}
