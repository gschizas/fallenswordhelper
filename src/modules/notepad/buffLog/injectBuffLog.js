import {fshBuffLog} from '../../support/constants';
import {getElementById} from '../../common/getElement';
import getMigrate from '../../common/getMigrate';
import jQueryNotPresent from '../../common/jQueryNotPresent';
import makePageTemplate from '../lists/makePageTemplate';
import on from '../../common/on';
import {pCC} from '../../support/layout';
import {set} from 'idb-keyval';

function displayBuffLog(buffLog) {
  getElementById('bufflog').innerHTML = buffLog;
}

function clearBuffLog() {
  set(fshBuffLog, '').then(displayBuffLog);
}

export default function injectBuffLog(injector) { // jQuery.min
  if (jQueryNotPresent()) {return;}
  var content = injector || pCC;
  content.innerHTML = makePageTemplate({
    title: 'Buff Log',
    comment: '',
    spanId: 'clearBuffs',
    button: 'Clear',
    divId: 'bufflog'
  });
  on(getElementById('clearBuffs'), 'click', clearBuffLog);
  getMigrate(fshBuffLog).then(displayBuffLog);
}
