import getElementsByClassName from '../../common/getElementsByClassName';
import intValue from '../../system/intValue';
import valueText from './valueText';

export default function asInt(className) {
  return intValue(
    valueText(getElementsByClassName(className))
  );
}
