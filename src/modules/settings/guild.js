import * as settingsPage from './settingsPage';
import * as system from '../support/system';

function injectSettingsGuildData(guildType) { // Native
  return '<input name="guild' + guildType + '" size="60" value="' +
    system.getValue('guild' + guildType) + '">' +
    '<span class="fshPoint" ' +
    'id="toggleShowGuild' + guildType + 'Message" linkto="showGuild' +
    guildType + 'Message"> &#x00bb;</span>' +
    '<div id="showGuild' + guildType + 'Message" class="fshHide">' +
    '<input name="guild' + guildType + 'Message" size="60" value="' +
    system.getValue('guild' + guildType + 'Message') + '">' +
    '</div>';
}

export function prefs() {
  // Guild Manage
  return '<tr><th colspan="2"><b>Guild>Manage preferences' +
      '</b></th></tr>' +
    '<tr><td colspan="2">Enter guild names, ' +
      'separated by commas</td></tr>' +
    '<tr><td class="fshRight">Own Guild</td><td>' +
      injectSettingsGuildData('Self') + '</td></tr>' +
    '<tr><td class="fshRight">Friendly Guilds</td><td>' +
      injectSettingsGuildData('Frnd') + '</td></tr>' +
    '<tr><td class="fshRight">Old Guilds</td><td>' +
      injectSettingsGuildData('Past') + '</td></tr>' +
    '<tr><td class="fshRight">Enemy Guilds</td><td>' +
      injectSettingsGuildData('Enmy') + '</td></tr>' +

    '<tr><td class="fshRight">Highlight Valid PvP Targets' +
      settingsPage.helpLink('Highlight Valid PvP Targets',
      'Enabling this option will highlight targets in OTHER guilds that ' +
      'are within your level range to attack for PvP or GvG.') +
      ':</td><td>PvP: <input name="highlightPlayersNearMyLvl" ' +
      'type="checkbox" value="on"' +
      system.isChecked(system.getValue('highlightPlayersNearMyLvl')) +
      '> GvG: <input name="highlightGvGPlayersNearMyLvl" ' +
      'type="checkbox" value="on"' +
      system.isChecked(system.getValue('highlightGvGPlayersNearMyLvl')) +
      '></td></tr>' +

    settingsPage.simpleCheckbox('showAdmin') +
    settingsPage.simpleCheckbox('ajaxifyRankControls') +
    settingsPage.simpleCheckbox('detailedConflictInfo');
}
