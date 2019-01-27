import {getElementById} from '../common/getElement';
import getElementsByClassName from '../common/getElementsByClassName';
import getText from '../common/getText';
import intValue from '../system/intValue';
import setValue from '../system/setValue';
import valueText from '../common/valueText';
import {
  def_characterVirtualLevel,
  def_statLevel,
  def_statVl
} from '../support/constants';

function sameAsLevel(virtualLevel) {
  return intValue(valueText(
    getElementsByClassName(def_statLevel))) === virtualLevel;
}

export default function storeVL() {
  // store the VL of the player
  var virtualLevel = parseInt(getText(getElementById(def_statVl)), 10);
  if (sameAsLevel(virtualLevel)) {
    setValue(def_characterVirtualLevel, ''); // ?
  } else {
    setValue(def_characterVirtualLevel, virtualLevel);
  }
}
