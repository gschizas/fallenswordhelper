import getElementById from '../common/getElement';
import getElementsByClassName from '../common/getElementsByClassName';
import getText from '../common/getText';
import intValue from '../system/intValue';
import setValue from '../system/setValue';
import valueText from '../common/valueText';
import {
  defCharacterVirtualLevel,
  defStatLevel,
  defStatVl,
} from '../support/constants';

function sameAsLevel(virtualLevel) {
  return intValue(valueText(
    getElementsByClassName(defStatLevel),
  )) === virtualLevel;
}

export default function storeVL() {
  // store the VL of the player
  const virtualLevel = Number(getText(getElementById(defStatVl)));
  if (sameAsLevel(virtualLevel)) {
    setValue(defCharacterVirtualLevel, ''); // ?
  } else {
    setValue(defCharacterVirtualLevel, virtualLevel);
  }
}
