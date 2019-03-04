import add from '../support/task';
import calf from '../support/calf';
import doQuickLinks from './doQuickLinks';
import getUrlParameter from '../system/getUrlParameter';
import globalErrorHandler from '../support/globalErrorHandler';
import {initNow} from '../support/now';
import {initPcc} from '../support/layout';
import isFunction from '../common/isFunction';
import isMessageSound from './isMessageSound';
import isObject from '../common/isObject';
import lookForHcsData from './lookForHcsData/lookForHcsData';
import pageSwitcher from './pageSwitcher/pageSwitcher';
import querySelector from '../common/querySelector';
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
  var test_cmd = querySelector(selector);
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
  } else if (!isFunction(coreFunction)) {
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

function runCore() {
  initNow();
  initPcc();
  getCoreFunction();
  lookForHcsData();
  add(3, asyncDispatcher);
  isMessageSound();
  /* This must be at the end in order not to
  screw up other findNode calls (Issue 351) */
  doQuickLinks();
}

window.FSH = window.FSH || {};
window.FSH.calf = '$_CALFVER';

// main event dispatcher
window.FSH.dispatch = function dispatch() {
  if (!isFunction(Promise.prototype.finally)) {return;}
  globalErrorHandler();
  setup();
  start('JS Perf', 'FSH.dispatch');
  runCore();
  end('JS Perf', 'FSH.dispatch');
};
