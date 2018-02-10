import getValue from '../system/getValue';
import {isChecked} from '../system/system';
import {helpLink, simpleCheckbox} from './simpleCheckbox';

export default function logPrefs() {
  // Log screen prefs
  return '<tr><th colspan="2"><b>Log screen preferences' +
      '</b></th></tr>' +

    simpleCheckbox('hideNonPlayerGuildLogMessages') +
    simpleCheckbox('useNewGuildLog') +

    '<tr><td class="fshRight">New Guild Log History' +
      helpLink('New Guild Log History (pages)',
        'This is the number of pages that the new guild log ' +
        'screen will go back in history.') +
      ':</td><td><input name="newGuildLogHistoryPages" size="3" value="' +
      getValue('newGuildLogHistoryPages') + '"></td></td></tr>' +

    simpleCheckbox('enableLogColoring') +

    '<tr><td class="fshRight">New Log Message Sound' +
      helpLink('New Log Message Sound',
        'The .wav or .ogg file to play when you have unread log messages. ' +
        'This must be a .wav or .ogg file. This option can be turned on/off ' +
        'on the world page. Only works in Firefox 3.5+') +
      ':</td><td colspan="3"><input name="defaultMessageSound" size="60" ' +
      'value="' + getValue('defaultMessageSound') +
      '"></td></tr>' +

    '<tr><td class="fshRight">Play sound on unread log' +
      helpLink('Play sound on unread log',
        'Should the above sound play when you have unread log messages? ' +
        '(will work on Firefox 3.5+ only)') +
      ':</td><td><input name="playNewMessageSound" type="checkbox" ' +
      'value="on"' +
      isChecked(getValue('playNewMessageSound')) + '>' +
      ' Show speaker on world' +
      helpLink('Show speaker on world',
        'Should the toggle play sound speaker show on the world map? ' +
        '(This icon is next to the Fallensword wiki icon and will only ' +
        'display on Firefox 3.5+)') +
      ':<input name="showSpeakerOnWorld" type="checkbox" value="on"' +
      isChecked(getValue('showSpeakerOnWorld')) +
      '></tr></td>' +

    simpleCheckbox('enableChatParsing') +
    simpleCheckbox('keepBuffLog') +
    simpleCheckbox('addAttackLinkToLog') +
    simpleCheckbox('enhanceChatTextEntry');
}
