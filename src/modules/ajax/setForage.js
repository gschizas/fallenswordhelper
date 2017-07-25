import * as debug from '../support/debug';

export default function setForage(forage, data) {
  // Wrap in jQuery Deferred because we're using 1.7
  // rather than using ES6 promise
  var dfr = $.Deferred();
  localforage.setItem(forage, data, function setItemCallback(err, _data) {
    if (err) {
      debug.log(forage + ' forage error', err);
      dfr.reject(err);
    } else {
      dfr.resolve(_data);
    }
  });
  return dfr.promise();
}
