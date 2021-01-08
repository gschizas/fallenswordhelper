import { fshBuffLog } from '../../support/constants';
import getElementById from '../../common/getElement';
import jQueryNotPresent from '../../common/jQueryNotPresent';
import makePageTemplate from '../lists/makePageTemplate';
import onclick from '../../common/onclick';
import { pCC } from '../../support/layout';
import setInnerHtml from '../../dom/setInnerHtml';
import { get, set } from '../../system/idb';

function displayBuffLog(buffLog) {
  setInnerHtml(buffLog, getElementById('bufflog'));
}

function clearBuffLog() {
  set(fshBuffLog, '').then(displayBuffLog);
}

export default function injectBuffLog(injector) { // jQuery.min
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
