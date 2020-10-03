import { x as jQueryNotPresent, A as setInnerHtml, o as onclick, y as getElementById, bz as fshBuffLog, p as pCC } from './calfSystem-c851a12c.js';
import { g as get, s as set } from './idb-6207cbac.js';
import { m as makePageTemplate } from './makePageTemplate-b2d7256d.js';

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
//# sourceMappingURL=injectBuffLog-1abaec8f.js.map
