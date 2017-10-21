import add from '../support/task';
import calf from '../support/calf';
import doQuickLinks from './doQuickLinks';
import isMessageSound from './isMessageSound';
import lookForHcsData from './lookForHcsData';
import pageSwitcher from './pageSwitcher';
import {end, screenview, setup, start} from '../support/fshGa';
import {fallback, getUrlParameter} from '../support/system';

var coreFunction;
var functionPath;

function getType(cmd) {
  var type = '-';
  if (cmd === 'points') {
    type = fallback(getUrlParameter('type'), '-');
  }
  return type;
}

function newSelector(selector) {
  var test_cmd = document.querySelector(selector);
  return test_cmd && test_cmd.value || '-';
}

function testCoreFunction(cmd, subcmd, subcmd2, type, fromWorld) {
  if (pageSwitcher[cmd] &&
      pageSwitcher[cmd][subcmd] &&
      pageSwitcher[cmd][subcmd][subcmd2] &&
      pageSwitcher[cmd][subcmd][subcmd2][type] &&
      pageSwitcher[cmd][subcmd][subcmd2][type][fromWorld]) {
    return pageSwitcher[cmd][subcmd][subcmd2][type][fromWorld];
  }
}

function getCoreFunction() {
  var cmd;
  var subcmd;
  var subcmd2;
  var type;
  var fromWorld;
  if (document.location.search !== '') {
    cmd = fallback(getUrlParameter('cmd'), '-');
    subcmd = fallback(getUrlParameter('subcmd'), '-');
    subcmd2 = fallback(getUrlParameter('subcmd2'), '-');
    type = getType(cmd);
    fromWorld = fallback(getUrlParameter('fromworld'), '-');
  } else {
    cmd = newSelector('input[name="cmd"]');
    subcmd = newSelector('input[name="subcmd"]');
    if (subcmd === 'dochat') {
      cmd = '-';
      subcmd = '-';
    }
    subcmd2 = newSelector('input[name="subcmd2"]');
    type = '-';
    fromWorld = '-';
  }
  calf.cmd = cmd;
  calf.subcmd = subcmd;
  calf.subcmd2 = subcmd2;
  functionPath = cmd + '/' + subcmd + '/' + subcmd2 + '/' + type + '/' +
    fromWorld;

  coreFunction = testCoreFunction(cmd, subcmd, subcmd2, type, fromWorld);
}

function devHooks() {
  /* eslint-disable no-console */
  console.log('functionPath', functionPath);
  if (!coreFunction) {
    console.log('No Core Function.');
  } else if (typeof coreFunction !== 'function') {
    console.log('Not Core Function.');
  }
  /* eslint-enable no-console */
}

function asyncDispatcher() {
  //#if _DEV  //  asyncDispatcher messages
  devHooks();
  //#endif
  if (typeof coreFunction === 'function') {
    screenview(functionPath);
    start('JS Perf', functionPath);
    coreFunction();
    end('JS Perf', functionPath);
  }
}

// main event dispatcher
FSH.dispatch = function dispatch() {

  setup();
  start('JS Perf', 'FSH.dispatch');

  getCoreFunction();
  lookForHcsData();
  add(3, asyncDispatcher);

  if (typeof window.jQuery === 'undefined') {return;}

  isMessageSound();

  /* This must be at the end in order not to
  screw up other findNode calls (Issue 351) */
  doQuickLinks();

  end('JS Perf', 'FSH.dispatch');

};
