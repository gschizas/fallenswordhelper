import arrayFrom from '../../../common/arrayFrom';
import closestTr from '../../../common/closestTr';
import getCheckboxes from './getCheckboxes';
import hasClass from '../../../common/hasClass';

export default function getVisibleCheckboxes() {
  return arrayFrom(getCheckboxes())
    .filter((cb) => !hasClass('fshHide', closestTr(cb)));
}
