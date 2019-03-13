import on from '../common/on';
import parseError from './parseError';
import {sendException} from './fshGa';

var enabled;

function handleMsgStack(stuff) {
  var msg = parseError(stuff);
  if (msg.includes('calfSystem')) {
    sendException(msg, true);
  }
}

function handleError(stuff) {
  if (stuff) {
    handleMsgStack(stuff);
  }
}

function logError(e) {
  handleError(e.error);
}

function unhandledrejection(e) {
  handleError(e.reason);
}

export default function globalErrorHandler() {
  if (!enabled) {
    on(window, 'error', logError);
    on(window, 'unhandledrejection', unhandledrejection);
    enabled = true;
  }
}
