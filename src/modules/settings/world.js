import calf from '../support/calf';
import * as settingObj from './settingObj';
import * as settingsPage from './settingsPage';
import * as system from '../support/system';

export function prefs() {
  // World Screen
  return '<tr><th colspan="2"><b>' +
    'World screen/Hunting preferences</b></th></tr>' +

    '<tr><td class="fshRight">Hide Create Group Button' +
      settingsPage.helpLink('Hide Create Group Button',
      'Enabling this option will hide the Create Group button') +
      ':</td><td>' +
      '<input name="hideChampionsGroup" type="checkbox" value="on"' +
        (system.getValue('hideChampionsGroup') ? ' checked' : '') + '>' +
      '&nbsp;Champions&nbsp;&nbsp;' +
      '<input name="hideElitesGroup" type="checkbox" value="on"' +
        (system.getValue('hideElitesGroup') ? ' checked' : '') + '>' +
      '&nbsp;Elites&nbsp;&nbsp;' +
      '<input name="hideSEGroup" type="checkbox" value="on"' +
        (system.getValue('hideSEGroup') ? ' checked' : '') + '>' +
      '&nbsp;Super Elite&nbsp;&nbsp;' +
      '<input name="hideTitanGroup" type="checkbox" value="on"' +
        (system.getValue('hideTitanGroup') ? ' checked' : '') + '>' +
      '&nbsp;Titan&nbsp;&nbsp;' +
      '<input name="hideLegendaryGroup" type="checkbox" value="on"' +
        (system.getValue('hideLegendaryGroup') ? ' checked' : '') + '>' +
      '&nbsp;Legendary' +
      '</td></tr>' +

    '<tr><td class="fshRight">Keep Combat Logs' +
      settingsPage.helpLink('Keep Combat Logs',
      'Save combat logs to a temporary variable. ' +
      'Press <u>Show logs</u> on the right to display and copy them') +
      ':</td><td><input name="keepLogs" type="checkbox" value="on"' +
      (system.getValue('keepLogs') ? ' checked' : '') + '>&nbsp;&nbsp;' +
      '<input type="button" class="custombutton" value="Show Logs" ' +
      'id="Helper:ShowLogs"></td></tr>' +

    settingsPage.simpleCheckbox('showCombatLog') +
    settingsPage.simpleCheckbox('enableCreatureColoring') +
    settingsPage.simpleCheckbox('showCreatureInfo') +

    '<tr><td class="fshRight">Combat Evaluator Bias' +
      settingsPage.helpLink('Combat Evaluator Bias',
      'This changes the bias of the combat evaluator for the damage and ' +
      'HP evaluation. It will not change the attack bias (1.1053).' +
      '<br>Conservative = 1.1053 and 1.1 (Safest)' +
      '<br>Semi-Conservative = 1.1 and 1.053' +
      '<br>Adventurous = 1.053 and 1 (Bleeding Edge)' +
      '<br>Conservative+ = 1.1053 and 1 with the attack calculation ' +
      'changed to +-48 per RJEM') +
      ':</td><td><select name="combatEvaluatorBias">' +
      '<option value="0"' +
      (calf.combatEvaluatorBias === 0 ? ' SELECTED' : '') +
      '>Conservative</option>' +
      '<option value="1"' +
      (calf.combatEvaluatorBias === 1 ? ' SELECTED' : '') +
      '>Semi-Conservative</option>' +
      '<option value="2"' +
      (calf.combatEvaluatorBias === 2 ? ' SELECTED' : '') +
      '>Adventurous</option>' +
      '<option value="3"' +
      (calf.combatEvaluatorBias === 3 ? ' SELECTED' : '') +
      '>Conservative+</option></select></td></tr>' +

    '<tr><td class="fshRight">' + settingObj.networkIcon + 'Keep Creature Log' +
      settingsPage.helpLink('Keep Creature Log',
      'This will show the creature log for each creature you see when ' +
      'you travel.') +
      ':</td><td><input name="showMonsterLog" type="checkbox" value="on"' +
      (system.getValue('showMonsterLog') ? ' checked' : '') + '>' +
      '&nbsp;&nbsp;<input type="button" class="custombutton" ' +
      'value="Show" id="Helper:ShowMonsterLogs"></td></tr>' +

    '<tr><td class="fshRight">Show Send Gold' +
      settingsPage.helpLink('Show Gold on World Screen',
      'This will show an icon below the world map to allow you to ' +
      'quickly send gold to a Friend.') +
      ':</td><td><input name="sendGoldonWorld" type="checkbox" value="on"' +
      (system.getValue('sendGoldonWorld') ? ' checked' : '') + '>' +
      '&nbsp;&nbsp;Send <input name="goldAmount" size="5" value="' +
      system.getValue('goldAmount') + '"> ' +
      'gold to <input name="goldRecipient" size="10" value="' +
      system.getValue('goldRecipient') + '">' +
      ' Current total: <input name="currentGoldSentTotal" size="5" value="' +
      system.getValue('currentGoldSentTotal') + '">' +
      '</td></tr>' +

    '<tr><td class="fshRight">Do Not Kill List' +
      settingsPage.helpLink('Do Not Kill List',
      'List of creatures that will not be killed by quick kill. ' +
      'You must type the full name of each creature, separated by commas. ' +
      'Creature name will show up in red color on world screen and will ' +
      'not be killed by keyboard entry (but can still be killed by ' +
      'mouseclick). Quick kill must be enabled for this function to work.') +
      ':</td><td colspan="3"><input name="doNotKillList" size="60" value="' +
      calf.doNotKillList + '"></td></tr>' +

    '<tr><td class="fshRight">Hunting Buffs' +
      settingsPage.helpLink('Hunting Buffs',
      'Customize which buffs are designated as hunting buffs. ' +
      'You must type the full name of each buff, ' +
      'separated by commas. Use the checkbox to enable/disable them.') +
      ':</td><td colspan="3"><input name="showHuntingBuffs" ' +
      'type="checkbox" value="on"' +
      (system.getValue('showHuntingBuffs') ? ' checked' : '') + '> ' +
      'Enabled Hunting Mode' +
      settingsPage.helpLink('Enabled Hunting Mode',
      'This will determine which list of buffs gets checked ' +
      'on the world screen.') +
      ':<select name="enabledHuntingMode">' +
      '<option value="1"' +
      (calf.enabledHuntingMode === '1' ? ' SELECTED' : '') +
      '>' + calf.buffsName + '</option>' +
      '<option value="2"' +
      (calf.enabledHuntingMode === '2' ? ' SELECTED' : '') +
      '>' + calf.buffs2Name + '</option>' +
      '<option value="3"' +
      (calf.enabledHuntingMode === '3' ? ' SELECTED' : '') +
      '>' + calf.buffs3Name + '</option>' +
      '</select></td></tr>' +
    '<tr><td class="fshRight">' + calf.buffsName + ' Hunting Buff List' +
      settingsPage.helpLink(calf.buffsName + ' Hunting Buff List',
      calf.buffsName + ' list of hunting buffs.') +
      ':</td><td colspan="3"><input name="huntingBuffsName" ' +
      'title="Hunting mode name" size="7" value="' + calf.buffsName +
      '"><input name="huntingBuffs" size="49" value="' + calf.buffs +
      '"></td></tr>' +
    '<tr><td class="fshRight">' + calf.buffs2Name + ' Hunting Buff List' +
      settingsPage.helpLink(calf.buffs2Name + ' Hunting Buff List',
      'List of ' + calf.buffs2Name + ' hunting buffs.') +
      ':</td><td colspan="3"><input name="huntingBuffs2Name" ' +
      'title="Hunting mode name" size="7" value="' + calf.buffs2Name +
      '"><input name="huntingBuffs2" size="49" value="' + calf.buffs2 +
      '"></td></tr>' +
    '<tr><td class="fshRight">' + calf.buffs3Name + ' Hunting Buff List' +
      settingsPage.helpLink(calf.buffs3Name + ' Hunting Buff List',
      'List of ' + calf.buffs3Name + ' hunting buffs.') +
      ':</td><td colspan="3"><input name="huntingBuffs3Name" ' +
      'title="Hunting mode name" size="7" value="' + calf.buffs3Name +
      '"><input name="huntingBuffs3" size="49" value="' + calf.buffs3 +
      '"></td></tr>' +

    settingsPage.simpleCheckbox('huntingMode');
}
