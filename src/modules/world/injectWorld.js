import getElementById from '../common/getElement';
import jQueryPresent from '../common/jQueryPresent';
import runDefault from '../common/runDefault';

function isNewMap() {
  return jQueryPresent() && getElementById('worldPage') && window.GameData;
}

export default function injectWorld() {
  if (isNewMap()) {
    runDefault(import('./newMap/newMap'));
  }
}
