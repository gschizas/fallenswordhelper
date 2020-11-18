import { x as jQueryNotPresent, A as setInnerHtml, o as onclick, y as getElementById, p as pCC } from './calfSystem-b31646eb.js';
import { g as get, s as set } from './idb-5f2321bd.js';
import { m as makePageTemplate } from './makePageTemplate-fda92a71.js';

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
//# sourceMappingURL=injectFsBoxContent-7185ee19.js.map
