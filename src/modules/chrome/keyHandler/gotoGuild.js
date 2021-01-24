import expandMenu from './expandMenu';
import { guildSubcmdUrl } from '../../support/constants';
import keyHandlerEvent from './keyHandlerEvent';
import navigateTo from '../../common/navigateTo';

export default function gotoGuild() {
  keyHandlerEvent('gotoGuild');
  expandMenu('4');
  navigateTo(`${guildSubcmdUrl}manage`);
}
