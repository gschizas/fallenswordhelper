import anchorButton from './anchorButton';
import getValue from '../../system/getValue';
import insertAfterParent from './insertAfterParent';
import insertHtmlAfterEnd from '../../common/insertHtmlAfterEnd';
import {
  defSubcmd,
  notepadBlankUrl,
  profileUrl,
} from '../../support/constants';
import {
  injectBuffLog,
  injectMonsterLog,
  injectNotepadShowLogs,
  injectQuickLinkManager,
  injectRecipeManager,
} from '../pageSwitcher/loader';

const recipeManagerLink = () => {
  if (getValue('recipeManagerLink')) {
    anchorButton('1', 'Recipe Manager', injectRecipeManager, 'nav-character-log');
  }
};

const inventoryManagerLink = () => {
  if (getValue('inventoryManagerLink')) {
    insertAfterParent('nav-character-log', insertHtmlAfterEnd,
      '<li class="nav-level-1"><a class="nav-link" '
      + `id="nav-character-invmanager" href="${
        notepadBlankUrl}invmanagernew">Inventory Manager</a></li>`);
  }
};

const medalGuideLink = () => {
  if (getValue('medalGuideLink')) {
    insertAfterParent('nav-character-log', insertHtmlAfterEnd,
      '<li class="nav-level-1"><a class="nav-link" id="nav-character-medalguide"'
        + ` href="${profileUrl}${defSubcmd}medalguide">Medal Guide</a></li>`);
  }
};

function buffLogLink() {
  if (getValue('buffLogLink') && getValue('keepBuffLog')) {
    anchorButton('1', 'Buff Log', injectBuffLog, 'nav-character-log');
  }
}

function combatLogLink() {
  if (getValue('combatLogLink') && getValue('keepLogs')) {
    anchorButton('1', 'Combat Logs', injectNotepadShowLogs,
      'nav-character-notepad');
  }
}

function creatureLogLink() {
  if (getValue('creatureLogLink') && getValue('showMonsterLog')) {
    anchorButton('1', 'Creature Logs', injectMonsterLog,
      'nav-character-notepad');
  }
}

function quickLinksLink() {
  if (getValue('quickLinksLink')) {
    anchorButton('1', 'Quick Links', injectQuickLinkManager,
      'nav-character-notepad');
  }
}

export default function characterButtons() {
  recipeManagerLink();
  inventoryManagerLink();
  medalGuideLink();
  buffLogLink();
  combatLogLink();
  creatureLogLink();
  quickLinksLink();
}
