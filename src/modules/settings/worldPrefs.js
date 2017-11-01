import calf from '../support/calf';
import {networkIcon} from './settingObj';
import {getValue, isChecked, isSelected} from '../support/system';
import {helpLink, simpleCheckbox} from './settingsPage';

function worldGroup() {
  // World Screen
  return '<tr><td class="fshRight">Hide Create Group Button' +
    helpLink('Hide Create Group Button',
      'Enabling this option will hide the Create Group button') +
    ':</td><td>' +
    '<input name="hideChampionsGroup" type="checkbox" value="on"' +
      isChecked(getValue('hideChampionsGroup')) + '>' +
    '&nbsp;Champions&nbsp;&nbsp;' +
    '<input name="hideElitesGroup" type="checkbox" value="on"' +
      isChecked(getValue('hideElitesGroup')) + '>' +
    '&nbsp;Elites&nbsp;&nbsp;' +
    '<input name="hideSEGroup" type="checkbox" value="on"' +
      isChecked(getValue('hideSEGroup')) + '>' +
    '&nbsp;Super Elite&nbsp;&nbsp;' +
    '<input name="hideTitanGroup" type="checkbox" value="on"' +
      isChecked(getValue('hideTitanGroup')) + '>' +
    '&nbsp;Titan&nbsp;&nbsp;' +
    '<input name="hideLegendaryGroup" type="checkbox" value="on"' +
      isChecked(getValue('hideLegendaryGroup')) + '>' +
    '&nbsp;Legendary' +
    '</td></tr>';
}

function combatEvalBias() {
  return '<tr><td class="fshRight">Combat Evaluator Bias' +
    helpLink('Combat Evaluator Bias',
      'This changes the bias of the combat evaluator for the damage and ' +
      'HP evaluation. It will not change the attack bias (1.1053).' +
      '<br>Conservative = 1.1053 and 1.1 (Safest)' +
      '<br>Semi-Conservative = 1.1 and 1.053' +
      '<br>Adventurous = 1.053 and 1 (Bleeding Edge)' +
      '<br>Conservative+ = 1.1053 and 1 with the attack calculation ' +
      'changed to +-48 per RJEM') +
    ':</td><td><select name="combatEvaluatorBias">' +
    '<option value="0"' +
    isSelected(calf.combatEvaluatorBias, 0) +
    '>Conservative</option>' +
    '<option value="1"' +
    isSelected(calf.combatEvaluatorBias, 1) +
    '>Semi-Conservative</option>' +
    '<option value="2"' +
    isSelected(calf.combatEvaluatorBias, 2) +
    '>Adventurous</option>' +
    '<option value="3"' +
    isSelected(calf.combatEvaluatorBias, 3) +
    '>Conservative+</option></select></td></tr>';
}

function huntBuff() {
  return 'Hunting Buffs' + helpLink('Hunting Buffs',
    'Customize which buffs are designated as hunting buffs. ' +
    'You must type the full name of each buff, separated by commas. ' +
    'Use the checkbox to enable/disable them.') + ':';
}

function huntBuffCheck() {
  return '<input name="showHuntingBuffs" ' +
    'class="fshVMid" type="checkbox" value="on"' +
    isChecked(calf.showBuffs) + '>';
}

export function huntMode() {
  return 'Enabled Hunting Mode' +
    helpLink('Enabled Hunting Mode',
      'This will determine which list of buffs gets checked ' +
      'on the world screen.') +
    ':<select name="enabledHuntingMode">' +
    '<option value="1"' + isSelected(calf.enabledHuntingMode, '1') +
    '>' + calf.buffsName + '</option>' +
    '<option value="2"' + isSelected(calf.enabledHuntingMode, '2') +
    '>' + calf.buffs2Name + '</option>' +
    '<option value="3"' + isSelected(calf.enabledHuntingMode, '3') +
    '>' + calf.buffs3Name + '</option>' +
    '</select>';
}

export function huntingBuffsHtml() {
  return huntBuff() + huntBuffCheck() + ' ' + huntMode();
}

function huntingBuffs() {
  return '<tr><td class="fshRight">' + huntBuff() + '</td><td colspan="3">' +
    huntBuffCheck() + ' ' + huntMode() + '</td></tr>';
}

