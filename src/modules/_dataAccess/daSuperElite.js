// import { $dataAccess } from './_dataAccess';
import appSe from '../app/superelite';
// import superelite from './fallbacks/superelite';

export default function daSuperElite() {
  // return $dataAccess(appSe, superelite);
  return appSe();
}
