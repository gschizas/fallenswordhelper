import * as settingsPage from './settingsPage';
import * as system from '../support/system';

export function prefs() {
  // Equipment screen prefs
  return '<tr><th colspan="2"><b>Equipment screen preferences' +
      '</b></th></tr>' +

    settingsPage.simpleCheckbox('showExtraLinks') +
    settingsPage.simpleCheckbox('disableItemColoring') +

    '<tr><td class="fshRight">Show Quick Send Item' +
      settingsPage.helpLink('Show Quick Send on Manage Backpack',
      'This will show a link beside each item which gives the option to ' +
      'quick send the item to this person') +
      ':</td><td><input name="showQuickSendLinks" type="checkbox" ' +
      'value="on"' +
      system.isChecked(system.getValue('showQuickSendLinks')) + '>' +
      '&nbsp;&nbsp;Send Items To ' +
      '<input name="itemRecipient" size="10" value="' +
      system.getValue('itemRecipient') + '">' +

    settingsPage.simpleCheckbox('showQuickDropLinks') +

    '<tr><td class="fshRight">Quick Select all of type in Send Screen' +
      settingsPage.helpLink('Quick Select all of type in Send Screen',
      'This allows you to customize what quick links you would like ' +
      'displayed in your send item screen.<br>Use the format ' +
      '[&quot;name&quot;,&quot;itemid&quot;],[&quot;othername&quot;,' +
      '&quot;itemid2&quot;].<br>WARNING: NO REFUNDS ON ERROR') +
      ':</td><td><input name="sendClasses" size="60" value="' +
      system.escapeHtml(system.getValue('sendClasses')) + '">';
}
