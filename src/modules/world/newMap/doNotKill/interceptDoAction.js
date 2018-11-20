import calf from '../../../support/calf';
import {getElementById} from '../../../common/getElement';
import isFunction from '../../../common/isFunction';
import isUndefined from '../../../common/isUndefined';

function creatureOnList(creatureName, passback) {
  if (calf.doNotKillList.includes(creatureName)) {
    getElementById('actionList').children[passback].children[0].children[1]
      .classList.remove('loading');
    return true;
  }
}

function weShouldBlock(passback) {
  // Do custom stuff e.g. do not kill list
  var creature = GameData.actions()[passback];
  if (creature) {
    return creatureOnList(creature.data.name, passback);
  }
}

function interceptCreatureCombat(oldDoAction) {
  return function(action, fetch, data, attempts) {
    if (weShouldBlock(data.passback)) {return;}
    // Call standard action
    oldDoAction(action, fetch, data, attempts);
  };
}

var actionsToIntercept = {
  // def_creatureCombat
  '2': interceptCreatureCombat
};

function firstAttempt(attempts) {
  return isUndefined(attempts) || attempts === 0;
}

function goodInterceptFunction(interceptFunction) {
  return interceptFunction && isFunction(interceptFunction);
}

function maybeIntercept(oldDoAction) {
  return function(action, fetch, data, attempts) {
    var interceptFunction = actionsToIntercept[action];
    if (goodInterceptFunction(interceptFunction) && firstAttempt(attempts)) {
      interceptFunction(oldDoAction)(action, fetch, data, attempts);
    } else {
      oldDoAction(action, fetch, data, attempts);
    }
  };
}

export default function interceptDoAction() {
  var oldDoAction = GameData.doAction;
  GameData.doAction = maybeIntercept(oldDoAction);
}
