// import { $dataAccess } from './_dataAccess';
import appFetchinv from '../app/guild/fetchinv';
// import guildFetchInv from './fallbacks/guildFetchInv';

export default function daGuildFetchInv() {
  // return $dataAccess(appFetchinv, guildFetchInv);
  return appFetchinv();
}
