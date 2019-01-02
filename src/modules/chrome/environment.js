import add from '../support/task';
import calf from '../support/calf';
import doQuickLinks from './doQuickLinks';
import fallback from '../system/fallback';
import getUrlParameter from '../system/getUrlParameter';
import isFunction from '../common/isFunction';
import isMessageSound from './isMessageSound';
import isObject from '../common/isObject';
import jQueryNotPresent from '../common/jQueryNotPresent';
import lookForHcsData from './lookForHcsData/lookForHcsData';
import pageSwitcher from './pageSwitcher';
import {end, screenview, setup, start} from '../support/fshGa';

var cmd;
var subcmd;
var subcmd2;
var type;
var fromWorld;
var coreFunction;
var functionPath;

function getType(_cmd) {
  var _type = '-';
  if (_cmd === 'points') {
    _type = getUrlParameter('type') || '-';
  }
  return _type;
}

function newSelector(selector) {
  var test_cmd = document.querySelector(selector);
  return test_cmd && test_cmd.value || '-';
}

var isValid = [
  function() {return pageSwitcher[cmd];},
  function() {return pageSwitcher[cmd][subcmd];},
  function() {return pageSwitcher[cmd][subcmd][subcmd2];},
  function() {return pageSwitcher[cmd][subcmd][subcmd2][type];}
];

function returnsObject(e) {return isObject(e());}

function testCoreFunction() {
  if (isValid.every(returnsObject) &&
      pageSwitcher[cmd][subcmd][subcmd2][type][fromWorld]) {
    return pageSwitcher[cmd][subcmd][subcmd2][type][fromWorld];
  }
}

function getParamsFromUrl() {
  cmd = fallback(getUrlParameter('cmd'), '-');
  subcmd = fallback(getUrlParameter('subcmd'), '-');
  subcmd2 = fallback(getUrlParameter('subcmd2'), '-');
  type = getType(cmd);
  fromWorld = fallback(getUrlParameter('fromworld'), '-');
}

function getParamsFromPage() {
  cmd = newSelector('input[name="cmd"]');
  subcmd = newSelector('input[name="subcmd"]');
  subcmd2 = newSelector('input[name="subcmd2"]');
  type = '-';
  fromWorld = '-';
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
  functionPath = cmd + '/' + subcmd + '/' + subcmd2 + '/' + type + '/' +
    fromWorld;
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
