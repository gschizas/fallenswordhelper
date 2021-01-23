import { x as jQueryNotPresent, A as setInnerHtml, o as onclick, y as getElementById, bl as fshBuffLog, p as pCC } from './calfSystem-91adbec8.js';
import { m as makePageTemplate } from './makePageTemplate-47342323.js';
import { g as get, s as set } from './idb-321c4955.js';

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
//# sourceMappingURL=injectBuffLog-5f9db321.js.map
