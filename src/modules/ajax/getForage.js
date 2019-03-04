import dialogMsg from '../common/dialogMsg';
import partial from '../common/partial';
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

export default function getForage(forage) {
  return localforage.getItem(forage).catch(partial(getForageError, forage));
}
