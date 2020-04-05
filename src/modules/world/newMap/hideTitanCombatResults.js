import querySelectorArray from '../../common/querySelectorArray';
import {
  def_PvE,
  def_fetch_worldRealmActions,
  def_fetch_worldRealmDynamic
} from '../../support/constants';

function didNotExist(data) {
  return data.response && data.response.msg &&
    data.response.msg.startsWith('Creature did not exist at that location');
}

function removeAction(data) {
  if (didNotExist(data)) {
    GameData.fetch(
      def_fetch_worldRealmDynamic +
      def_fetch_worldRealmActions
    );
  }
}

function removeElement(el) {el.remove();}

function hideTitanViewCombat(e, data) {
  removeAction(data);
  querySelectorArray('.creature-4 > .quickCombat > .verbs')
    .forEach(removeElement);
}

export default function hideTitanCombatResults() {
  $.subscribe(def_PvE, hideTitanViewCombat); // TODO Pref
}
