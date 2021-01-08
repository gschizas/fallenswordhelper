import getElementById from '../../common/getElement';
import keyHandlerEvent from './keyHandlerEvent';

export default function notWorld(type, href) {
  if (!getElementById('worldPage')) {
    keyHandlerEvent(type);
    window.location.href = href;
  }
}
