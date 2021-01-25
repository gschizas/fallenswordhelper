import { a as alpha } from './alpha-6743d5a2.js';
import { a4 as fallback, ae as isObject, aN as isUndefined, c as calf } from './calfSystem-e64be67d.js';

function getPath(obj, aPath, def) {
  let resultantObj = obj;
  const pathAry = aPath.split('.');
  const len = pathAry.length;
  for (let i = 0; i < len; i += 1) {
    if (fallback(!resultantObj, !isObject(resultantObj))) { return def; }
    resultantObj = resultantObj[pathAry[i]];
  }
  return resultantObj;
}

function path(obj, aPath, def) {
  const resultantObj = getPath(obj, aPath, def);
  if (isUndefined(resultantObj)) { return def; }
  return resultantObj;
}

function sortDesc(result) {
  if (calf.sortAsc) { return result; }
  return -result;
}

function stringSort(aa, bb) {
  const a = path(aa, calf.sortBy, 'a');
  const b = path(bb, calf.sortBy, 'a');
  return sortDesc(alpha(a, b));
}

export { stringSort as a, path as p, sortDesc as s };
//# sourceMappingURL=stringSort-fff187ac.js.map
