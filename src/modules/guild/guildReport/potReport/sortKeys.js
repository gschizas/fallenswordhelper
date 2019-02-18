import alpha from '../../../common/alpha';
import partial from '../../../common/partial';

function cloneObj(obj, result, key) {
  result[key] = obj[key];
  return result;
}

export default function sortKeys(obj) {
  return Object.keys(obj).sort(alpha).reduce(partial(cloneObj, obj), {});
}
