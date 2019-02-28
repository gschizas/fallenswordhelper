import dialogMsg from '../common/dialogMsg';
import {getElementById} from '../common/getElement';
import injectMonsterLog from '../notepad/monstorLog/monstorLog';
import injectNotepadShowLogs from '../notepad/combatLog';
import insertElement from '../common/insertElement';
import jConfirm from '../common/jConfirm';
import jQueryDialog from '../chrome/jQueryDialog';
import on from '../common/on';
import querySelector from '../common/querySelector';
import {saveBoxes} from './settingObj';
import {sendEvent} from '../support/fshGa';
import setValue from '../system/setValue';
import toggleVisibilty from '../common/toggleVisibilty';
import {createBr, createSpan} from '../common/cElement';

function findEl(el, name) {
  return querySelector('#fshSettingsTable ' + el + '[name="' + name + '"]');
}

function findInput(name) {
  return findEl('input', name);
}

function findSelect(name) {
  return findEl('select', name);
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

function listener(el) {on(getElementById(el[0]), 'click', el[1]);}

function clickHandlers() {
  [
    ['fshClearStorage', clearStorage],
    ['Helper:SaveOptions', saveConfig],
    ['Helper:ShowLogs', showLogs],
    ['Helper:ShowMonsterLogs', showMonsterLogs]
  ].forEach(listener);
}

function toggleListener(id) {on(getElementById(id), 'click', toggleVisibilty);}

function onVisibilityToggle() {
  [
    'toggleShowGuildSelfMessage',
    'toggleShowGuildFrndMessage',
    'toggleShowGuildPastMessage',
    'toggleShowGuildEnmyMessage'
  ].forEach(toggleListener);
}

export default function createEventListeners() { // Legacy
  doTickAll();
  clickHandlers();
  onVisibilityToggle();
}
