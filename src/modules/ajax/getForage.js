import dialogMsg from '../common/dialogMsg';
import {sendException} from '../support/fshGa';
import stringifyError from '../common/stringifyError';

function getForageError(forage, err) {
  if (err.name === 'UnknownError') {
    dialogMsg('Firefox IndexedDB - UnknownError<br>' +
      err.message + '<br>' +
      '<a href="https://bugzilla.mozilla.org/show_bug.cgi?id=944918">' +
      'More Info</a>');
  } else {
    sendException(forage + ' localforage.getItem error ' +
      stringifyError(err), false);
  }
}

function forageGet(forage, dfr) {
  localforage.getItem(forage, function getItemCallback(err, data) {
    if (err) {
      getForageError(forage, err);
      dfr.reject(err);
    } else {
      // returns null if key does not exist
      dfr.resolve(data);
    }
  });
}

export default function getForage(forage) {
  // Wrap in jQuery Deferred because we're using 1.7 rather than using ES6 promise
  var dfr = $.Deferred();
  if (window.localforage) {
    forageGet(forage, dfr);
  }
  return dfr.promise();
}
