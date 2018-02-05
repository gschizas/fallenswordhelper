import calf from '../support/calf';
import {def_playerBuffs} from '../support/dataObj';
import {missingBuffsDiv} from './worldPrefs';
import {setValue} from '../system/system';

var huntingBuffs;
var huntingBuffsName;
var buffLookup = {
  '1': function() {
    huntingBuffs = calf.buffs;
    huntingBuffsName = calf.buffsName;
  },
  '2': function() {
    huntingBuffs = calf.buffs2;
    huntingBuffsName = calf.buffs2Name;
  },
  '3': function() {
    huntingBuffs = calf.buffs3;
    huntingBuffsName = calf.buffs3Name;
  }
};

function setCurrentBuffList() {
  var tmpFn = buffLookup[calf.enabledHuntingMode];
  if (typeof tmpFn === 'function') {
    tmpFn();
  }
}

export function toggleShowHuntingBuffs() {
  calf.showBuffs = !calf.showBuffs;
  setValue('showHuntingBuffs', calf.showBuffs);
  GameData.fetch(16);
}

export function toggleEnabledHuntingMode(e) {
  if (e.target.name !== 'enabledHuntingMode') {return;}
  calf.enabledHuntingMode = e.target.value;
  setValue('enabledHuntingMode', calf.enabledHuntingMode);
  setCurrentBuffList();
  GameData.fetch(16);
}

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
