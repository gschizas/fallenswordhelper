import {sendEvent} from '../../support/fshGa';

export default function keyHandlerEvent(func) {
  sendEvent('keyHandler', func);
}
