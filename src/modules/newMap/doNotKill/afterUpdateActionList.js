import calf from '../../support/calf';
import {getElementById} from '../../common/getElement';

export default function afterUpdateActionList() {
  // color the critters in the do no kill list blue
  var act = getElementById('actionList');
  var creatures = act.getElementsByClassName('creature');
  Array.prototype.forEach.call(creatures, function(el) {
    el.classList.toggle('fshBlue',
      calf.doNotKillList.indexOf(el.textContent) !== -1);
  });
}
