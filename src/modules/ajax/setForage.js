import jConfirm from '../common/jConfirm';
import {sendException} from '../support/fshGa';

function clearForage() {
  localforage.clear().catch(function(err) {
    sendException('localforage.clear error ' + err, false);
  });
}

function forageSet(forage, data, dfr) {
  localforage.setItem(forage, data).then(function(value) {
    dfr.resolve(value);
  }).catch(function(err) {
    if (err.name === 'QuotaExceededError') {
      jConfirm('IndexedDB Quota Exceeded Error',
        'Would you like to clear IndexedDB?',
        clearForage()
      );
    }
    sendException('localforage.setItem error (' + err.name + ' : ' +
      err.message + ')', false);
    dfr.reject(err);
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
