import expandMenu from './expandMenu';
import keyHandlerEvent from './keyHandlerEvent';

export default function logPage() {
  keyHandlerEvent('logPage');
  expandMenu('2');
  location.href = 'index.php?cmd=log';
}
