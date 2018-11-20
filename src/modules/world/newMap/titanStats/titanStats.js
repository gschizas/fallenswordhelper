import calf from '../../../support/calf';
import {processTitans} from './processTitans';
import scouttower from '../../../app/guild/scouttower';
import {setRealm} from './realm';
import setValue from '../../../system/setValue';
import {hasTitan, hideTitanDiv, setupTitanDiv} from './hasTitan';

var timeoutId;

function clearTheTimeout() {
  if (timeoutId) {
    window.clearTimeout(timeoutId);
    timeoutId = null;
  }
}

function goodData(data) {
  return data.s && Array.isArray(data.r);
}

function titanToShow(dynamic) {
  return calf.showTitanInfo && Array.isArray(dynamic) && dynamic.some(hasTitan);
}

function ajaxScoutTower() {
  scouttower().done(function processScoutTower(data) {
    if (goodData(data)) {
      processTitans(data.r);
      if (titanToShow(GameData.realm().dynamic)) {
        timeoutId = window.setTimeout(ajaxScoutTower, 30000);
      } else {
        hideTitanDiv();
      }
    }
  });
}

function testDynamics(dynamic) {
  clearTheTimeout();
  if (titanToShow(dynamic)) {
    setupTitanDiv();
    ajaxScoutTower();
  } else {
    hideTitanDiv();
  }
}

export function titanStats(realm) {
  if (realm.dynamic) {
    setRealm(realm.name);
    testDynamics(realm.dynamic);
  }
}

export function toggleShowTitanInfo() {
  calf.showTitanInfo = !calf.showTitanInfo;
  setValue('showTitanInfo', calf.showTitanInfo);
  testDynamics(GameData.realm().dynamic);
}
