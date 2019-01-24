import {getElementById} from '../../common/getElement';
import insertHtmlAfterBegin from '../../common/insertHtmlAfterBegin';
import notGoldUpgradesPage from './notGoldUpgradesPage';
import {pointsUrl} from '../../support/constants';

var goldUpgradeMsg =
'<li class="notification"><a href="' + pointsUrl + '&type=1"><span' +
' class="notification-icon"></span><p class="notification-content">Up' +
'grade stamina with gold</p></a></li>';

export default function displayUpgradeMsg() {
  if (notGoldUpgradesPage()) {
    insertHtmlAfterBegin(getElementById('notifications'), goldUpgradeMsg);
  }
}
