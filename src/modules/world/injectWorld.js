import {getElementById} from '../common/getElement';
import jQueryPresent from '../common/jQueryPresent';
import subscribes from './newMap/newMap';

function isNewMap() {
  return jQueryPresent() && getElementById('worldPage') && window.GameData;
}

export default function injectWorld() {
  if (isNewMap()) {subscribes();}
}
