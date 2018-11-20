import partial from './partial';

function getMyItem(removeBy, item) {
  if (removeBy) {
    return item[removeBy];
  }
  return item;
}

function genericFilter(removeBy, seen, item) {
  var myItem = getMyItem(removeBy, item);
  if (!seen[myItem]) {
    seen[myItem] = true;
    return true;
  }
}

export default function uniq(arr, removeBy) {
  return arr.filter(partial(genericFilter, removeBy, {}));
}
