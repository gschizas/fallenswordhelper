import getForage from '../ajax/getForage';
import partial from './partial';
import {sendEvent} from '../support/fshGa';
import {get, set} from 'idb-keyval';

function fallbackStorage(key, data) {
  if (data) {
    sendEvent('Migrate Storage', key);
    set(key, data);
  }
  return data;
}

function migrateStorage(key, data) {
  if (data) {return data;}
  return getForage(key).then(partial(fallbackStorage, key));
}

export default function getMigrate(key) {
  return get(key).then(partial(migrateStorage, key));
}
