import {getElementById} from '../common/getElement';
import getForage from '../ajax/getForage';
import jQueryNotPresent from '../common/jQueryNotPresent';
import makePageTemplate from './lists/makePageTemplate';
import on from '../common/on';
import {pCC} from '../support/layout';
import setForage from '../ajax/setForage';

function inject(fsboxcontent) {
  getElementById('fsboxdetail').innerHTML = fsboxcontent;
}

function clearFsBox() {
  setForage('fsh_fsboxcontent', '');
  location.reload();
}

export default function injectFsBoxContent(injector) { // jQuery.min
  if (jQueryNotPresent()) {return;}
  var content = injector || pCC;
  content.innerHTML = makePageTemplate({
    title: 'FS Box Log',
    comment: '',
    spanId: 'fsboxclear',
    button: 'Clear',
    divId: 'fsboxdetail'
  });
  getForage('fsh_fsboxcontent').done(inject);
  on(getElementById('fsboxclear'), 'click', clearFsBox, true);
}
