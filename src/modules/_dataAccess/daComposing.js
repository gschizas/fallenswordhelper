// import { $dataAccess } from './_dataAccess';
// import composing from './fallbacks/composing';
import composingView from '../app/composing/view';

export default function daComposing() {
  // return $dataAccess(composingView, composing);
  return composingView();
}
