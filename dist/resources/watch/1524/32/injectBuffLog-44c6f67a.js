import { x as jQueryNotPresent, A as setInnerHtml, o as onclick, y as getElementById, bm as fshBuffLog, p as pCC } from './calfSystem-e64be67d.js';
import { m as makePageTemplate } from './makePageTemplate-6b013527.js';
import { g as get, s as set } from './idb-1d4ba436.js';

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
//# sourceMappingURL=injectBuffLog-44c6f67a.js.map
