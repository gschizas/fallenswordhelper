import expandMenu from './expandMenu';
import keyHandlerEvent from './keyHandlerEvent';
import {logUrl} from '../../support/constants';

export default function logPage() {
  keyHandlerEvent('logPage');
  expandMenu('2');
  location.href = logUrl;
}
