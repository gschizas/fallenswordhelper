import {sendException} from '../support/fshGa';

function forageSet(forage, data, dfr) {
  localforage.setItem(forage, data, function setItemCallback(err, _data) {
    if (err) {
      sendException(forage + ' forage error' + err, false);
      dfr.reject(err);
    } else {
      dfr.resolve(_data);
    }
  });
}

export default function setForage(forage, data) {
  // Wrap in jQuery Deferred because we're using 1.7
  // rather than using ES6 promise
  var dfr = $.Deferred();
  if (window.localforage) {
    forageSet(forage, data, dfr);
  }
  return dfr.promise();
}
