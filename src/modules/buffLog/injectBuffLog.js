import getForage from '../ajax/getForage';
import setForage from '../ajax/setForage';
import {makePageTemplate, pCC} from '../support/layout';

function displayBuffLog(buffLog) {
  document.getElementById('bufflog').innerHTML = buffLog;
}

function clearBuffLog() {
  setForage('fsh_buffLog', '').done(displayBuffLog);
}

export default function injectBuffLog(injector) {
  var content = injector || pCC;
  content.innerHTML = makePageTemplate('Buff Log', '',
    'clearBuffs', 'Clear', 'bufflog');
  document.getElementById('clearBuffs').addEventListener('click', clearBuffLog);
  getForage('fsh_buffLog').done(displayBuffLog);
}
