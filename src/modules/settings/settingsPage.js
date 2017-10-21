import calf from '../support/calf';
import injectMonsterLog from '../monstorLog';
import injectNotepadShowLogs from '../combatLog';
import {jConfirm} from '../support/layout';
import jQueryDialog from '../chrome/jQueryDialog';
import mySimpleCheckboxes from './simple';
import setupConfigData from './configData';
import {createBr, createSpan} from '../common/cElement';
import {
  findNode,
  getValue,
  isChecked,
  setValue,
  toggleVisibilty
} from '../support/system';
import {networkIcon, saveBoxes} from './settingObj';

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

export function helpLink(title, text) {
  return '&nbsp;[&nbsp;<span class="fshLink tip-static" data-tipped="' +
    '<span class=\'fshHelpTitle\'>' + title + '</span><br><br>' +
    text + '">?</span>&nbsp;]';
}

function hasNetwork(o) {
  if (o.network) {return networkIcon;}
  return '';
}

function isOn(o) {
  return isChecked(getValue(o.id));
}

function justLabel(name) {
  var o = mySimpleCheckboxes[name];
  return hasNetwork(o) +
    '<label for="' + o.id + '">' + o.helpTitle +
    helpLink(o.helpTitle, o.helpText) +
    ':</label>';
}

function justCheckbox(name) {
  var o = mySimpleCheckboxes[name];
  return '<input id="' + o.id + '" name="' + o.id +
    '" class="fshVMid" type="checkbox" value="on"' + isOn(o) + '>';
}

export function simpleCheckboxHtml(name) {
  return justLabel(name) + justCheckbox(name);
}

export function simpleCheckbox(name) {
  return '<tr><td align="right">' + justLabel(name) +
    '</td><td>' + justCheckbox(name) + '</td></tr>';
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

function saveValueForm(oForm, name) { // Legacy
  var formElement =
    findNode('//input[@name="' + name + '"]', oForm);
  if (formElement.getAttribute('type') === 'checkbox') {
    setValue(name, formElement.checked);
  } else {
    setValue(name, formElement.value);
  }
}

function setMaxCompressedCharacters(oForm) { // Legacy
  var maxCompressedCharacters =
    findNode('//input[@name="maxCompressedCharacters"]', oForm);
  var maxCompressedCharactersValue = Number(maxCompressedCharacters.value);
  if (isNaN(maxCompressedCharactersValue) ||
      maxCompressedCharactersValue <= 50) {
    maxCompressedCharacters.value = 1500;
  }
}

function setMaxCompressedLines(oForm) { // Legacy
  var maxCompressedLines =
    findNode('//input[@name="maxCompressedLines"]', oForm);
  var maxCompressedLinesValue = Number(maxCompressedLines.value);
  if (isNaN(maxCompressedLinesValue) || maxCompressedLinesValue <= 1) {
    maxCompressedLines.value = 25;
  }
}

function setGuildLogHistoryPages(oForm) { // Legacy
  var newGuildLogHistoryPages =
    findNode('//input[@name="newGuildLogHistoryPages"]', oForm);
  var newGuildLogHistoryPagesValue = Number(newGuildLogHistoryPages.value);
  if (isNaN(newGuildLogHistoryPagesValue) ||
      newGuildLogHistoryPagesValue <= 1) {
    newGuildLogHistoryPages.value = 25;
  }
}

function setMaxGroupSizeToJoin(oForm) { // Legacy
  var maxGroupSizeToJoin =
    findNode('//input[@name="maxGroupSizeToJoin"]', oForm);
  var maxGroupSizeToJoinValue = Number(maxGroupSizeToJoin.value);
  if (isNaN(maxGroupSizeToJoinValue) || maxGroupSizeToJoinValue <= 1) {
    maxGroupSizeToJoin.value = 11;
  }
}

function saveConfig(evt) { // Legacy
  var oForm = evt.target.form;
  // bio compressor validation logic
  setMaxCompressedCharacters(oForm);
  setMaxCompressedLines(oForm);
  setGuildLogHistoryPages(oForm);
  setMaxGroupSizeToJoin(oForm);
  var combatEvaluatorBiasElement =
    findNode('//select[@name="combatEvaluatorBias"]', oForm);
  var combatEvaluatorBias = Number(combatEvaluatorBiasElement.value);
  setValue('combatEvaluatorBias', combatEvaluatorBias);
  var enabledHuntingModeElement =
    findNode('//select[@name="enabledHuntingMode"]', oForm);
  var enabledHuntingMode = enabledHuntingModeElement.value;
  setValue('enabledHuntingMode', enabledHuntingMode);

  saveBoxes.forEach(saveValueForm.bind(null, oForm));

  $('#dialog_msg').text('FS Helper Settings Saved').dialog('open');
}

function showLogs() {
  jQueryDialog(injectNotepadShowLogs);
}

function showMonsterLogs() {
  jQueryDialog(injectMonsterLog);
}

function createEventListeners() {
  var tickAll = createSpan({
    id: 'fshAllBuffs',
    className: 'fshLink',
    textContent: 'Tick all buffs'
  });
  tickAll.addEventListener('click', toggleTickAllBuffs);
  var inject = document.getElementById('settingsTabs-4').firstElementChild
    .rows[0].cells[0];
  inject.appendChild(createBr());
  inject.appendChild(tickAll);

  document.getElementById('fshClearStorage')
    .addEventListener('click', clearStorage);

  document.getElementById('Helper:SaveOptions')
    .addEventListener('click', saveConfig);
  document.getElementById('Helper:ShowLogs')
    .addEventListener('click', showLogs);
  document.getElementById('Helper:ShowMonsterLogs')
    .addEventListener('click', showMonsterLogs);

  document.getElementById('toggleShowGuildSelfMessage')
    .addEventListener('click', toggleVisibilty);
  document.getElementById('toggleShowGuildFrndMessage')
    .addEventListener('click', toggleVisibilty);
  document.getElementById('toggleShowGuildPastMessage')
    .addEventListener('click', toggleVisibilty);
  document.getElementById('toggleShowGuildEnmyMessage')
    .addEventListener('click', toggleVisibilty);
}

export function injectSettings() { // jQuery.min
  getVars();
  setupConfigData();
  var settingsTabs = document.getElementById('settingsTabs');
  settingsTabs.insertAdjacentHTML('beforeend', '<div id="fshSettings">' +
    calf.configData + '</div>');
  if ($(settingsTabs).tabs('length') > 0) {
    $(settingsTabs).tabs('add', '#fshSettings', 'FSH Settings');
  }
  createEventListeners();
  setValue('minGroupLevel', document.getElementById('settingsTabs-1')
    .firstElementChild.lastElementChild.rows[1].cells[1].firstElementChild
    .value);
}
