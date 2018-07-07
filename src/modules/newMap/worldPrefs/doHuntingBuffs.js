import calf from '../../support/calf';
import {def_playerBuffs} from '../../support/constants';
import {
  huntingBuffs,
  huntingBuffsName,
  setCurrentBuffList
} from './setCurrentBuffList';

function buildBuffHash(prev, curr) {
  prev[curr.name] = true;
  return prev;
}

function findMissingBuffs(buffHash) {
  return function(prev, curr) {
    if (!buffHash[curr.trim()]) {prev.push(curr);}
    return prev;
  };
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
  var missingBuffs = huntingBuffs.reduce(findMissingBuffs(buffHash), []);
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

function dataEventsPlayerBuffs(missingBuffsDiv) {
  return function(evt, data) {
    if (huntingBuffs) {huntingBuffsEnabled(missingBuffsDiv, evt, data);}
  };
}

export default function doHuntingBuffs(missingBuffsDiv) { // jQuery.min
  setCurrentBuffList();
  $.subscribe(def_playerBuffs, dataEventsPlayerBuffs(missingBuffsDiv));
  if (calf.showBuffs && window.initialGameData) { // HCS initial data
    dataEventsPlayerBuffs(missingBuffsDiv)(null,
      {b: window.initialGameData.player.buffs});
  }
}
