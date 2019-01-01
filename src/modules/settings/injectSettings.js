import calf from '../support/calf';
import dialogMsg from '../common/dialogMsg';
import getCalfPrefs from '../common/getCalfPrefs';
import {getElementById} from '../common/getElement';
import getValue from '../system/getValue';
import injectMonsterLog from '../notepad/monstorLog/monstorLog';
import injectNotepadShowLogs from '../combatLog';
import insertElement from '../common/insertElement';
import insertHtmlBeforeEnd from '../common/insertHtmlBeforeEnd';
import jConfirm from '../common/jConfirm';
import jQueryDialog from '../chrome/jQueryDialog';
import jQueryNotPresent from '../common/jQueryNotPresent';
import on from '../common/on';
import {saveBoxes} from './settingObj';
import {sendEvent} from '../support/fshGa';
import setValue from '../system/setValue';
import setupConfigData from './configData';
import toggleVisibilty from '../common/toggleVisibilty';
import {createBr, createSpan} from '../common/cElement';

function findEl(el, name) {
  return document.querySelector(
    '#fshSettingsTable ' + el + '[name="' + name + '"]');
}

function findInput(name) {
  return findEl('input', name);
}

function findSelect(name) {
  return findEl('select', name);
}

function mappedVars() {
  [
    ['showBuffs', 'showHuntingBuffs'],
    ['buffs', 'huntingBuffs'],
    ['buffsName', 'huntingBuffsName'],
    ['buffs2', 'huntingBuffs2'],
    ['buffs2Name', 'huntingBuffs2Name'],
    ['buffs3', 'huntingBuffs3'],
    ['buffs3Name', 'huntingBuffs3Name']
  ].forEach(function(el) {
    calf[el[0]] = getValue(el[1]);
  });
}

function simpleVars() {
  [
    'doNotKillList',
    'bountyListRefreshTime',
    'wantedNames',
    'combatEvaluatorBias',
    'enabledHuntingMode'
  ].forEach(getCalfPrefs);
}

function getVars() {
  mappedVars();
  simpleVars();
  calf.storage = (JSON.stringify(localStorage).length /
    (5 * 1024 * 1024) * 100).toFixed(2);
}

function toggleTickAllBuffs(e) { // jQuery
  var allItems = $('input[name^="blockedSkillList"]:visible',
    '#settingsTabs-4');
  var tckTxt = $(e.target);
  allItems.prop('checked', tckTxt.text() === 'Tick all buffs');
  if (tckTxt.text() === 'Tick all buffs') {
    tckTxt.text('Untick all buffs');
  } else {
    tckTxt.text('Tick all buffs');
  }
}

function clearStorage() {
  jConfirm('Clear localStorage',
    'Are you sure you want to clear you localStorage?',
    function() {localStorage.clear();}
  );
}

function saveValueForm(name) {
  var formElement = findInput(name);
  if (formElement.type === 'checkbox') {
    setValue(name, formElement.checked);
  } else {
    setValue(name, formElement.value);
  }
}

function saveNumeric(name) {
  var formElement = findSelect(name);
  setValue(name, Number(formElement.value));
}

function saveOther(name) {
  var formElement = findSelect(name);
  setValue(name, formElement.value);
}

function checkNumeric(name, min, def) {
  var myInput = findInput(name);
  var inputValue = Number(myInput.value);
  if (isNaN(inputValue) || inputValue <= min) {
    myInput.value = def;
  }
}

function saveConfig() { // jQuery
  checkNumeric('maxCompressedCharacters', 50, 1500);
  checkNumeric('maxCompressedLines', 1, 25);
  checkNumeric('newGuildLogHistoryPages', 1, 25);
  checkNumeric('maxGroupSizeToJoin', 1, 11);
  saveNumeric('combatEvaluatorBias');
  saveOther('enabledHuntingMode');
  saveBoxes.forEach(saveValueForm);
  dialogMsg('FS Helper Settings Saved');
}

function showLogs() {
  sendEvent('settingsPage', 'injectNotepadShowLogs');
  jQueryDialog(injectNotepadShowLogs);
}

function showMonsterLogs() {
  sendEvent('settingsPage', 'injectMonsterLog');
  jQueryDialog(injectMonsterLog);
}

function insertFshTab(settingsTabs) {
  if ($(settingsTabs).tabs('length') > 0) {
    $(settingsTabs).tabs('add', '#fshSettings', 'FSH Settings');
  }
}

function doTickAll() {
  var tickAll = createSpan({
    id: 'fshAllBuffs',
    className: 'fshLink',
    textContent: 'Tick all buffs'
  });
  on(tickAll, 'click', toggleTickAllBuffs);
  var inject = getElementById('settingsTabs-4').children[0].rows[0].cells[0];
  insertElement(inject, createBr());
  insertElement(inject, tickAll);
}

function clickHandlers() {
  [
    ['fshClearStorage', clearStorage],
    ['Helper:SaveOptions', saveConfig],
    ['Helper:ShowLogs', showLogs],
    ['Helper:ShowMonsterLogs', showMonsterLogs]
  ].forEach(function(el) {
    on(getElementById(el[0]), 'click', el[1]);
  });
}

function onVisibilityToggle() {
  [
    'toggleShowGuildSelfMessage',
    'toggleShowGuildFrndMessage',
    'toggleShowGuildPastMessage',
    'toggleShowGuildEnmyMessage'
  ].forEach(function(id) {
    on(getElementById(id), 'click', toggleVisibilty);
  });
}

function createEventListeners() { // Legacy
  doTickAll();
  clickHandlers();
  onVisibilityToggle();
}

export default function injectSettings() { // jQuery
  if (jQueryNotPresent()) {return;}
  getVars();
  setupConfigData();
  var settingsTabs = getElementById('settingsTabs');
  insertHtmlBeforeEnd(settingsTabs, '<div id="fshSettings">' +
    calf.configData + '</div>');
  insertFshTab(settingsTabs);

  createEventListeners();

  setValue('minGroupLevel',
    document.querySelector('input[name="min_group_level"]').value);
}
