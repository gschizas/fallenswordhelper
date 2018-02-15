import calf from '../support/calf';
import {def_afterUpdateActionlist} from '../support/constants';
import {getElementById} from '../common/getElement';
import isFunction from '../common/isFunction';
import isUndefined from '../common/isUndefined';

var oldDoAction;

export function afterUpdateActionList() {
  // color the critters in the do no kill list blue
  var act = getElementById('actionList');
  var creatures = act.getElementsByClassName('creature');
  Array.prototype.forEach.call(creatures, function(el) {
    el.classList.toggle('fshBlue',
      calf.doNotKillList.indexOf(el.textContent) !== -1);
  });
}

var actionsToIntercept = {
  // def_creatureCombat
  '2': function(action, fetch, data, attempts) {
    // Do custom stuff e.g. do not kill list
    var creatureName = GameData.actions()[data.passback].data.name;
    if (calf.doNotKillList.indexOf(creatureName) !== -1) {
      $('#actionList div.header').eq(data.passback)
        .find('a.icon').removeClass('loading');
      return;
    }
    // Call standard action
    oldDoAction(action, fetch, data, attempts);
  }
};

function firstAttempt(attempts) {
  return isUndefined(attempts) || attempts === 0;
}

function goodInterceptFunction(interceptFunction) {
  return interceptFunction && isFunction(interceptFunction);
}

function maybeIntercept(action, fetch, data, attempts) {
  var interceptFunction = actionsToIntercept[action];
  if (goodInterceptFunction(interceptFunction) && firstAttempt(attempts)) {
    interceptFunction(action, fetch, data, attempts);
  } else {
    oldDoAction(action, fetch, data, attempts);
  }
}

function interceptDoAction() {
  oldDoAction = GameData.doAction;
  GameData.doAction = maybeIntercept;
}

export default function doNotKill() {
  $.subscribe(def_afterUpdateActionlist, afterUpdateActionList);
  afterUpdateActionList();
  // then intercept the action call
  interceptDoAction();
}
