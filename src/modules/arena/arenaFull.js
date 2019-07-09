import {entries} from '../common/entries';
import isObject from '../common/isObject';
import partial from '../common/partial';
import querySelectorArray from '../common/querySelectorArray';
import {set} from 'idb-keyval';

function func(withPvpId, prev, [key, value]) {
  const thisBtn = withPvpId.find(([, id]) => id === key);
  if (thisBtn) {
    thisBtn[0].closest('tr').style.backgroundColor = '#ff0000';
    prev[key] = value;
  }
  return prev;
}

export default function arenaFull(obj) {
  if (!isObject(obj)) {return;}
  const theButtons = querySelectorArray(
    '#arenaTypeTabs tr:not([style="display: none;"]) input[type="submit"]');
  const withPvpId = theButtons.map(e => [e, e.previousElementSibling.value]);
  const newObj = entries(obj).reduce(partial(func, withPvpId), {});
  set('arenaFull', newObj);
  return 0;
}
