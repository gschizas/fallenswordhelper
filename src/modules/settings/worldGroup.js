import * as settingsPage from './settingsPage';
import * as system from '../support/system';

export function prefs() {
  // World Screen
  return '<tr><td class="fshRight">Hide Create Group Button' +
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
    '</td></tr>';
}
