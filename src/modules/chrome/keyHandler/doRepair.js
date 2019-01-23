import {getElementById} from '../../common/getElement';
import keyHandlerEvent from './keyHandlerEvent';

export default function doRepair() {
  // do not use repair link for new map
  if (!getElementById('worldPage')) {
    keyHandlerEvent('doRepair');
    location.href = 'index.php?cmd=blacksmith&subcmd=repairall';
  }
}
