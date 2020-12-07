import { x as jQueryNotPresent, A as setInnerHtml, o as onclick, y as getElementById, by as fshBuffLog, p as pCC } from './calfSystem-d357ca6f.js';
import { g as get, s as set } from './idb-255a2314.js';
import { m as makePageTemplate } from './makePageTemplate-1a351a2d.js';

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
//# sourceMappingURL=injectBuffLog-477e9dea.js.map
