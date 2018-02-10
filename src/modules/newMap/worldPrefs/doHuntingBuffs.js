import calf from '../../support/calf';
import {def_playerBuffs} from '../../support/dataObj';
import {missingBuffsDiv} from './buildFshDivs';
import {setCurrentBuffList} from './setCurrentBuffList';

function huntingBuffsEnabled(evt, data) {
  if (!calf.showBuffs) {
    missingBuffsDiv.innerHTML = '';
    return;
  }
  var buffHash = data.b.reduce(function(prev, curr) {
    prev[curr.name] = true;
    return prev;
  }, {});
  var missingBuffs = huntingBuffs.reduce(function(prev, curr) {
    if (!buffHash[curr.trim()]) {prev.push(curr);}
    return prev;
  }, []);
  if (missingBuffs.length > 0) {
    missingBuffsDiv.innerHTML = 'You are missing some ' +
      huntingBuffsName + ' hunting buffs<br>(' +
      missingBuffs.join(', ') + ')';
  } else {missingBuffsDiv.innerHTML = '';}
}

function dataEventsPlayerBuffs(evt, data) {
  if (huntingBuffs) {huntingBuffsEnabled(evt, data);}
}

export function doHuntingBuffs() { // jQuery.min
  setCurrentBuffList();
  $.subscribe(def_playerBuffs, dataEventsPlayerBuffs);
  if (calf.showBuffs && window.initialGameData) { // HCS initial data
    dataEventsPlayerBuffs(null,
      {b: window.initialGameData.player.buffs});
  }
}
