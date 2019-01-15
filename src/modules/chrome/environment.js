import add from '../support/task';
import calf from '../support/calf';
import doQuickLinks from './doQuickLinks';
import getUrlParameter from '../system/getUrlParameter';
import isFunction from '../common/isFunction';
import isMessageSound from './isMessageSound';
import isObject from '../common/isObject';
import jQueryNotPresent from '../common/jQueryNotPresent';
import lookForHcsData from './lookForHcsData/lookForHcsData';
import pageSwitcher from './pageSwitcher/pageSwitcher';
import {end, screenview, setup, start} from '../support/fshGa';

var cmd;
var subcmd;
var subcmd2;
var type = '';
var coreFunction;
var functionPath;

function getParam(param) {
  return getUrlParameter(param) || '-';
}

function newSelector(selector) {
  var test_cmd = document.querySelector(selector);
  return test_cmd && test_cmd.value || '-';
}

function isValid() {
  return isObject(pageSwitcher[cmd]) &&
    isObject(pageSwitcher[cmd][subcmd]) &&
    isFunction(pageSwitcher[cmd][subcmd][subcmd2]);
}

function testCoreFunction() {
  if (isValid()) {
    return pageSwitcher[cmd][subcmd][subcmd2];
  }
}

function getParamsFromUrl() {
  cmd = getParam('cmd');
  subcmd = getParam('subcmd');
  subcmd2 = getParam('subcmd2');
  if (cmd === 'points') {type = '/' + getParam('type');}
}

function getParamsFromPage() {
  cmd = newSelector('input[name="cmd"]');
  subcmd = newSelector('input[name="subcmd"]');
  subcmd2 = newSelector('input[name="subcmd2"]');
}

function setCalfParams() {
  calf.cmd = cmd;
  calf.subcmd = subcmd;
  calf.subcmd2 = subcmd2;
}

function getCoreFunction() {
  if (document.location.search !== '') {
    getParamsFromUrl();
  } else {
    getParamsFromPage();
  }
  setCalfParams();
  functionPath = cmd + '/' + subcmd + '/' + subcmd2 + type;
  coreFunction = testCoreFunction();
}

//#if _DEV  //  asyncDispatcher messages
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

//#endif
function asyncDispatcher() {
  //#if _DEV  //  asyncDispatcher messages
  devHooks();
  //#endif
  if (isFunction(coreFunction)) {
    screenview(functionPath);
    start('JS Perf', functionPath);
    coreFunction();
    end('JS Perf', functionPath);
  }
}

window.FSH = window.FSH || {};
window.FSH.calf = '$_CALFVER';

// main event dispatcher
window.FSH.dispatch = function dispatch() {

  setup();
  start('JS Perf', 'FSH.dispatch');

  getCoreFunction();
  lookForHcsData();
  add(3, asyncDispatcher);

  if (jQueryNotPresent()) {return;}

  isMessageSound();

  /* This must be at the end in order not to
  screw up other findNode calls (Issue 351) */
  doQuickLinks();

  end('JS Perf', 'FSH.dispatch');

};
