import { w as jQueryNotPresent, z as setInnerHtml, o as onclick, x as getElementById, bH as fshBuffLog, p as pCC } from './calfSystem-940bc1b5.js';
import { g as get, s as set } from './idb-9fdca27d.js';
import { m as makePageTemplate } from './makePageTemplate-380cff0c.js';

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
//# sourceMappingURL=injectBuffLog-8f8f9cce.js.map
