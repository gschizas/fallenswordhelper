import calf from '../support/calf';
import path from './path';
import sortDesc from './sortDesc';

export default function stringSort(a, b) {
  var result = 0;
  var _a = path(a, calf.sortBy, 'a');
  var _b = path(b, calf.sortBy, 'a');
  if (_a.toLowerCase() < _b.toLowerCase()) {result = -1;}
  if (_a.toLowerCase() > _b.toLowerCase()) {result = 1;}
  return sortDesc(result);
}
