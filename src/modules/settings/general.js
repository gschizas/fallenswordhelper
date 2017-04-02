import calf from '../support/calf';
import * as settingObj from './settingObj';
import * as settingsPage from './settingsPage';
import * as system from '../support/system';

export function prefs() {
  // General Prefs
  return '<tr><th colspan="2"><b>General preferences ' +
      '(apply to most screens)</b></th></tr>' +

    '<tr><td class="fshRight">' +
      '<label for="enableGuildInfoWidgets">' +
      'Enable Guild Info Widgets' +
      settingsPage.helpLink('Enable Guild Info Widgets',
      'Enabling this option will enable the Guild Info Widgets ' +
      '(coloring on the Guild Info panel)') + ':</label></td><td>' +
      '<input id="enableGuildInfoWidgets" name="enableGuildInfoWidgets" ' +
      'type="checkbox" value="on"' +
      settingsPage.isChecked(calf.enableGuildInfoWidgets) +
      '>&nbsp;' +
      '<label>Hide Message&gt;<input name="hideGuildInfoMessage" ' +
      'type="checkbox" value="on"' +
      settingsPage.isChecked(calf.hideGuildInfoMessage) +
      '></label>&nbsp;' +
      '<label>Hide Buff&gt;<input name="hideGuildInfoBuff" ' +
      'type="checkbox" value="on"' +
      settingsPage.isChecked(calf.hideGuildInfoBuff) +
      '></label>&nbsp;' +
      '<label>Hide ST&gt;<input name="hideGuildInfoSecureTrade" ' +
      'type="checkbox" value="on"' +
      settingsPage.isChecked(calf.hideGuildInfoSecureTrade) +
      '></label>&nbsp;' +
      '<label>Hide Trade&gt;<input name="hideGuildInfoTrade" ' +
      'type="checkbox" value="on"' +
      settingsPage.isChecked(calf.hideGuildInfoTrade) +
      '></label></td></tr>' +

    settingsPage.simpleCheckbox('moveGuildList') +
    settingsPage.simpleCheckbox('moveOnlineAlliesList') +

    '<tr><td class="fshRight">' + settingObj.networkIcon +
      'Show Online Allies/Enemies' +
      settingsPage.helpLink('Show Online Allies/Enemies',
      'This will show the allies/enemies online list on the right.') +
      ':</td><td><label>Allies&nbsp;<input name="enableAllyOnlineList" ' +
      'type="checkbox" value="on"' +
      settingsPage.isChecked(calf.enableAllyOnlineList) +
      '></label>&nbsp;&nbsp;<label>Enemies&nbsp;' +
      '<input name="enableEnemyOnlineList" type="checkbox" value="on"' +
      settingsPage.isChecked(calf.enableEnemyOnlineList) +
      '></label>&nbsp;&nbsp;' +
      '<input name="allyEnemyOnlineRefreshTime" size="3" value="' +
      system.getValue('allyEnemyOnlineRefreshTime') +
      '"> seconds refresh</td></tr>' +

    settingsPage.simpleCheckbox('enableOnlineAlliesWidgets') +
    settingsPage.simpleCheckbox('moveFSBox') +
    settingsPage.simpleCheckbox('fsboxlog') +
    settingsPage.simpleCheckbox('gameHelpLink') +
    settingsPage.simpleCheckbox('enableTempleAlert') +
    settingsPage.simpleCheckbox('enableUpgradeAlert') +
    settingsPage.simpleCheckbox('enableComposingAlert') +
    settingsPage.simpleCheckbox('enhanceOnlineDots') +
    settingsPage.simpleCheckbox('hideBuffSelected') +
    settingsPage.simpleCheckbox('hideHelperMenu') +
    settingsPage.simpleCheckbox('keepHelperMenuOnScreen') +
    settingsPage.simpleCheckbox('draggableHelperMenu') +

    '<tr><td class="fshRight">Quick Links Screen Location' +
      settingsPage.helpLink('Quick Links Screen Location',
      'Determines where the quick links dialog shows on the screen. ' +
      'Default is top 22, left 0.') +
      ':</td><td>Top: <input name="quickLinksTopPx" size="3" value="' +
      system.getValue('quickLinksTopPx') +
      '"> Left: <input name="quickLinksLeftPx" size="3" value="' +
      system.getValue('quickLinksLeftPx') +
      '"></td></tr>' +
    settingsPage.simpleCheckbox('draggableQuickLinks') +
    settingsPage.simpleCheckbox('expandMenuOnKeyPress');
}
