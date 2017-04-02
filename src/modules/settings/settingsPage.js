import calf from '../support/calf';
import * as configData from './configData';
import * as layout from '../support/layout';
import * as settingObj from './settingObj';
import * as system from '../support/system';

function getVars() { // Native
  calf.buffs = system.getValue('huntingBuffs');
  calf.buffsName = system.getValue('huntingBuffsName');
  calf.buffs2 = system.getValue('huntingBuffs2');
  calf.buffs2Name = system.getValue('huntingBuffs2Name');
  calf.buffs3 = system.getValue('huntingBuffs3');
  calf.buffs3Name = system.getValue('huntingBuffs3Name');
  calf.doNotKillList = system.getValue('doNotKillList');

  calf.bountyListRefreshTime = system.getValue('bountyListRefreshTime');
  calf.wantedNames = system.getValue('wantedNames');
  calf.combatEvaluatorBias = system.getValue('combatEvaluatorBias');
  calf.enabledHuntingMode = system.getValue('enabledHuntingMode');
  calf.storage = (JSON.stringify(localStorage).length /
    (5 * 1024 * 1024) * 100).toFixed(2);
}

export function helpLink(title, text) { // Native
  return '&nbsp;[&nbsp;<span class="fshLink tip-static" data-tipped="' +
    '<span class=\'fshHelpTitle\'>' + title + '</span><br><br>' +
    text + '">?</span>&nbsp;]';
}

function hasNetwork(o) { // Native
  if (o.network) {return settingObj.networkIcon;}
  return '';
}

export function isChecked(pref) { // Native
  if (pref) {return ' checked';}
  return '';
}

function isOn(o) { // Native
  return isChecked(system.getValue(o.id));
}

export function simpleCheckboxHtml(name) {
  var o = settingObj.mySimpleCheckboxes[name];
  return hasNetwork(o) +
    '<label for="' + o.id + '">' + o.helpTitle +
    helpLink(o.helpTitle, o.helpText) +
    ':</label></td><td><input id="' + o.id +
    '" name="' + o.id + '" class="fshVMid" type="checkbox" value="on"' +
    isOn(o) + '>';
}

export function simpleCheckbox(name) { // Native
  return '<tr><td align="right">' +
    simpleCheckboxHtml(name) + '</td></tr>';
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

function clearStorage() { // Native
  layout.confirm('Clear localStorage',
    'Are you sure you want to clear you localStorage?',
    function() {localStorage.clear();}
  );
}

function saveValueForm(oForm, name) { // Legacy
  var formElement =
    system.findNode('//input[@name="' + name + '"]', oForm);
  if (formElement.getAttribute('type') === 'checkbox') {
    system.setValue(name, formElement.checked);
  } else if (formElement.getAttribute('type') === 'radio') {
    var radioElements = system.findNodes('//input[@name="' + name +
      '"]', 0, oForm);
    for (var i = 0; i < radioElements.length; i += 1) {
      if (radioElements[i].checked) {
        system.setValue(name, radioElements[i].value);
      }
    }
  } else {
    system.setValue(name, formElement.value);
  }
}

function bioCompressValid(oForm) { // Legacy
  // bio compressor validation logic
  var maxCompressedCharacters =
    system.findNode('//input[@name="maxCompressedCharacters"]', oForm);
  var maxCompressedCharactersValue = Number(maxCompressedCharacters.value);
  if (isNaN(maxCompressedCharactersValue) ||
      maxCompressedCharactersValue <= 50) {
    maxCompressedCharacters.value = 1500;
  }
  var maxCompressedLines =
    system.findNode('//input[@name="maxCompressedLines"]', oForm);
  var maxCompressedLinesValue = Number(maxCompressedLines.value);
  if (isNaN(maxCompressedLinesValue) || maxCompressedLinesValue <= 1) {
    maxCompressedLines.value = 25;
  }
}

function saveConfig(evt) { // Legacy
  var oForm = evt.target.form;
  bioCompressValid(oForm);
  var newGuildLogHistoryPages =
    system.findNode('//input[@name="newGuildLogHistoryPages"]', oForm);
  var newGuildLogHistoryPagesValue = Number(newGuildLogHistoryPages.value);
  if (isNaN(newGuildLogHistoryPagesValue) ||
      newGuildLogHistoryPagesValue <= 1) {
    newGuildLogHistoryPages.value = 25;
  }
  var maxGroupSizeToJoin =
    system.findNode('//input[@name="maxGroupSizeToJoin"]', oForm);
  var maxGroupSizeToJoinValue = Number(maxGroupSizeToJoin.value);
  if (isNaN(maxGroupSizeToJoinValue) || maxGroupSizeToJoinValue <= 1) {
    maxGroupSizeToJoin.value = 11;
  }
  var combatEvaluatorBiasElement =
    system.findNode('//select[@name="combatEvaluatorBias"]', oForm);
  var combatEvaluatorBias = Number(combatEvaluatorBiasElement.value);
  system.setValue('combatEvaluatorBias', combatEvaluatorBias);
  var enabledHuntingModeElement =
    system.findNode('//select[@name="enabledHuntingMode"]', oForm);
  var enabledHuntingMode = enabledHuntingModeElement.value;
  system.setValue('enabledHuntingMode', enabledHuntingMode);

  settingObj.saveBoxes.forEach(saveValueForm.bind(null, oForm));

  $('#dialog_msg').text('FS Helper Settings Saved').dialog('open');
}

function showLogs() { // Native
  document.location = system.server +
    'index.php?cmd=notepad&blank=1&subcmd=showlogs';
}

function showMonsterLogs() { // Native
  document.location = system.server +
    'index.php?cmd=notepad&blank=1&subcmd=monsterlog';
}

function createEventListeners() { // Native
  var tickAll = document.createElement('span');
  tickAll.id = 'fshAllBuffs';
  tickAll.className = 'fshLink';
  tickAll.textContent = 'Tick all buffs';
  tickAll.addEventListener('click', toggleTickAllBuffs);
  var inject = document.getElementById('settingsTabs-4').firstElementChild
    .rows[0].cells[0];
  inject.appendChild(document.createElement('br'));
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
    .addEventListener('click', system.toggleVisibilty);
  document.getElementById('toggleShowGuildFrndMessage')
    .addEventListener('click', system.toggleVisibilty);
  document.getElementById('toggleShowGuildPastMessage')
    .addEventListener('click', system.toggleVisibilty);
  document.getElementById('toggleShowGuildEnmyMessage')
    .addEventListener('click', system.toggleVisibilty);
}

export function injectSettings() { // jQuery.min
  getVars();
  configData.setupConfigData();
  var settingsTabs = document.getElementById('settingsTabs');
  settingsTabs.insertAdjacentHTML('beforeend', '<div id="fshSettings">' +
    calf.configData + '</div>');
  if ($(settingsTabs).tabs('length') > 0) {
    $(settingsTabs).tabs('add', '#fshSettings', 'FSH Settings');
  }
  createEventListeners();
  system.setValue('minGroupLevel', document.getElementById('settingsTabs-1')
    .firstElementChild.lastElementChild.rows[1].cells[1].firstElementChild
    .value);
}
