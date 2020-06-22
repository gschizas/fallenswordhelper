import { x as jQueryNotPresent, A as setInnerHtml, o as onclick, y as getElementById, bB as fshBuffLog, p as pCC } from './calfSystem-995e3482.js';
import { g as get, s as set } from './idb-ece4ba5b.js';
import { m as makePageTemplate } from './makePageTemplate-e390d524.js';

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
//# sourceMappingURL=injectBuffLog-8f3c88dc.js.map
