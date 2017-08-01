import calf from '../support/calf';
import {huntingBuffsHtml} from '../settings/worldPrefs';
import {simpleCheckboxHtml} from '../settings/settingsPage';
import * as system from '../support/system';

var huntingBuffs;
var huntingBuffsName;
var hidePlayerActions;
var missingBuffsDiv;

function getPrefs() {
  calf.hideSubLvlCreature = system.getValue('hideSubLvlCreature');
  hidePlayerActions = system.getValue('hidePlayerActions');
  calf.showBuffs = system.getValue('showHuntingBuffs');
  calf.enabledHuntingMode = system.getValue('enabledHuntingMode');
  calf.buffs = system.shouldBeArray('huntingBuffs');
  calf.buffsName = system.getValue('huntingBuffsName');
  calf.buffs2 = system.shouldBeArray('huntingBuffs2');
  calf.buffs2Name = system.getValue('huntingBuffs2Name');
  calf.buffs3 = system.shouldBeArray('huntingBuffs3');
  calf.buffs3Name = system.getValue('huntingBuffs3Name');
  calf.doNotKillList = system.shouldBeArray('doNotKillList');
}

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

function toggleSubLvlCreature() {
  calf.hideSubLvlCreature = !calf.hideSubLvlCreature;
  system.setValue('hideSubLvlCreature', calf.hideSubLvlCreature);
  GameData.fetch(256);
}

function toggleHidePlayerActions() {
  hidePlayerActions = !hidePlayerActions;
  system.setValue('hidePlayerActions', hidePlayerActions);
  GameData.fetch(256);
}

function toggleShowHuntingBuffs() {
  calf.showBuffs = !calf.showBuffs;
  system.setValue('showHuntingBuffs', calf.showBuffs);
  GameData.fetch(16);
}

function toggleEnabledHuntingMode(e) {
  if (e.target.name !== 'enabledHuntingMode') {return;}
  calf.enabledHuntingMode = e.target.value;
  system.setValue('enabledHuntingMode', calf.enabledHuntingMode);
  setCurrentBuffList();
  GameData.fetch(16);
}

var fshEvents = {
  hideSubLvlCreature: toggleSubLvlCreature,
  hidePlayerActions: toggleHidePlayerActions,
  showHuntingBuffs: toggleShowHuntingBuffs
};

function prefsClickEvent(e) {
  var tmpFn = fshEvents[e.target.name];
  if (typeof tmpFn === 'function') {
    e.target.blur();
    tmpFn(e);
  }
}

function buildFshDivs() {
  var fshDiv = document.createElement('div');
  fshDiv.className = 'fshCenter fshFten';
  var prefsDiv = document.createElement('div');
  prefsDiv.addEventListener('click', prefsClickEvent);
  prefsDiv.addEventListener('change', toggleEnabledHuntingMode);
  prefsDiv.insertAdjacentHTML('beforeend',
    simpleCheckboxHtml('hideSubLvlCreature') + '&nbsp;&nbsp;' +
    simpleCheckboxHtml('hidePlayerActions') + '&nbsp;&nbsp;' +
    huntingBuffsHtml());
  fshDiv.insertAdjacentElement('beforeend', prefsDiv);
  missingBuffsDiv = document.createElement('div');
  fshDiv.insertAdjacentElement('beforeend', missingBuffsDiv);
  var worldContainerBelow = document.getElementById('worldContainerBelow');
  worldContainerBelow.insertAdjacentElement('afterbegin', fshDiv);
}

function xhrDataFilter(data) {
  var myData = JSON.parse(data);
  if (!myData.actions || myData.actions.length === 0) {return data;}
  var realm = GameData.realm();
  myData.actions = myData.actions.filter(function(el) {
    if (el.type === 6) {return el.data.level >= realm.minlevel;}
    return true;
  });
  var ret = JSON.stringify(myData);
  return ret;
}

function xhrPreFilter(options, originalOptions) {
  if (!originalOptions.data || !calf.hideSubLvlCreature) {return;}
  options.dataFilter = xhrDataFilter;
}

function interceptXHR() { // jQuery.min
  $.ajaxPrefilter('JSON', xhrPreFilter);
}

function doHidePlayerActions() {
  if (!hidePlayerActions) {return;}
  var act = document.getElementById('actionList');
  var players = act.getElementsByClassName('player');
  Array.prototype.forEach.call(players, function(el) {
    var verbs = el.getElementsByClassName('verbs');
    if (verbs && verbs.length === 1) {
      verbs[0].classList.add('fshHide');
    }
  });
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

function doHuntingBuffs() { // jQuery.min
  setCurrentBuffList();
  $.subscribe(window.DATA_EVENTS.PLAYER_BUFFS.ANY,
    dataEventsPlayerBuffs);
  if (calf.showBuffs && window.initialGameData) { // HCS initial data
    dataEventsPlayerBuffs(null,
      {b: window.initialGameData.player.buffs});
  }
}

export default function setupPref() {
  getPrefs();
  buildFshDivs();
  interceptXHR();
  doHuntingBuffs();
  $.subscribe('after-update.actionlist', doHidePlayerActions);
  doHidePlayerActions();
}
