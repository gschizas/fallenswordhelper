import { dropItemsUrl } from '../../support/constants';
import expandMenu from './expandMenu';
import keyHandlerEvent from './keyHandlerEvent';
import navigateTo from '../../common/navigateTo';

export default function backpack() {
  keyHandlerEvent('backpack');
  expandMenu('2');
  navigateTo(dropItemsUrl);
}
