import on from '../common/on';
import parseError from './parseError';
import {sendException} from './fshGa';

var enabled;

function handleMsgStack(type, stuff) {
  var msg = parseError(stuff);
  if (msg.includes('calfSystem')) {
    sendException(type + msg, true);
  }
}

function handleError(type, stuff) {
  if (stuff) {
    handleMsgStack(type, stuff);
  }
}

function logError(e) {
  handleError('window onerror', e.error);
}

function unhandledrejection(e) {
  handleError('Uncaught (in promise) ', e.reason);
}

export default function globalErrorHandler() {
  if (!enabled) {
    on(window, 'error', logError);
    on(window, 'unhandledrejection', unhandledrejection);
    enabled = true;
  }
}
