import getValue from '../system/getValue';
import isChecked from '../system/isChecked';

export default function isValueChecked(pref) {
  return isChecked(getValue(pref));
}
