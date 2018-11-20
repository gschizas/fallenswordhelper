import {getElementById} from '../../common/getElement';
import getValue from '../../system/getValue';
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

function doHidePlayerActions() {
  if (!hidePlayerActions) {return;}
  var act = getElementById('actionList');
  var players = act.getElementsByClassName('player');
  Array.prototype.forEach.call(players, function(el) {
    var verbs = el.getElementsByClassName('verbs');
    if (verbs.length === 1) {
      verbs[0].classList.add('fshHide');
    }
  });
}

export function prepareHidePlayerActions() {
  hidePlayerActions = getValue('hidePlayerActions');
  $.subscribe(def_afterUpdateActionlist, doHidePlayerActions);
  doHidePlayerActions();
}