export function prefs() {
  // World Screen
  return '<tr><th colspan="2"><b>' +
    'World screen/Hunting preferences</b></th></tr>' +

    worldGroup() +

    '<tr><td class="fshRight">Keep Combat Logs' +
      helpLink('Keep Combat Logs',
        'Save combat logs to a temporary variable. ' +
        'Press <u>Show logs</u> on the right to display and copy them') +
      ':</td><td><input name="keepLogs" type="checkbox" value="on"' +
      isChecked(getValue('keepLogs')) + '>&nbsp;&nbsp;' +
      '<input type="button" class="custombutton" value="Show Logs" ' +
      'id="Helper:ShowLogs"></td></tr>' +

    simpleCheckbox('showCombatLog') +
    simpleCheckbox('enableCreatureColoring') +
    simpleCheckbox('showCreatureInfo') +

    combatEvalBias() +

    '<tr><td class="fshRight">' + networkIcon + 'Keep Creature Log' +
      helpLink('Keep Creature Log',
        'This will show the creature log for each creature you see when ' +
        'you travel.') +
      ':</td><td><input name="showMonsterLog" type="checkbox" value="on"' +
      isChecked(getValue('showMonsterLog')) + '>' +
      '&nbsp;&nbsp;<input type="button" class="custombutton" ' +
      'value="Show" id="Helper:ShowMonsterLogs"></td></tr>' +

    '<tr><td class="fshRight">Show Send Gold' +
      helpLink('Show Gold on World Screen',
        'This will show an icon below the world map to allow you to ' +
        'quickly send gold to a Friend.') +
      ':</td><td><input name="sendGoldonWorld" type="checkbox" value="on"' +
      isChecked(getValue('sendGoldonWorld')) + '>' +
      '&nbsp;&nbsp;Send <input name="goldAmount" size="5" value="' +
      getValue('goldAmount') + '"> ' +
      'gold to <input name="goldRecipient" size="10" value="' +
      getValue('goldRecipient') + '">' +
      ' Current total: <input name="currentGoldSentTotal" size="5" value="' +
      getValue('currentGoldSentTotal') + '">' +
      '</td></tr>' +

    '<tr><td class="fshRight">Do Not Kill List' +
      helpLink('Do Not Kill List',
        'List of creatures that will not be killed by quick kill. ' +
        'You must type the full name of each creature, separated by commas. ' +
        'Creature name will show up in red color on world screen and will ' +
        'not be killed by keyboard entry (but can still be killed by ' +
        'mouseclick). Quick kill must be enabled for this function to work.') +
      ':</td><td colspan="3"><input name="doNotKillList" size="60" value="' +
      calf.doNotKillList + '"></td></tr>' +

    huntingBuffs() +

    '<tr><td class="fshRight">' + calf.buffsName + ' Hunting Buff List' +
      helpLink(calf.buffsName + ' Hunting Buff List',
        calf.buffsName + ' list of hunting buffs.') +
      ':</td><td colspan="3"><input name="huntingBuffsName" ' +
      'title="Hunting mode name" size="7" value="' + calf.buffsName +
      '"><input name="huntingBuffs" size="49" value="' + calf.buffs +
      '"></td></tr>' +
    '<tr><td class="fshRight">' + calf.buffs2Name + ' Hunting Buff List' +
      helpLink(calf.buffs2Name + ' Hunting Buff List',
        'List of ' + calf.buffs2Name + ' hunting buffs.') +
      ':</td><td colspan="3"><input name="huntingBuffs2Name" ' +
      'title="Hunting mode name" size="7" value="' + calf.buffs2Name +
      '"><input name="huntingBuffs2" size="49" value="' + calf.buffs2 +
      '"></td></tr>' +
    '<tr><td class="fshRight">' + calf.buffs3Name + ' Hunting Buff List' +
      helpLink(calf.buffs3Name + ' Hunting Buff List',
        'List of ' + calf.buffs3Name + ' hunting buffs.') +
      ':</td><td colspan="3"><input name="huntingBuffs3Name" ' +
      'title="Hunting mode name" size="7" value="' + calf.buffs3Name +
      '"><input name="huntingBuffs3" size="49" value="' + calf.buffs3 +
      '"></td></tr>' +

    simpleCheckbox('huntingMode');
}
