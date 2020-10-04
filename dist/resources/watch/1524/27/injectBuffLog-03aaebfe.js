import { x as jQueryNotPresent, A as setInnerHtml, o as onclick, y as getElementById, bz as fshBuffLog, p as pCC } from './calfSystem-975d976a.js';
import { g as get, s as set } from './idb-9c55d032.js';
import { m as makePageTemplate } from './makePageTemplate-59688253.js';

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
//# sourceMappingURL=injectBuffLog-03aaebfe.js.map
