import expandMenu from './expandMenu';
import keyHandlerEvent from './keyHandlerEvent';
import { logUrl } from '../../support/constants';
import navigateTo from '../../common/navigateTo';

export default function logPage() {
  keyHandlerEvent('logPage');
  expandMenu('2');
  navigateTo(logUrl);
}
