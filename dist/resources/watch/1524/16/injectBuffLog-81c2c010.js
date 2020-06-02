import { w as jQueryNotPresent, z as setInnerHtml, o as onclick, x as getElementById, bH as fshBuffLog, p as pCC } from './calfSystem-6e4b53e3.js';
import { g as get, s as set } from './idb-fc617077.js';
import { m as makePageTemplate } from './makePageTemplate-2635e2e4.js';

function displayBuffLog(buffLog) {
  setInnerHtml(buffLog, getElementById('bufflog'));
}

function clearBuffLog() {
  set(fshBuffLog, '').then(displayBuffLog);
}

function injectBuffLog(injector) { // jQuery.min
  if (jQueryNotPresent()) { return; }
  const content = injector || pCC;
  setInnerHtml(makePageTemplate({
    title: 'Buff Log',
    comment: '',
    spanId: 'clearBuffs',
    button: 'Clear',
    divId: 'bufflog',
  }), content);
  onclick(getElementById('clearBuffs'), clearBuffLog);
  get(fshBuffLog).then(displayBuffLog);
}

export default injectBuffLog;
//# sourceMappingURL=injectBuffLog-81c2c010.js.map
