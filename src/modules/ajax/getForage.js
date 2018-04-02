// import localforage from
//   '../../../node_modules/localforage/dist/localforage.nopromises';
import {sendException} from '../support/fshGa';
import stringifyError from '../common/stringifyError';

function forageGet(forage, dfr) {
  localforage.getItem(forage).then(function(data) {
    // returns null if key does not exist
    dfr.resolve(data);
  }).catch(function(err) {
    if (err.name === 'UnknownError') {
      $('#dialog_msg').html('Firefox IndexedDB - UnknownError<br>' +
        err.message + '<br>' +
        '<a href="https://bugzilla.mozilla.org/show_bug.cgi?id=944918">' +
        'More Info</a>').dialog('open');
    } else {
      sendException(forage + ' localforage.getItem error ' +
        stringifyError(err), false);
    }
    dfr.reject(err);
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
