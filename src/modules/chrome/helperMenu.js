import {createDiv} from '../common/cElement';
import draggable from '../common/dragStart';
import {getElementById} from '../common/getElement';
import getValue from '../system/getValue';
import {imageServer} from '../system/system';
import injectBuffLog from '../buffLog/injectBuffLog';
import {injectFsBoxContent} from '../misc';
import injectMonsterLog from '../monstorLog';
import injectNotepadShowLogs from '../combatLog';
import injectOnlinePlayers from '../onlinePlayers';
import injectRecipeManager from '../recipeMgr/recipeMgr';
import insertElement from '../common/insertElement';
import insertHtmlBeforeEnd from '../common/insertHtmlBeforeEnd';
import insertQuickExtract from '../quickExtract';
import insertQuickWear from '../quickWear/quickWear';
import isFunction from '../common/isFunction';
import jQueryDialog from './jQueryDialog';
import jQueryPresent from '../common/jQueryPresent';
import {sendEvent} from '../support/fshGa';
import {injectAuctionSearch, injectQuickLinkManager} from '../lists/lists';
import {injectFindBuffs, injectFindOther} from '../findBuffs/findBuffs';

var helperMenuBlob =
  '<div class="column"><h3>Character</h3><ul>' +
  '<li><span class="fshLink">Buff Log</span></li>' +
  '<li><span class="fshLink">Combat Log</span></li>' +
  '<li><span class="fshLink">Creature Log</span></li>' +
  '<li><span class="fshLink">Recipe Manager</span></li>' +
  '<li><span class="fshLink">Quick Links</span></li>' +
  '</ul><h3>Actions</h3><ul>' +
  '<li><span class="fshLink">Find Buffs</span></li>' +
  '<li><span class="fshLink">Find Other</span></li>' +
  '<li><span class="fshLink">Online Players</span></li>' +
  '<li><span class="fshLink">AH Quick Search</span></li>' +
  '</ul><h3>Extra</h3><ul>' +
  '<li><span class="fshLink">Quick Extract</span></li>' +
  '<li><span class="fshLink">Quick Wear</span></li>' +
  '<li><span class="fshLink">FS Box Log</span></li>' +
  '</ul><h3>FSH developer quick links</h3><ul>' +
  '<li><span class="a-reply" target_player="PointyHair">PM</span> ' +
  '<a href="index.php?cmd=profile&player_id=1963510">PointyHair</a></li>' +
  '<li><span class="a-reply" target_player="yuuzhan">PM</span> ' +
  '<a href="index.php?cmd=profile&player_id=1599987">yuuzhan</a></li>' +
  '</ul></div>';

var functionLookup = {
  'Buff Log': injectBuffLog,
  'Combat Log': injectNotepadShowLogs,
  'Creature Log': injectMonsterLog,
  'Recipe Manager': injectRecipeManager,
  'Quick Links': injectQuickLinkManager,
  'Find Buffs': injectFindBuffs,
  'Find Other': injectFindOther,
  'Online Players': injectOnlinePlayers,
  'AH Quick Search': injectAuctionSearch,
  'Quick Extract': insertQuickExtract,
  'Quick Wear': insertQuickWear,
  'FS Box Log': injectFsBoxContent
};

function callHelperFunction(evt) {
  var functionPath = evt.target.textContent;
  var fn = functionLookup[functionPath];
  if (jQueryPresent() && isFunction(fn)) {
    sendEvent('helperMenu', functionPath);
    jQueryDialog(fn);
  }
}

function eventHandler(evt) {
  if (evt.target.classList.contains('fshLink')) {
    callHelperFunction(evt);
    return;
  }
  if (evt.target.classList.contains('a-reply')) {
    window.openQuickMsgDialog(evt.target.getAttribute('target_player'));
  }
}

function showHelperMenu() {
  var helperMenu = getElementById('helperMenu');
  helperMenu.removeEventListener('mouseenter', showHelperMenu);

  var helperMenuDiv = createDiv({
    id: 'helperMenuDiv',
    className: 'helperMenuDiv',
    style: {
      backgroundImage: 'url(' + imageServer +
        '/skin/inner_bg.jpg)'
    }
  });
  insertHtmlBeforeEnd(helperMenuDiv, helperMenuBlob);
  insertElement(helperMenu, helperMenuDiv);
  helperMenu.addEventListener('click', function(evt) {
    if (evt.target.id !== 'helperMenu') {return;}
    var menu = evt.target.firstElementChild;
    menu.classList.toggle('showMenuDiv');
  });
  helperMenuDiv.addEventListener('click', eventHandler);
}

function haveNode(node) {
  var helperMenu = createDiv({
    id: 'helperMenu',
    className: 'helperMenu',
    innerHTML: 'Helper&nbsp;Menu'
  });
  if (getValue('keepHelperMenuOnScreen')) {
    helperMenu.classList.add('fshFixed');
  }
  helperMenu.addEventListener('mouseenter', showHelperMenu);
  if (getValue('draggableHelperMenu')) {
    helperMenu.classList.add('fshMove');
    draggable(helperMenu);
  }
  node.parentNode.insertBefore(helperMenu, node);
}

export default function injectHelperMenu() {
  // don't put all the menu code here (but call if clicked) to minimize lag
  var node = getElementById('statbar-container');
  if (node) {haveNode(node);}
}
