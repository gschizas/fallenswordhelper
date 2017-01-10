import system from './support/system';
import layout from './support/layout';

function notepadCopyLog() { // Native
  var combatLog = document.getElementById('Helper:CombatLog');
  combatLog.focus();
  combatLog.select();
}

function notepadClearLog() { // Legacy
  if (window.confirm('Are you sure you want to clear your log?')) {
    system.setValue('CombatLog', '');
    location.reload();
  }
}

function injectNotepadShowLogs(content) { // Legacy
  if (!content) {content = layout.notebookContent();}
  var combatLog = system.getValue('CombatLog');
  if (combatLog.indexOf(',') === 0) {
    //combat logs start with a ,
    combatLog = combatLog.substr(1);
    system.setValue('CombatLog', combatLog);
  }

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
    'Lucida Console\',\'Courier New\',monospace;" id="Helper:CombatLog" ' +
    'name="logs">[' + combatLog + ']</textarea></div>' +
    '<br /><br /><table width="100%"><tr>'+
    '<td colspan="2" align=center>' +
    '<input type="button" class="custombutton" value="Select All" ' +
    'id="Helper:CopyLog"></td>' +
    '<td colspan="2" align=center>' +
    '<input type="button" class="custombutton" value="Clear" ' +
    'id="Helper:ClearLog"></td>' +
    '</tr>' + yuuzParser + '</table></div>'+
    '</form>';

  document.getElementById('Helper:CopyLog')
    .addEventListener('click', notepadCopyLog);
  document.getElementById('Helper:ClearLog')
    .addEventListener('click', notepadClearLog);
}

function scrollUpCombatLog() { // Legacy
  var reportLog = system.findNode('//div[@id="reportsLog"]');
  reportLog.scrollTop-=10;
}

function scrollDownCombatLog() { // Legacy
  var reportLog = system.findNode('//div[@id="reportsLog"]');
  reportLog.scrollTop+=10;
}

export default {
  injectNotepadShowLogs: injectNotepadShowLogs,
  scrollUpCombatLog: scrollUpCombatLog,
  scrollDownCombatLog: scrollDownCombatLog,
};
