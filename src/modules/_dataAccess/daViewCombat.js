// import { $dataAccess } from './_dataAccess';
import appViewCombat from '../app/combat/view';
// import viewCombat from './fallbacks/viewCombat';

export default function daViewCombat(id) {
  // return $dataAccess(appViewCombat, viewCombat, id);
  return appViewCombat(id);
}
