import { w as jQueryNotPresent, z as setInnerHtml, o as onclick, x as getElementById, bG as fshBuffLog, p as pCC } from './calfSystem-f6498976.js';
import { g as get, s as set } from './idb-19d381b0.js';
import { m as makePageTemplate } from './makePageTemplate-343e5e0d.js';

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
//# sourceMappingURL=injectBuffLog-189e6eeb.js.map
