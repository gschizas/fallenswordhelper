import { fshBuffLog } from '../../support/constants';
import { getElementById } from '../../common/getElement';
import jQueryNotPresent from '../../common/jQueryNotPresent';
import makePageTemplate from '../lists/makePageTemplate';
import onclick from '../../common/onclick';
import { pCC } from '../../support/layout';
import { get, set } from '../../system/idb';

function displayBuffLog(buffLog) {
  getElementById('bufflog').innerHTML = buffLog;
}

function clearBuffLog() {
  set(fshBuffLog, '').then(displayBuffLog);
}

export default function injectBuffLog(injector) { // jQuery.min
  if (jQueryNotPresent()) { return; }
  const content = injector || pCC;
  content.innerHTML = makePageTemplate({
    title: 'Buff Log',
    comment: '',
    spanId: 'clearBuffs',
    button: 'Clear',
    divId: 'bufflog',
  });
  onclick(getElementById('clearBuffs'), clearBuffLog);
  get(fshBuffLog).then(displayBuffLog);
}
