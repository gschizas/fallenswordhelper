import * as ajax from '../support/ajax';
import * as layout from '../support/layout';

function displayBuffLog(buffLog) { // Native
  document.getElementById('bufflog').innerHTML = buffLog;
}

function clearBuffLog() { // Native
  ajax.setForage('fsh_buffLog', '').done(displayBuffLog);
}

export default function injectBuffLog(injector) { // Native
  var content = injector || layout.pCC;
  content.innerHTML = layout.makePageTemplate('Buff Log', '',
    'clearBuffs', 'Clear', 'bufflog');
  document.getElementById('clearBuffs').addEventListener('click', clearBuffLog);
  ajax.getForage('fsh_buffLog').done(displayBuffLog);
}
