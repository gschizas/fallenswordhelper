import anchorButton from './anchorButton';
import getValue from '../../system/getValue';
import injectBuffLog from '../../notepad/buffLog/injectBuffLog';
import injectMonsterLog from '../../notepad/monstorLog/monstorLog';
import injectNotepadShowLogs from '../../notepad/combatLog';
import {injectQuickLinkManager} from '../../notepad/lists/lists';
import injectRecipeManager from '../../notepad/recipeMgr/recipeMgr';
import insertAfterParent from './insertAfterParent';
import insertHtmlAfterEnd from '../../common/insertHtmlAfterEnd';
import {
  def_subcmd,
  notepadBlankUrl,
  profileUrl
} from '../../support/constants';

function buffLogLink() {
  if (getValue('keepBuffLog')) {
    anchorButton('1', 'Buff Log', injectBuffLog, 'nav-character-log');
  }
}

function combatLogLink() {
  if (getValue('keepLogs')) {
    anchorButton('1', 'Combat Logs', injectNotepadShowLogs,
      'nav-character-notepad');
  }
}

function creatureLogLink() {
  if (getValue('showMonsterLog')) {
    anchorButton('1', 'Creature Logs', injectMonsterLog,
      'nav-character-notepad');
  }
}

export default function characterButtons() {
  anchorButton('1', 'Recipe Manager', injectRecipeManager, 'nav-character-log');
  insertAfterParent('nav-character-log', insertHtmlAfterEnd,
    '<li class="nav-level-1"><a class="nav-link" id="nav-' +
    'character-medalguide" href="' + profileUrl + def_subcmd +
    'medalguide">Medal Guide</a></li>' +
    '<li class="nav-level-1"><a class="nav-link" id="nav-' +
    'character-invmanager" href="' + notepadBlankUrl +
    'invmanagernew">Inventory Manager</a></li>');
  buffLogLink();
  combatLogLink();
  creatureLogLink();
  anchorButton('1', 'Quick Links', injectQuickLinkManager,
    'nav-character-notepad');
}
