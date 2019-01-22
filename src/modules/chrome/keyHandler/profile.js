import expandMenu from './expandMenu';
import keyHandlerEvent from './keyHandlerEvent';

export default function profile() {
  keyHandlerEvent('profile');
  expandMenu('2');
  location.href = 'index.php?cmd=profile';
}
