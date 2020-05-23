import { z as jQueryNotPresent, C as setInnerHtml, o as onclick, A as getElementById, ak as get, ai as set, c9 as fshBuffLog, p as pCC } from './calfSystem-cb5d894f.js';
import { m as makePageTemplate } from './makePageTemplate-a697bfdd.js';

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
//# sourceMappingURL=injectBuffLog-7fdbc288.js.map
