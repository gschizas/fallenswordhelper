import bunchOfSimple from './bunchOfSimple';
import getValue from '../system/getValue';
import isValueChecked from './isValueChecked';
import { helpLink, simpleCheckbox } from './simpleCheckbox';

function injectSettingsGuildData(guildType) {
  let title = '';
  let disabled = '';
  if (guildType === 'Self') {
    title = ' title="This is automatically detected"';
    disabled = ' disabled';
  }
  return `<input${title} name="guild${guildType}" size="60" value="${
    getValue(`guild${guildType}`)}"${disabled}>`

    + '<span class="fshPoint" '
    + `id="toggleShowGuild${guildType}Message" data-linkto="showGuild${
      guildType}Message"> &#x00bb;</span>`

    + `<div id="showGuild${guildType}Message" class="fshHide">`
    + `<input name="guild${guildType}Message" size="60" value="${
      getValue(`guild${guildType}Message`)}">`
    + '</div>';
}

function guildNames() {
  return '<tr><td colspan="2">'
      + 'Enter guild names, separated by commas</td></tr>'
    + `<tr><td class="fshRight">Own Guild</td><td>${
      injectSettingsGuildData('Self')}</td></tr>`
    + `<tr><td class="fshRight">Friendly Guilds</td><td>${
      injectSettingsGuildData('Frnd')}</td></tr>`
    + `<tr><td class="fshRight">Old Guilds</td><td>${
      injectSettingsGuildData('Past')}</td></tr>`
    + `<tr><td class="fshRight">Enemy Guilds</td><td>${
      injectSettingsGuildData('Enmy')}</td></tr>`;
}

function pvpTargets() {
  return `<tr><td class="fshRight">Highlight Valid PvP Targets${
    helpLink('Highlight Valid PvP Targets',
      'Enabling this option will highlight targets in OTHER guilds that '
      + 'are within your level range to attack for PvP or GvG.')
  }:</td><td>PvP: <input name="highlightPlayersNearMyLvl" `
    + `type="checkbox" value="on"${
      isValueChecked('highlightPlayersNearMyLvl')
    }> GvG: <input name="highlightGvGPlayersNearMyLvl" `
    + `type="checkbox" value="on"${
      isValueChecked('highlightGvGPlayersNearMyLvl')
    }></td></tr>`;
}

export default function guildPrefs() {
  // Guild Manage
  return '<tr><th colspan="2"><b>Guild>Manage preferences'
    + `</b></th></tr>${
      simpleCheckbox('showGuildRelationship')}${
      guildNames()}${
      pvpTargets()}${
      bunchOfSimple([
        'showAdmin',
        'ajaxifyRankControls',
        'detailedConflictInfo',
        'enableHistoryCompressor',
      ])}`;
}
