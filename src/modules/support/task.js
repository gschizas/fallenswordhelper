import * as debug from './debug';
import * as sch from './sch';

var paused = true;
var message = 'fshMessage';

function taskRunner() {
  if (sch.getLength() === 0) {
    paused = true;
  } else {
    paused = false;
    window.postMessage(message, '*');
  }
}

export function add(priority, fn, args, scope) {
  //#if _DEV  //  Not sending args as Array
  if (args && !Array.isArray(args)) {
    // eslint-disable-next-line no-console
    console.log('addTask Array.isArray(args)', Array.isArray(args));
  }
  //#endif
  if (typeof fn === 'function') {
    var _scope = scope || window;
    var _args = args || [];
    sch.push(fn.bind.apply(fn, [_scope].concat(_args)), priority);
    if (paused) {taskRunner();}
  }
}

function asyncTask() {
  try {
    sch.pop()();
  } catch (error) {
    debug.log('Unhandled Exception:', error);
    //#if _DEV  //  Unhandled Exception
    // eslint-disable-next-line no-console
    console.log('Unhandled Exception:', error);
    //#endif
  }
  taskRunner();
}

function callback(event) {
  var key = event.data;
  if (typeof key === 'string' && key.indexOf(message) === 0) {
    asyncTask();
  }
}

window.addEventListener('message', callback);
