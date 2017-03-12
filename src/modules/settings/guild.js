import * as settingsPage from './settingsPage';
import * as system from '../support/system';

export function prefs() {
  // Guild Manage
  return '<tr><th colspan="2"><b>Guild>Manage preferences' +
      '</b></th></tr>' +
    '<tr><td colspan="2">Enter guild names, ' +
      'separated by commas</td></tr>' +
    '<tr><td class="fshRight">Own Guild</td><td>' +
      settingsPage.injectSettingsGuildData('Self') + '</td></tr>' +
    '<tr><td class="fshRight">Friendly Guilds</td><td>' +
      settingsPage.injectSettingsGuildData('Frnd') + '</td></tr>' +
    '<tr><td class="fshRight">Old Guilds</td><td>' +
      settingsPage.injectSettingsGuildData('Past') + '</td></tr>' +
    '<tr><td class="fshRight">Enemy Guilds</td><td>' +
      settingsPage.injectSettingsGuildData('Enmy') + '</td></tr>' +

    '<tr><td class="fshRight">Highlight Valid PvP Targets' +
      settingsPage.helpLink('Highlight Valid PvP Targets',
      'Enabling this option will highlight targets in OTHER guilds that ' +
      'are within your level range to attack for PvP or GvG.') +
      ':</td><td>PvP: <input name="highlightPlayersNearMyLvl" ' +
      'type="checkbox" value="on"' +
      (system.getValue('highlightPlayersNearMyLvl') ? ' checked' : '') +
      '> GvG: <input name="highlightGvGPlayersNearMyLvl" ' +
      'type="checkbox" value="on"' +
      (system.getValue('highlightGvGPlayersNearMyLvl') ?
      ' checked' : '') + '></td></tr>' +

    settingsPage.simpleCheckbox('showAdmin') +
    settingsPage.simpleCheckbox('ajaxifyRankControls') +
    settingsPage.simpleCheckbox('detailedConflictInfo');
}
