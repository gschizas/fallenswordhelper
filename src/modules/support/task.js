import fallback from '../system/fallback';
import {sendException} from './fshGa';
import {getLength, pop, push} from './sch';

var paused = true;
var message = 'fshMessage';

function taskRunner() {
  if (getLength() === 0) {
    paused = true;
  } else {
    paused = false;
    window.postMessage(message, '*');
  }
}

function devLog(args) {
  if (args && !Array.isArray(args)) {
    // eslint-disable-next-line no-console
    console.log('addTask Array.isArray(args)', Array.isArray(args));
  }
}

export default function add(priority, fn, args, scope) {
  //#if _DEV  //  Not sending args as Array
  devLog(args);
  //#endif
  if (typeof fn === 'function') {
    var _scope = fallback(scope, window);
    var _args = fallback(args, []);
    push(fn.bind.apply(fn, [_scope].concat(_args)), priority);
    if (paused) {taskRunner();}
  }
}

function parseStack(e) {
  var concatStack = e.stack.replace(/\n +/g, '|');
  if (e.stack.includes(e.message)) {
    return concatStack;
  }
  return e.message + '|' + concatStack;
}

function parseError(e) {
  if (e.stack) {return parseStack(e);}
  return e.message;
}

function asyncTask() {
  try {
    pop()();
  } catch (e) {
    sendException(parseError(e), false);
  } finally {
    taskRunner();
  }
}

function callback(event) {
  var key = event.data;
  if (typeof key === 'string' && key.indexOf(message) === 0) {
    asyncTask();
  }
}

window.addEventListener('message', callback);
