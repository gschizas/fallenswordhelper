import jConfirm from '../common/jConfirm';
import partial from '../common/partial';
import {sendException} from '../support/fshGa';
import stringifyError from '../common/stringifyError';

function clearError(err) {
  sendException('localforage.clear error ' + stringifyError(err), false);
}

function clearForage() {
  localforage.clear().catch(clearError);
}

function setForageError(forage, err) {
  if (err.name === 'QuotaExceededError') {
    jConfirm('IndexedDB Quota Exceeded Error',
      'Not enough disk space. Would you like to clear IndexedDB?',
      clearForage
    );
  } else {
    sendException(forage + ' localforage.setItem error ' +
      stringifyError(err), false);
  }
}

function setItemCallback(forage, dfr, err, _data) {
  if (err) {
    setForageError(forage, err);
    dfr.reject(err);
  } else {
    dfr.resolve(_data);
  }
}

function forageSet(forage, data, dfr) {
  localforage.setItem(forage, data, partial(setItemCallback, forage, dfr));
}

export default function setForage(forage, data) {
  // Wrap in jQuery Deferred because we're using 1.7 rather than using ES6 promise
  var dfr = $.Deferred();
  if (window.localforage) {
    forageSet(forage, data, dfr);
  }
  return dfr.promise();
}
