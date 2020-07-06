import { x as jQueryNotPresent, A as setInnerHtml, o as onclick, y as getElementById, bB as fshBuffLog, p as pCC } from './calfSystem-2b1fed3f.js';
import { g as get, s as set } from './idb-549f3966.js';
import { m as makePageTemplate } from './makePageTemplate-0213cbbc.js';

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
//# sourceMappingURL=injectBuffLog-dc3a8532.js.map
