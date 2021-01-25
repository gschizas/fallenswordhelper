import { x as jQueryNotPresent, A as setInnerHtml, o as onclick, y as getElementById, p as pCC } from './calfSystem-e64be67d.js';
import { m as makePageTemplate } from './makePageTemplate-6b013527.js';
import { g as get, s as set } from './idb-1d4ba436.js';

function inject(fsboxcontent) {
  setInnerHtml(fsboxcontent, getElementById('fsboxdetail'));
}

function clearFsBox() {
  set('fsh_fsboxcontent', '');
  window.location.reload();
}

function injectFsBoxContent(injector) { // jQuery.min
  if (jQueryNotPresent()) { return; }
  const content = injector || pCC;
  setInnerHtml(makePageTemplate({
    title: 'FS Box Log',
    comment: '',
    spanId: 'fsboxclear',
    button: 'Clear',
    divId: 'fsboxdetail',
  }), content);
  get('fsh_fsboxcontent').then(inject);
  onclick(getElementById('fsboxclear'), clearFsBox, true);
}

export default injectFsBoxContent;
//# sourceMappingURL=injectFsBoxContent-e6be5cf8.js.map
