import {composingUrl} from '../support/constants';
import {getElementById} from '../common/getElement';
import insertHtmlAfterBegin from '../common/insertHtmlAfterBegin';

var composeMsg =
  '<li class="notification"><a href="' + composingUrl + '"><span' +
  ' class="notification-icon"></span><p class="notification-content">' +
  'Composing to do</p></a></li>';

export default function displayComposeMsg() {
  insertHtmlAfterBegin(getElementById('notifications'), composeMsg);
}
