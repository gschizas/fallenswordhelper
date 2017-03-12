import * as settingsPage from './settingsPage';
import * as system from '../support/system';

export function prefs() {
  // Quest Preferences
  return '<tr><th colspan="2"><b>Quest preferences</b></th></tr>' +

    '<tr><td class="fshRight">Hide Specific Quests' +
      settingsPage.helpLink('Hide Specific Quests',
      'If enabled, this hides quests whose name matches the list ' +
      '(separated by commas). This works on Quest Manager and Quest Book.') +
      ':</td><td colspan="3"><input name="hideQuests" type="checkbox" ' +
      'value="on"' +
      (system.getValue('hideQuests') ? ' checked' : '') + '>' +
      '&nbsp;<input name="hideQuestNames" size="60" value="' +
      system.getValue('hideQuestNames') + '"></td></tr>' +

    settingsPage.simpleCheckbox('storeLastQuestPage') +
    settingsPage.simpleCheckbox('showNextQuestSteps');
}
