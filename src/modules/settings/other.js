import * as settingsPage from './settingsPage';
import * as system from '../support/system';

export function prefs() {
  // Other prefs
  return '<tr><th colspan="2"><b>Other preferences</b></th></tr>' +

    settingsPage.simpleCheckbox('autoFillMinBidPrice') +

    '<tr><td class="fshRight">Hide Specific Recipes' +
      settingsPage.helpLink('Hide Specific Recipes',
      'If enabled, this hides recipes whose name matches the list ' +
      '(separated by commas). This works on Recipe Manager') +
      ':</td><td colspan="3"><input name="hideRecipes" ' +
      'type="checkbox" value="on"' +
      (system.getValue('hideRecipes') ? ' checked' : '') + '>' +
      '&nbsp;<input name="hideRecipeNames" size="60" value="' +
      system.getValue('hideRecipeNames') + '"></td></tr>' +

    settingsPage.simpleCheckbox('hideRelicOffline') +
    settingsPage.simpleCheckbox('enterForSendMessage') +
    settingsPage.simpleCheckbox('navigateToLogAfterMsg') +

    '<tr><td align= "right">Max Group Size to Join' +
      settingsPage.helpLink('Max Group Size to Join',
      'This will disable HCSs Join All functionality and will only join ' +
      'groups less than a set size. ') +
      ':</td><td colspan="3"><input name="enableMaxGroupSizeToJoin" ' +
      'type = "checkbox" value = "on"' +
      (system.getValue('enableMaxGroupSizeToJoin') ? ' checked' : '') +
      '>&nbsp;&nbsp;Max Size: ' +
      '<input name="maxGroupSizeToJoin" size="3" value="' +
      system.getValue('maxGroupSizeToJoin') + '"></td></tr>' +

    settingsPage.simpleCheckbox('moveComposingButtons');
}
