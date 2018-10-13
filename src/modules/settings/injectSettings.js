import calf from '../support/calf';
import dialogMsg from '../common/dialogMsg';
import {getElementById} from '../common/getElement';
import getValue from '../system/getValue';
import injectMonsterLog from '../monstorLog';
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

function getVars() {
  calf.showBuffs = getValue('showHuntingBuffs');
  calf.buffs = getValue('huntingBuffs');
  calf.buffsName = getValue('huntingBuffsName');
  calf.buffs2 = getValue('huntingBuffs2');
  calf.buffs2Name = getValue('huntingBuffs2Name');
  calf.buffs3 = getValue('huntingBuffs3');
  calf.buffs3Name = getValue('huntingBuffs3Name');
  calf.doNotKillList = getValue('doNotKillList');

  calf.bountyListRefreshTime = getValue('bountyListRefreshTime');
  calf.wantedNames = getValue('wantedNames');
  calf.combatEvaluatorBias = getValue('combatEvaluatorBias');
  calf.enabledHuntingMode = getValue('enabledHuntingMode');
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

function createEventListeners() { // Legacy
  var tickAll = createSpan({
    id: 'fshAllBuffs',
    className: 'fshLink',
    textContent: 'Tick all buffs'
  });
  on(tickAll, 'click', toggleTickAllBuffs);
  var inject = getElementById('settingsTabs-4').firstElementChild
    .rows[0].cells[0];
  insertElement(inject, createBr());
  insertElement(inject, tickAll);

  on(getElementById('fshClearStorage'), 'click', clearStorage);

  on(getElementById('Helper:SaveOptions'), 'click', saveConfig);
  on(getElementById('Helper:ShowLogs'), 'click', showLogs);
  on(getElementById('Helper:ShowMonsterLogs'), 'click', showMonsterLogs);

  on(getElementById('toggleShowGuildSelfMessage'), 'click', toggleVisibilty);
  on(getElementById('toggleShowGuildFrndMessage'), 'click', toggleVisibilty);
  on(getElementById('toggleShowGuildPastMessage'), 'click', toggleVisibilty);
  on(getElementById('toggleShowGuildEnmyMessage'), 'click', toggleVisibilty);
}

export default function injectSettings() { // jQuery
  if (jQueryNotPresent()) {return;}
  getVars();
  setupConfigData();
  var settingsTabs = getElementById('settingsTabs');
  insertHtmlBeforeEnd(settingsTabs, '<div id="fshSettings">' +
    calf.configData + '</div>');
  if ($(settingsTabs).tabs('length') > 0) {
    $(settingsTabs).tabs('add', '#fshSettings', 'FSH Settings');
  }

  createEventListeners();

  setValue('minGroupLevel',
    document.querySelector('input[name="min_group_level"]').value);
}
