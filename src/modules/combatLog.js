import * as ajax from './support/ajax';
import * as layout from './support/layout';

var content;
var combatLog = [];
var textArea;

function notepadCopyLog() { // Native
  textArea.focus();
  textArea.select();
}

function notepadClearLog() { // Legacy
  if (window.confirm('Are you sure you want to clear your log?')) {
    combatLog = [];
    textArea.value = '[]';
    ajax.setForage('fsh_combatLog', combatLog);
  }
}

function gotCombatLog(data) { // Native
  if (data) {combatLog = data;}
  var yuuzParser = '<tr><td align="center" colspan="4"><b>Log Parser</b>' +
    '</td></tr>'+
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
    '<br /><br /><table width="100%"><tr>'+
    '<td colspan="2" align=center>' +
    '<input type="button" class="custombutton" value="Select All" ' +
    'id="copyLog"></td>' +
    '<td colspan="2" align=center>' +
    '<input type="button" class="custombutton" value="Clear" ' +
    'id="clearLog"></td>' +
    '</tr>' + yuuzParser + '</table></div>'+
    '</form>';
  textArea = document.getElementById('combatLog');
  document.getElementById('copyLog')
    .addEventListener('click', notepadCopyLog);
  document.getElementById('clearLog')
    .addEventListener('click', notepadClearLog);
}

export function injectNotepadShowLogs(injector) { // jQuery.min
  if (injector) {content = injector;}
  else {content = layout.pCC;}
  ajax.getForage('fsh_combatLog').done(gotCombatLog);
}
