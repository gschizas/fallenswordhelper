import expandMenu from './expandMenu';
import keyHandlerEvent from './keyHandlerEvent';
import navigateTo from '../../common/navigateTo';
import { profileUrl } from '../../support/constants';

export default function profile() {
  keyHandlerEvent('profile');
  expandMenu('2');
  navigateTo(profileUrl);
}
