import { x as jQueryNotPresent, A as setInnerHtml, o as onclick, y as getElementById, by as fshBuffLog, p as pCC } from './calfSystem-b31646eb.js';
import { g as get, s as set } from './idb-5f2321bd.js';
import { m as makePageTemplate } from './makePageTemplate-fda92a71.js';

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
//# sourceMappingURL=injectBuffLog-6edf27f6.js.map
