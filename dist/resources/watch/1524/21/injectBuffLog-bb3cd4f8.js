import { x as jQueryNotPresent, A as setInnerHtml, o as onclick, y as getElementById, bB as fshBuffLog, p as pCC } from './calfSystem-b0234231.js';
import { g as get, s as set } from './idb-0eb46835.js';
import { m as makePageTemplate } from './makePageTemplate-7365eee4.js';

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
//# sourceMappingURL=injectBuffLog-bb3cd4f8.js.map
