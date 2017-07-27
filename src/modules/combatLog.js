import getForage from './ajax/getForage';
import setForage from './ajax/setForage';
import * as layout from './support/layout';

var content;
var combatLog = [];
var textArea;

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
  layout.confirm('Clear Combat Log',
    'Are you sure you want to clear your log?', clearCombatLog
  );
}

function gotCombatLog(data) {
  if (data) {combatLog = data;}
  var yuuzParser = '<tr><td align="center" colspan="4"><b>Log Parser</b>' +
    '</td></tr>' +
    '<tr><td colspan="4" align="center">WARNING: this links to an ' +
    'external site not related to HCS.<br />' +
    'If you wish to visit site directly URL is: http://evolutions.' +
    'yvong.com/fshlogparser.php<br />' +
    '<tr><td colspan=4 align="center"><input type="hidden" value="true" ' +
    'name="submit"><input type="submit" value="Analyze!"></td></tr>';
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
  textArea = document.getElementById('combatLog');
  document.getElementById('copyLog')
    .addEventListener('click', notepadCopyLog);
  document.getElementById('clearLog')
    .addEventListener('click', notepadClearLog);
}

export default function injectNotepadShowLogs(injector) { // jQuery.min
  content = injector || layout.pCC;
  getForage('fsh_combatLog').done(gotCombatLog);
}
