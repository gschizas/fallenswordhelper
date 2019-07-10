import {get} from 'idb-keyval';
import getForage from '../ajax/getForage';
import partial from './partial';
import {sendEvent} from '../support/fshGa';

function migrateStorage(key, data) {
  if (data) {return data;}
  sendEvent('Migrate Storage', key);
  return getForage(key);
}

export default function getMigrate(key) {
  return get(key).then(partial(migrateStorage, key));
}
