import {getElementById} from '../common/getElement';
import injectOldMap from './legacy/legacy';
import jQueryPresent from '../common/jQueryPresent';
import subscribes from './newMap/newMap';

function oldOrNew() {
  if (getElementById('worldPage') && window.GameData) { // new map
    subscribes();
  } else { // not new map.
    injectOldMap();
  }
}

export default function injectWorld() {
  if (jQueryPresent()) {oldOrNew();}
}
