import expandMenu from './expandMenu';
import keyHandlerEvent from './keyHandlerEvent';

export default function createGroup() {
  keyHandlerEvent('createGroup');
  expandMenu('4');
  location.href =
    'index.php?cmd=guild&subcmd=groups&subcmd2=create';
}
