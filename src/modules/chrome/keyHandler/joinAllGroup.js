import expandMenu from './expandMenu';
import joinGroups from '../../common/joinGroups';
import keyHandlerEvent from './keyHandlerEvent';

export default function joinAllGroup() {
  keyHandlerEvent('joinAllGroup');
  expandMenu('4');
  joinGroups();
}
