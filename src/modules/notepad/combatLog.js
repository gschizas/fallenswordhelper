import {getElementById} from '../common/getElement';
import getForage from '../ajax/getForage';
import jConfirm from '../common/jConfirm';
import jQueryNotPresent from '../common/jQueryNotPresent';
import on from '../common/on';
import {pCC} from '../support/layout';
import setForage from '../ajax/setForage';

var content;
var combatLog = [];
var textArea;
var yuuzParser = '<tr><td align="center" colspan="4"><b>Log Parser</b>' +
  '</td></tr>' +
  '<tr><td colspan="4" align="center">WARNING: this links to an ' +
  'external site not related to HCS.<br />' +
  'If you wish to visit site directly URL is: http://evolutions.' +
  'yvong.com/fshlogparser.php<br />' +
  '<tr><td colspan=4 align="center"><input type="hidden" value="true" ' +
  'name="submit"><input type="submit" value="Analyze!"></td></tr>';

function notepadCopyLog() {
  textArea.focus();
  textArea.select();
}

function clearCombatLog() {
  combatLog = [];
  textArea.value = '[]';
  setForage('fsh_combatLog', combatLog);
}

function notepadClearLog() { // jQuery
  jConfirm('Clear Combat Log',
    'Are you sure you want to clear your log?', clearCombatLog
  );
}

function gotCombatLog(data) {
  if (data) {combatLog = data;}
  content.innerHTML = '<h1>Combat Logs</h1><br /><form action="http://' +
    'evolutions.yvong.com/fshlogparser.php" method="post" target="_blank">' +
    '<div align="center"><textarea align="center" cols="80" rows="25" ' +
    'readonly style="background-color:white;font-family:Consolas,\'' +
    'Lucida Console\',\'Courier New\',monospace;" id="combatLog" ' +
    'name="logs">' + JSON.stringify(combatLog) + '</textarea></div>' +
    '<br /><br /><table width="100%"><tr>' +
    '<td colspan="2" align=center>' +
    '<input type="button" class="custombutton" value="Select All" ' +
    'id="copyLog"></td>' +
    '<td colspan="2" align=center>' +
    '<input type="button" class="custombutton" value="Clear" ' +
    'id="clearLog"></td>' +
    '</tr>' + yuuzParser + '</table></div>' +
    '</form>';
  textArea = getElementById('combatLog');
  on(getElementById('copyLog'), 'click', notepadCopyLog);
  on(getElementById('clearLog'), 'click', notepadClearLog);
}

export default function injectNotepadShowLogs(injector) { // jQuery.min
  if (jQueryNotPresent()) {return;}
  content = injector || pCC;
  getForage('fsh_combatLog').done(gotCombatLog);
}
