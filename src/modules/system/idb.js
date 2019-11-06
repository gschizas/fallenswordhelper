import parseError from '../support/parseError';
import {sendException} from '../support/fshGa';
import {get as idbGet, set as idbSet} from 'idb-keyval';

export async function get(key, store) {
  try {
    return await idbGet(key, store);
  } catch (e) {
    sendException(parseError(e), false);
  }
}

export async function set(key, value, store) {
  try {
    return await idbSet(key, value, store);
  } catch (e) {
    sendException(parseError(e), false);
  }
}
