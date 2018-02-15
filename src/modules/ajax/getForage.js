import {sendException} from '../support/fshGa';

function forageGet(forage, dfr) {
  localforage.getItem(forage, function getItemCallback(err, data) {
    if (err) {
      sendException(forage + ' localforage.getItem error ' + err, false);
      dfr.reject(err);
    } else {
      // returns null if key does not exist
      dfr.resolve(data);
    }
  });
}

export default function getForage(forage) {
  // Wrap in jQuery Deferred because we're using 1.7
  // rather than using ES6 promise
  var dfr = $.Deferred();
  if (window.localforage) {
    forageGet(forage, dfr);
  }
  return dfr.promise();
}
