import {getElementById} from '../common/getElement';
import getElementsByClassName from '../common/getElementsByClassName';
import intValue from '../system/intValue';
import setValue from '../system/setValue';
import {
  def_characterVirtualLevel,
  def_statLevel,
  def_statVl
} from '../support/constants';

export default function storeVL() {
  // store the VL of the player
  var virtualLevel = parseInt(getElementById(def_statVl).textContent, 10);
  if (intValue(getElementsByClassName(def_statLevel, document)[0]
    .nextElementSibling.textContent) === virtualLevel) {
    setValue(def_characterVirtualLevel, ''); // ?
  } else {
    setValue(def_characterVirtualLevel, virtualLevel);
  }
}
