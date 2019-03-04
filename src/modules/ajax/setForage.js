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

export default function setForage(forage, data) {
  return localforage.setItem(forage, data)
    .catch(partial(setForageError, forage));
}
