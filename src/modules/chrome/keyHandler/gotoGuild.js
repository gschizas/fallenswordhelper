import expandMenu from './expandMenu';
import keyHandlerEvent from './keyHandlerEvent';

export default function gotoGuild() {
  keyHandlerEvent('gotoGuild');
  expandMenu('4');
  location.href = 'index.php?cmd=guild&subcmd=manage';
}
