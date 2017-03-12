import * as settingsPage from './settingsPage';
import * as system from '../support/system';

export function prefs() {
  // Log screen prefs
  return '<tr><th colspan="2"><b>Log screen preferences' +
      '</b></th></tr>' +

    settingsPage.simpleCheckbox('hideNonPlayerGuildLogMessages') +
    settingsPage.simpleCheckbox('useNewGuildLog') +

    '<tr><td class="fshRight">New Guild Log History' +
      settingsPage.helpLink('New Guild Log History (pages)',
      'This is the number of pages that the new guild log ' +
      'screen will go back in history.') +
      ':</td><td><input name="newGuildLogHistoryPages" size="3" value="' +
      system.getValue('newGuildLogHistoryPages') + '"></td></td></tr>' +

    settingsPage.simpleCheckbox('enableLogColoring') +

    '<tr><td class="fshRight">New Log Message Sound' +
      settingsPage.helpLink('New Log Message Sound',
      'The .wav or .ogg file to play when you have unread log messages. ' +
      'This must be a .wav or .ogg file. This option can be turned on/off ' +
      'on the world page. Only works in Firefox 3.5+') +
      ':</td><td colspan="3"><input name="defaultMessageSound" size="60" ' +
      'value="' + system.getValue('defaultMessageSound') +
      '"></td></tr>' +

    '<tr><td class="fshRight">Play sound on unread log' +
      settingsPage.helpLink('Play sound on unread log',
      'Should the above sound play when you have unread log messages? ' +
      '(will work on Firefox 3.5+ only)') +
      ':</td><td><input name="playNewMessageSound" type="checkbox" ' +
      'value="on"' +
      (system.getValue('playNewMessageSound') ? ' checked' : '') + '>' +
      ' Show speaker on world' +
      settingsPage.helpLink('Show speaker on world',
      'Should the toggle play sound speaker show on the world map? ' +
      '(This icon is next to the Fallensword wiki icon and will only ' +
      'display on Firefox 3.5+)') +
      ':<input name="showSpeakerOnWorld" type="checkbox" value="on"' +
      (system.getValue('showSpeakerOnWorld') ? ' checked' : '') +
      '></tr></td>' +

    settingsPage.simpleCheckbox('enableChatParsing') +
    settingsPage.simpleCheckbox('keepBuffLog') +
    settingsPage.simpleCheckbox('addAttackLinkToLog') +
    settingsPage.simpleCheckbox('enhanceChatTextEntry');
}
