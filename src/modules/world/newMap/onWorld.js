import {titanStats} from './titanStats/titanStats';
import {
  def_refreshActionList,
  def_stairway
} from '../../support/constants';

function hazRealm(data) {
  return data.realm && data.realm.name;
}

function injectWorldNewMap(e, data) {
  if (hazRealm(data)) {
    titanStats(data.realm);
  }
}

export default function onWorld() {
  if (window.initialGameData) {// HCS initial data
    injectWorldNewMap(null, window.initialGameData);
  }
  $.subscribe(
    def_refreshActionList + ' ' + def_stairway,
    injectWorldNewMap // change of information
  );
}
