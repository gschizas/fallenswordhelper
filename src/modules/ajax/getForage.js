import {log} from '../support/debug';

export default function getForage(forage) {
  // Wrap in jQuery Deferred because we're using 1.7
  // rather than using ES6 promise
  var dfr = $.Deferred();
  localforage.getItem(forage, function getItemCallback(err, data) {
    if (err) {
      log(forage + ' forage error', err);
      dfr.reject(err);
    } else {
      // returns null if key does not exist
      dfr.resolve(data);
    }
  });
  return dfr.promise();
}
