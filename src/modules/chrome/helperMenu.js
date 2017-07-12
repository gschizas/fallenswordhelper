import injectNotepadShowLogs from '../combatLog';
import injectOnlinePlayers from '../onlinePlayers';
import injectRecipeManager from '../recipeMgr/recipeMgr';
import insertQuickExtract from '../quickExtract';
import insertQuickWear from '../quickWear';
import * as common from '../common/common';
import * as findBuffs from '../findBuffs';
import * as fshGa from '../support/fshGa';
import * as lists from '../lists';
import * as misc from '../misc';
import * as quickBuff from '../quickBuff';
import * as system from '../support/system';

var helperMenuBlob =
  '<div class="column"><h3>Character</h3><ul>' +
  '<li><span class="fshLink">Buff Log</span></li>' +
  '<li><span class="fshLink">Combat Log</span></li>' +
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
  'Buff Log': quickBuff.injectBuffLog,
  'Combat Log': injectNotepadShowLogs,
  'Recipe Manager': injectRecipeManager,
  'Quick Links': lists.injectQuickLinkManager,
  'Find Buffs': findBuffs.injectFindBuffs,
  'Find Other': findBuffs.injectFindOther,
  'Online Players': injectOnlinePlayers,
  'AH Quick Search': lists.injectAuctionSearch,
  'Quick Extract': insertQuickExtract,
  'Quick Wear': insertQuickWear,
  'FS Box Log': misc.injectFsBoxContent
};

function callHelperFunction(evt) { // jQuery
  var content = document.getElementById('content');
  if (content) {content.innerHTML = '';} else {
    content = document.createElement('DIV');
    content.id = 'content';
    content.style.display = 'none';
    document.body.appendChild(content);
  }
  var functionPath = evt.target.textContent;
  var fn = functionLookup[functionPath];
  if (typeof fn === 'function') {
    fshGa.screenview(functionPath);
    fn(content);
  }
  $(content).dialog({width: 'auto', modal: true});
}

function eventHandler(evt) { // Native
  if (evt.target.classList.contains('fshLink')) {
    callHelperFunction(evt);
    return;
  }
  if (evt.target.classList.contains('a-reply')) {
    window.openQuickMsgDialog(evt.target.getAttribute('target_player'));
  }
}

function showHelperMenu() { // Native
  var helperMenu = document.getElementById('helperMenu');
  helperMenu.removeEventListener('mouseenter', showHelperMenu);

  var helperMenuDiv = document.createElement('DIV');
  helperMenuDiv.id = 'helperMenuDiv';
  helperMenuDiv.className = 'helperMenuDiv';
  helperMenuDiv.style.backgroundImage = 'url(' + system.imageServer +
    '/skin/inner_bg.jpg)';
  helperMenuDiv.insertAdjacentHTML('beforeend', helperMenuBlob);
  helperMenu.appendChild(helperMenuDiv);
  helperMenu.addEventListener('click', function(evt) {
    if (evt.target.id !== 'helperMenu') {return;}
    var menu = evt.target.firstElementChild;
    menu.classList.toggle('showMenuDiv');
  });
  helperMenuDiv.addEventListener('click', eventHandler);
}

function haveNode(node) { // Native
  var helperMenu = document.createElement('DIV');
  helperMenu.id = 'helperMenu';
  helperMenu.className = 'helperMenu';
  if (system.getValue('keepHelperMenuOnScreen')) {
    helperMenu.classList.add('fshFixed');
  }
  helperMenu.innerHTML = 'Helper&nbsp;Menu';
  helperMenu.addEventListener('mouseenter', showHelperMenu);
  if (system.getValue('draggableHelperMenu')) {
    helperMenu.setAttribute('draggable', 'true');
    helperMenu.addEventListener('dragstart', common.drag_start);
  }
  node.parentNode.insertBefore(helperMenu, node);
}

export default function injectHelperMenu() { // Native
  // don't put all the menu code here (but call if clicked) to minimize lag
  var node = document.getElementById('statbar-container');
  if (node) {haveNode(node);}
}
