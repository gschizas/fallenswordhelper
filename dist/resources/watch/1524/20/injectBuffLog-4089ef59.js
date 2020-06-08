import { x as jQueryNotPresent, A as setInnerHtml, o as onclick, y as getElementById, bA as fshBuffLog, p as pCC } from './calfSystem-c0288c6c.js';
import { g as get, s as set } from './idb-247b069e.js';
import { m as makePageTemplate } from './makePageTemplate-48a0f75d.js';

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
//# sourceMappingURL=injectBuffLog-4089ef59.js.map
