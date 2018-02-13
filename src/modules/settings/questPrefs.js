import getValue from '../system/getValue';
import isChecked from '../system/isChecked';
import {helpLink, simpleCheckbox} from './simpleCheckbox';

export default function questPrefs() {
  // Quest Preferences
  return '<tr><th colspan="2"><b>Quest preferences</b></th></tr>' +

    '<tr><td class="fshRight">Hide Specific Quests' +
      helpLink('Hide Specific Quests',
        'If enabled, this hides quests whose name matches the list ' +
        '(separated by commas). This works on Quest Manager and Quest Book.') +
      ':</td><td colspan="3"><input name="hideQuests" type="checkbox" ' +
      'value="on"' +
      isChecked(getValue('hideQuests')) + '>' +
      '&nbsp;<input name="hideQuestNames" size="60" value="' +
      getValue('hideQuestNames') + '"></td></tr>' +

    simpleCheckbox('storeLastQuestPage') +
    simpleCheckbox('showNextQuestSteps');
}
