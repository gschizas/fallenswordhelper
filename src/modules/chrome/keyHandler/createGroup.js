import expandMenu from './expandMenu';
import {groupsSubcmdUrl} from '../../support/constants';
import keyHandlerEvent from './keyHandlerEvent';

export default function createGroup() {
  keyHandlerEvent('createGroup');
  expandMenu('4');
  location.href = groupsSubcmdUrl + 'create';
}
