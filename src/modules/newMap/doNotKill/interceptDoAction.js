import calf from '../../support/calf';
import isFunction from '../../common/isFunction';
import isUndefined from '../../common/isUndefined';

function interceptCreatureCombat(oldDoAction) {
  return function(action, fetch, data, attempts) {
    // Do custom stuff e.g. do not kill list
    var creature = GameData.actions()[data.passback];
    if (creature) {
      var creatureName = creature.data.name;
      if (calf.doNotKillList.indexOf(creatureName) !== -1) {
        $('#actionList div.header').eq(data.passback)
          .find('a.icon').removeClass('loading');
        return;
      }
    }
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
