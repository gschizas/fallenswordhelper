import expandMenu from './expandMenu';
import keyHandlerEvent from './keyHandlerEvent';
import {profileUrl} from '../../support/constants';

export default function profile() {
  keyHandlerEvent('profile');
  expandMenu('2');
  location.href = profileUrl;
}
