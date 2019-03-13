import on from '../common/on';
import parseError from './parseError';
import {sendException} from './fshGa';

var enabled;

function handleMsgStack(stuff) {
  if (stuff) {
    var msg = parseError(stuff);
    if (msg.includes('calfSystem')) {
      sendException(msg, true);
    }
  }
}

function logError(e) {
  handleMsgStack(e.error);
}

function unhandledrejection(e) {
  handleMsgStack(e.reason);
}

export default function globalErrorHandler() {
  if (!enabled) {
    on(window, 'error', logError);
    on(window, 'unhandledrejection', unhandledrejection);
    enabled = true;
  }
}
