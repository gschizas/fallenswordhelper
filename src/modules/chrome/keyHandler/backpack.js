import expandMenu from './expandMenu';
import keyHandlerEvent from './keyHandlerEvent';

export default function backpack() {
  keyHandlerEvent('backpack');
  expandMenu('2');
  location.href = 'index.php?cmd=profile&subcmd=dropitems';
}
