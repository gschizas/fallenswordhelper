import calf from '../../support/calf';
import {def_playerBuffs} from '../../support/constants';
import partial from '../../common/partial';
import {
  huntingBuffs,
  huntingBuffsName,
  setCurrentBuffList
} from './setCurrentBuffList';

function buildBuffHash(prev, curr) {
  prev[curr.name] = true;
  return prev;
}

function findMissingBuffs(buffHash, prev, curr) {
  if (!buffHash[curr.trim()]) {prev.push(curr);}
  return prev;
}

function displayMissingBuffs(missingBuffsDiv, missingBuffs) {
  missingBuffsDiv.innerHTML = 'You are missing some ' + huntingBuffsName +
    ' hunting buffs<br>(' + missingBuffs.join(', ') + ')';
}

function clearBuffDiv(missingBuffsDiv) {
  missingBuffsDiv.innerHTML = '';
}

function lookForMissingBuffs(missingBuffsDiv, data) {
  var buffHash = data.b.reduce(buildBuffHash, {});
  var missingBuffs = huntingBuffs.reduce(
    partial(findMissingBuffs, buffHash), []);
  if (missingBuffs.length > 0) {
    displayMissingBuffs(missingBuffsDiv, missingBuffs);
  } else {
    clearBuffDiv(missingBuffsDiv);
  }
}

function huntingBuffsEnabled(missingBuffsDiv, evt, data) {
  if (calf.showBuffs) {
    lookForMissingBuffs(missingBuffsDiv, data);
  } else {
    clearBuffDiv(missingBuffsDiv);
  }
}

function dataEventsPlayerBuffs(missingBuffsDiv, evt, data) {
  if (huntingBuffs) {huntingBuffsEnabled(missingBuffsDiv, evt, data);}
}

export default function doHuntingBuffs(missingBuffsDiv) { // jQuery.min
  setCurrentBuffList();
  var buffsFn = partial(dataEventsPlayerBuffs, missingBuffsDiv);
  $.subscribe(def_playerBuffs, buffsFn);
  if (calf.showBuffs && window.initialGameData) { // HCS initial data
    buffsFn(null, {b: window.initialGameData.player.buffs});
  }
}
