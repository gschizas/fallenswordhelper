import calf from '../support/calf';
import {getElementById} from '../common/getElement';
import {
  def_afterUpdateActionlist,
  def_creatureCombat
} from '../support/dataObj';

function afterUpdateActionList() {
  // color the critters in the do no kill list blue
  var act = getElementById('actionList');
  var creatures = act.getElementsByClassName('creature');
  Array.prototype.forEach.call(creatures, function(el) {
    if (calf.doNotKillList.indexOf(el.textContent) !== -1) {
      el.classList.add('fshBlue');
    }
  });
}

function maybeIntercept(oldDoAction, actionCode, fetchFlags, data) {
  if (actionCode === def_creatureCombat) {
    // Do custom stuff e.g. do not kill list
    var creatureName = GameData.actions()[data.passback].data.name;
    if (calf.doNotKillList.indexOf(creatureName) !== -1) {
      $('#actionList div.header').eq(data.passback)
        .find('a.icon').removeClass('loading');
      return;
    }
  }
  // Call standard action
  oldDoAction(actionCode, fetchFlags, data);
}

function interceptDoAction() { // jQuery
  var oldDoAction = GameData.doAction;
  GameData.doAction = maybeIntercept.bind(null, oldDoAction);
}

export default function doNotKill() {
  $.subscribe(def_afterUpdateActionlist, afterUpdateActionList);
  afterUpdateActionList();
  // then intercept the action call
  interceptDoAction();
}
