// import { $dataAccess } from './_dataAccess';
import advisorView from '../app/guild/advisorView';
// import viewAdvisor from './fallbacks/viewAdvisor';

export default function daAdvisor(period) {
  // return $dataAccess(advisorView, viewAdvisor, period);
  return advisorView(period);
}
