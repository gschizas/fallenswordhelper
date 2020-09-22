import arrayFrom from '../../../common/arrayFrom';
import getCheckboxes from './getCheckboxes';

export default function getCheckboxesArray() {
  const checkboxes = getCheckboxes();
  if (!checkboxes) { return []; }
  return arrayFrom(checkboxes instanceof RadioNodeList ? checkboxes : [checkboxes]);
}
