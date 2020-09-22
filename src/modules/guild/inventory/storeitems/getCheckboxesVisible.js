import closestTr from '../../../common/closestTr';
import getCheckboxesArray from './getCheckboxesArray';
import hasClass from '../../../common/hasClass';

export default function getCheckboxesVisible() {
  return getCheckboxesArray()
    .filter((cb) => !hasClass('fshHide', closestTr(cb)));
}
