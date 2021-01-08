import add from '../support/task';
import calf from '../support/calf';
import doQuickLinks from './doQuickLinks';
import getUrlParameter from '../system/getUrlParameter';
import globalErrorHandler from '../support/globalErrorHandler';
import { initNow } from '../support/now';
import { initPcc } from '../support/layout';
import isFunction from '../common/isFunction';
import isMessageSound from './isMessageSound';
import isObject from '../common/isObject';
import jsonParse from '../common/jsonParse';
import loadCss from '../common/loadCss';
import lookForHcsData from './lookForHcsData/lookForHcsData';
import pageSwitcher from './pageSwitcher/pageSwitcher';
import querySelector from '../common/querySelector';
import {
  end, screenview, setup, start,
} from '../support/fshGa';

let cmd;
let subcmd;
let subcmd2;
let type = '';
let coreFunction;
let functionPath;

function getParam(param) {
  return getUrlParameter(param) || '-';
}

function newSelector(selector) {
  const testCmd = querySelector(selector);
  return (testCmd && testCmd.value) || '-';
}

function isValid() {
  return isObject(pageSwitcher[cmd])
    && isObject(pageSwitcher[cmd][subcmd])
    && isFunction(pageSwitcher[cmd][subcmd][subcmd2]);
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
  if (cmd === 'points') { type = `/${getParam('type')}`; }
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
  functionPath = `${cmd}/${subcmd}/${subcmd2}${type}`;
  coreFunction = testCoreFunction();
}

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

function asyncDispatcher() {
  // eslint-disable-next-line no-unused-labels, no-labels
  devLbl: { //  asyncDispatcher messages
    devHooks();
  }
  if (isFunction(coreFunction)) {
    screenview(functionPath);
    start('JS Perf', functionPath);
    coreFunction();
    end('JS Perf', functionPath);
  }
}

async function runCore(cssPrm) {
  start('JS Perf', 'FSH.runCore');
  initNow();
  initPcc();
  getCoreFunction();
  await cssPrm;
  lookForHcsData();
  add(3, asyncDispatcher);
  isMessageSound();
  /* This must be at the end in order not to
  screw up other findNode calls (Issue 351) */
  doQuickLinks();
  end('JS Perf', 'FSH.runCore');
}

function badEnv() {
  return !isFunction(Object.fromEntries) || !navigator.cookieEnabled;
}

function setVer(fshVer, gmInfo) {
  calf.gmInfo = jsonParse(decodeURIComponent(gmInfo));
  if (calf.gmInfo) {
    calf.fshVer = fshVer;
  } else {
    calf.fshVer = `${fshVer}_native`;
  }
  calf.calfVer = '_CALFVER';
}

// main event dispatcher
export default function dispatch(fshVer, gmInfo) {
  start('JS Perf', 'FSH.dispatch');
  if (badEnv()) { return; }
  const cssPrm = loadCss('_CSSPATH/calfSystem.css');
  globalErrorHandler();
  setVer(fshVer, gmInfo);
  setup();
  runCore(cssPrm);
  end('JS Perf', 'FSH.dispatch');
}
