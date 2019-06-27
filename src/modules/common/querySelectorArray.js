import {arrayFrom} from './arrayFrom';
import querySelectorAll from './querySelectorAll';

export default function querySelectorArray(selector, scope) {
  return arrayFrom(querySelectorAll(selector, scope));
}
