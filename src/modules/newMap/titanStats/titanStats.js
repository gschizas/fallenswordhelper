import buildTitanInfoTable from './buildTitanInfoTable';
import calf from '../../support/calf';
import {getElementById} from '../../common/getElement';
import insertElement from '../../common/insertElement';
import scouttower from '../../app/guild/scouttower';
import {setValue} from '../../support/system';
import toggleForce from '../../common/toggleForce';
import {clearMemberRows, processTitans} from './processTitans';
import {createDiv, createSpan} from '../../common/cElement';

export var realmName;
export var titanId;
var titanDiv;
var timeoutId;

export var titanTbl;
export var currentHp;
export var maxHp;
export var guildKills;
export var currentPct;
export var totalPct;
export var statusText;
export var cooldownText;

function clearTitanDiv() {
  currentHp.textContent = '';
  maxHp.textContent = '';
  guildKills.textContent = '';
  currentPct.textContent = '';
  totalPct.textContent = '';
  statusText.innerHTML = '';
  cooldownText.innerHTML = '';
  clearMemberRows();
}

function hideTitanDiv() {
  if (titanDiv && !titanDiv.classList.contains('fshHide')) {
    toggleForce(titanDiv, true);
    clearTitanDiv();
  }
}

function clearTheTimeout() {
  if (timeoutId) {
    window.clearTimeout(timeoutId);
    timeoutId = null;
  }
}

function ajaxScoutTower() {
  scouttower().done(function processScoutTower(data) {
    if (data.s && Array.isArray(data.r)) {
      processTitans(data.r);
      timeoutId = window.setTimeout(ajaxScoutTower, 30000);
    }
  });
}

function initVars() {
  currentHp = createSpan();
  maxHp = createSpan();
  guildKills = createSpan();
  currentPct = createSpan();
  totalPct = createSpan();
  statusText = createSpan();
  cooldownText = createSpan();
}

function setupTitanDiv() {
  if (titanDiv) {
    toggleForce(titanDiv, false);
  } else {
    var actCont = getElementById('actionContainer');
    titanDiv = createDiv({className: 'titanInfo'});
    initVars();
    titanTbl = buildTitanInfoTable();
    insertElement(titanDiv, titanTbl);
    insertElement(actCont, titanDiv);
  }
}

function hasTitan(el) {
  if (el.type === 0) {
    titanId = el.base_creature_id;
    return true;
  }
  return false;
}

function testDynamics(dynamic) {
  clearTheTimeout();
  if (calf.showTitanInfo && Array.isArray(dynamic) && dynamic.some(hasTitan)) {
    setupTitanDiv();
    ajaxScoutTower();
  } else {
    titanId = null;
    hideTitanDiv();
  }
}

export default function titanStats(data) {
  if (data.realm.dynamic) {
    realmName = data.realm.name;
    testDynamics(data.realm.dynamic);
  }
}

export function toggleShowTitanInfo() {
  calf.showTitanInfo = !calf.showTitanInfo;
  setValue('showTitanInfo', calf.showTitanInfo);
  testDynamics(GameData.realm().dynamic);
}
