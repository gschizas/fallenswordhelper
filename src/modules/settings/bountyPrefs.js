import calf from '../support/calf';
import {isChecked} from '../support/system';
import {networkIcon} from './settingObj';
import {helpLink, simpleCheckbox} from './settingsPage';

export default function bountyPrefs() {
  // Bounty hunting prefs
  return '<tr><th colspan="2"><b>Bounty hunting preferences' +
      '</b></th></tr>' +

    '<tr><td align= "right">' + networkIcon +
      'Show Active Bounties' +
      helpLink('Show Active Bounties',
        'This will show your active bounties on the right hand side') +
      ':</td><td colspan="3"><input name="enableActiveBountyList" ' +
      'type = "checkbox" value = "on"' +
      isChecked(calf.enableActiveBountyList) + '>&nbsp;' +
      '<input name="bountyListRefreshTime" size="3" value="' +
      calf.bountyListRefreshTime + '"> seconds refresh</td></tr>' +

    '<tr><td align= "right">' + networkIcon +
      'Show Wanted Bounties' +
      helpLink('Show Wanted Bounties',
        'This will show when someone you want is on the bounty board, ' +
        'the list is displayed on the right hand side') +
      ':</td><td colspan="3"><input name="enableWantedList" ' +
      'type="checkbox" value="on"' +
      isChecked(calf.enableWantedList) +
      '> Refresh time is same as Active Bounties' +

    '<tr><td align= "right">Wanted Names' +
      helpLink('Wanted Names',
        'The names of the people you want to see on the bounty board ' +
        'separated by commas') + ':</td><td colspan="3">' +
      '<input name="wantedNames" size="60" value="' + calf.wantedNames +
      '"></td></tr>' +

    simpleCheckbox('enableAttackHelper') +
    simpleCheckbox('showPvPSummaryInLog');
}
