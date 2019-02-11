import on from '../common/on';
import parseError from './parseError';
import {sendException} from './fshGa';

var enabled;

function logError(e) {
  if (e.error) {
    var msg = parseError(e.error);
    if (msg.includes('calfSystem')) {
      sendException(msg, true);
    }
  }
}

export default function globalErrorHandler() {
  if (!enabled) {
    on(window, 'error', logError);
    enabled = true;
  }
}
