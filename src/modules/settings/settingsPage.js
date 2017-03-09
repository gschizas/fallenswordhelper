import calf from '../support/calf';
import * as configData from './configData';
import * as layout from '../support/layout';
import * as settingObj from './settingObj';
import * as system from '../support/system';

function getVars() {
  calf.buffs = system.getValue('huntingBuffs');
  calf.buffsName = system.getValue('huntingBuffsName');
  calf.buffs2 = system.getValue('huntingBuffs2');
  calf.buffs2Name = system.getValue('huntingBuffs2Name');
  calf.buffs3 = system.getValue('huntingBuffs3');
  calf.buffs3Name = system.getValue('huntingBuffs3Name');
  calf.doNotKillList = system.getValue('doNotKillList');

  // var enableActiveBountyList = calf.enableActiveBountyList;
  calf.bountyListRefreshTime = system.getValue('bountyListRefreshTime');
  // var enableWantedList = calf.enableWantedList;
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

export function simpleCheckbox(name) { // Native
  var o = settingObj.mySimpleCheckboxes[name];
  return '<tr><td align="right">' +
    (o.network ? settingObj.networkIcon : '') +
    '<label for="' + o.id + '">' + o.helpTitle +
    helpLink(o.helpTitle, o.helpText) +
    ':</label></td><td><input id="' + o.id +
    '" name="' + o.id + '" type="checkbox" value="on"' +
    (system.getValue(o.id) ? ' checked' : '') + '></td></tr>';
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

export function injectSettingsGuildData(guildType) { // Native
  return '<input name="guild' + guildType + '" size="60" value="' +
    system.getValue('guild' + guildType) + '">' +
    '<span class="fshPoint" ' +
    'id="toggleShowGuild' + guildType + 'Message" linkto="showGuild' +
    guildType + 'Message"> &#x00bb;</span>' +
    '<div id="showGuild' + guildType + 'Message" ' +
    'class="fshHide">' +
    '<input name="guild' + guildType + 'Message" size="60" value="' +
    system.getValue('guild' + guildType + 'Message') + '">' +
    '</div>';
}

function clearStorage() { // Native
  layout.confirm('Clear localStorage',
    'Are you sure you want to clear you localStorage?',
    function() {localStorage.clear();}
  );
}

function saveValueForm(name) {
  /* jshint validthis: true */
  var formElement =
    system.findNode('//input[@name="' + name + '"]', this);
  if (formElement.getAttribute('type') === 'checkbox') {
    system.setValue(name, formElement.checked);
  } else if (formElement.getAttribute('type') === 'radio') {
    var radioElements = system.findNodes('//input[@name="' + name +
      '"]', 0, this);
    for (var i = 0; i < radioElements.length; i += 1) {
      if (radioElements[i].checked) {
        system.setValue(name, radioElements[i].value);
      }
    }
  } else {
    system.setValue(name, formElement.value);
  }
}

function saveConfig(evt) { // Legacy
  var oForm = evt.target.form;

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

  settingObj.saveBoxes.forEach(saveValueForm, oForm);

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

export function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function createEventListeners() {
  var tickAll = $('<span class="fshLink">Tick all buffs</span>');
  tickAll.click(toggleTickAllBuffs);
  $('#settingsTabs-4 td').eq(0).append('<br>').append(tickAll);

  document.getElementById('fshClearStorage')
    .addEventListener('click', clearStorage, true);

  document.getElementById('Helper:SaveOptions')
    .addEventListener('click', saveConfig, true);
  document.getElementById('Helper:ShowLogs')
    .addEventListener('click', showLogs, true);
  document.getElementById('Helper:ShowMonsterLogs')
    .addEventListener('click', showMonsterLogs, true);

  document.getElementById('toggleShowGuildSelfMessage')
    .addEventListener('click', system.toggleVisibilty, true);
  document.getElementById('toggleShowGuildFrndMessage')
    .addEventListener('click', system.toggleVisibilty, true);
  document.getElementById('toggleShowGuildPastMessage')
    .addEventListener('click', system.toggleVisibilty, true);
  document.getElementById('toggleShowGuildEnmyMessage')
    .addEventListener('click', system.toggleVisibilty, true);
}

export function injectSettings() { // Legacy

  getVars();
  configData.setupConfigData();

  var maxID = parseInt($('div[id*="settingsTabs-"]:last').attr('id')
    .split('-')[1], 10);
  $('div[id*="settingsTabs-"]:last').after('<div id="settingsTabs-' +
    (maxID + 1) + '">' + calf.configData + '</div>');
  if ($('#settingsTabs').tabs('length') > 0) {
    // chrome, have to add it this way (due to loading order
    $('#settingsTabs').tabs('add', '#settingsTabs-' + (maxID + 1),
      'FSH Settings');
  } else {
    // firefox loads it later, so just print to page
    $('a[href*="settingsTabs-"]:last').parent()
      .after('<li><a href="#settingsTabs-' + (maxID + 1) +
      '">FSH Settings</a></li>');
  }

  createEventListeners();

  var minGroupLevelTextField =
    system.findNode('//input[@name="min_group_level"]');
  if (minGroupLevelTextField) {
    var minGroupLevel = minGroupLevelTextField.value;
    system.setValue('minGroupLevel', minGroupLevel);
  }
}
