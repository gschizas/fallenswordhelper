import {getElementById} from '../../common/getElement';
import getElementsByClassName from '../../common/getElementsByClassName';
import getValue from '../../system/getValue';
import hideElement from '../../common/hideElement';
import setValue from '../../system/setValue';
import {
  def_afterUpdateActionlist,
  def_fetch_worldRealmActions
} from '../../support/constants';

var hidePlayerActions;

export function toggleHidePlayerActions() {
  hidePlayerActions = !hidePlayerActions;
  setValue('hidePlayerActions', hidePlayerActions);
  GameData.fetch(def_fetch_worldRealmActions);
}

function hideActions(el) {
  var verbs = getElementsByClassName('verbs', el);
  if (verbs.length === 1) {
    hideElement(verbs[0]);
  }
}

function doHidePlayerActions() {
  if (!hidePlayerActions) {return;}
  var act = getElementById('actionList');
  var players = getElementsByClassName('player', act);
  Array.from(players).forEach(hideActions);
}

export function prepareHidePlayerActions() {
  hidePlayerActions = getValue('hidePlayerActions');
  $.subscribe(def_afterUpdateActionlist, doHidePlayerActions);
  doHidePlayerActions();
}
