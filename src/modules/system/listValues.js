import {GMSTORAGE_PATH} from '../support/constants';

export function listValues() {
  var list = [];
  var reKey = new RegExp('^' + GMSTORAGE_PATH);
  for (var i = 0, il = window.localStorage.length; i < il; i += 1) {
    var key = window.localStorage.key(i);
    if (key.match(reKey)) {
      list.push(key.replace(GMSTORAGE_PATH, ''));
    }
  }
  return list;
}
