import getArrayByClassName from '../../../common/getArrayByClassName';
import {getElementById} from '../../../common/getElement';
import getText from '../../../common/getText';
import isOnList from './isOnList';

function doNotKillBlue(el) {
  el.classList.toggle('fshBlue', isOnList(getText(el)));
}

export default function afterUpdateActionList() {
  // color the critters in the do no kill list blue
  var act = getElementById('actionList');
  getArrayByClassName('creature', act).forEach(doNotKillBlue);
}
