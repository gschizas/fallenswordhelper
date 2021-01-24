import expandMenu from './expandMenu';
import { groupsSubcmdUrl } from '../../support/constants';
import keyHandlerEvent from './keyHandlerEvent';
import navigateTo from '../../common/navigateTo';

export default function createGroup() {
  keyHandlerEvent('createGroup');
  expandMenu('4');
  navigateTo(`${groupsSubcmdUrl}create`);
}
