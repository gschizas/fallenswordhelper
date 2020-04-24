import expandMenu from './expandMenu';
import { guildSubcmdUrl } from '../../support/constants';
import keyHandlerEvent from './keyHandlerEvent';

export default function gotoGuild() {
  keyHandlerEvent('gotoGuild');
  expandMenu('4');
  window.location.href = `${guildSubcmdUrl}manage`;
}
