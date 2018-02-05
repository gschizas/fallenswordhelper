import {getValue, isChecked} from '../system/system';
import {helpLink, simpleCheckbox} from './settingsPage';

export default function otherPrefs() {
  // Other prefs
  return '<tr><th colspan="2"><b>Other preferences</b></th></tr>' +

    simpleCheckbox('autoFillMinBidPrice') +

    '<tr><td class="fshRight">Hide Specific Recipes' +
      helpLink('Hide Specific Recipes',
        'If enabled, this hides recipes whose name matches the list ' +
        '(separated by commas). This works on Recipe Manager') +
      ':</td><td colspan="3"><input name="hideRecipes" ' +
      'type="checkbox" value="on"' +
      isChecked(getValue('hideRecipes')) + '>' +
      '&nbsp;<input name="hideRecipeNames" size="60" value="' +
      getValue('hideRecipeNames') + '"></td></tr>' +

    simpleCheckbox('hideRelicOffline') +
    simpleCheckbox('enterForSendMessage') +
    simpleCheckbox('navigateToLogAfterMsg') +

    '<tr><td align= "right">Max Group Size to Join' +
      helpLink('Max Group Size to Join',
        'This will disable HCSs Join All functionality and will only join ' +
        'groups less than a set size. ') +
      ':</td><td colspan="3"><input name="enableMaxGroupSizeToJoin" ' +
      'type = "checkbox" value = "on"' +
      isChecked(getValue('enableMaxGroupSizeToJoin')) +
      '>&nbsp;&nbsp;Max Size: ' +
      '<input name="maxGroupSizeToJoin" size="3" value="' +
      getValue('maxGroupSizeToJoin') + '"></td></tr>' +

    simpleCheckbox('moveComposingButtons');
}
