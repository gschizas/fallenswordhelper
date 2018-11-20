import buffInfoDiv from './buffInfoDiv';
import calf from '../../../support/calf';
import doCa from './doCa';
import doDbl from './doDbl';
import doDeathDealer from './doDeathDealer';
import doKs from './doKs';
import getBuff from './getBuff';
import getCooldown from './getCooldown';
import impIconColour from './impIconColour';
import impWarning from './impWarning';
import setValue from '../../../system/setValue';
import titanKs from './titanKs';
import {
  def_playerBuffs,
  def_playerUpdate,
  def_teleport
} from '../../../support/constants';
import {doCountdown, tpCooldown} from './tpCooldown';

var dd;
var dbl;
var ca;
var imp;
var cd;
var titanActive;
var ks;

function initVars() {
  dd = getBuff('Death Dealer');
  dbl = getBuff('Doubler');
  ca = getBuff('Counter Attack');
  imp = getBuff('Summon Shield Imp');
  cd = getCooldown();
  titanActive = titanKs();
  ks = GameData.player().killStreak;
}

function updateBuffInfo() {
  impIconColour();
  initVars();
  var containerDiv = buffInfoDiv([dd, dbl, ca, imp, cd, titanActive]);
  if (containerDiv) {
    impWarning(containerDiv, imp, dd);
    doKs(containerDiv, dd, titanActive, ks);
    doDeathDealer(containerDiv, dd, ks);
    doCa(containerDiv, ca);
    doDbl(containerDiv, dbl);
    tpCooldown(containerDiv, cd);
  }
}

function teleportEvent(e, data) {
  doCountdown(data.player.teleportCooldown);
}

export function buffInfo() {
  updateBuffInfo();
  $.subscribe(def_playerBuffs + ' ' + def_playerUpdate, updateBuffInfo);
  $.subscribe(def_teleport, teleportEvent);
}

export function toggleBuffInfo() {
  calf.showBuffInfo = !calf.showBuffInfo;
  setValue('showBuffInfo', calf.showBuffInfo);
  updateBuffInfo();
}
