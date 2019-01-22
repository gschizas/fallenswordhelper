import calf from '../../support/calf';
import insertQuickWear from '../../notepad/quickWear/quickWear';
import jQueryDialog from '../jQueryDialog';
import keyHandlerEvent from './keyHandlerEvent';

export default function fastWearMgr() {
  if (!('dialogIsClosed' in calf) || calf.dialogIsClosed()) {
    keyHandlerEvent('insertQuickWear');
    jQueryDialog(insertQuickWear);
  }
}
