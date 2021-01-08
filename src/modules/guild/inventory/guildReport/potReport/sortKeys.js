import alpha from '../../../../common/alpha';
import keys from '../../../../common/keys';
import partial from '../../../../common/partial';

function cloneObj(obj, acc, key) {
  acc[key] = obj[key];
  return acc;
}

export default function sortKeys(obj) {
  return keys(obj).sort(alpha).reduce(partial(cloneObj, obj), {});
}
