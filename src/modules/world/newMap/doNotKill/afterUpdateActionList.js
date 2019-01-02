import calf from '../../../support/calf';
import {getElementById} from '../../../common/getElement';
import getElementsByClassName from '../../../common/getElementsByClassName';

function doNotKillBlue(el) {
  el.classList.toggle('fshBlue', calf.doNotKillList.includes(el.textContent));
}

export default function afterUpdateActionList() {
  // color the critters in the do no kill list blue
  var act = getElementById('actionList');
  var creatures = getElementsByClassName('creature', act);
  Array.from(creatures).forEach(doNotKillBlue);
}
