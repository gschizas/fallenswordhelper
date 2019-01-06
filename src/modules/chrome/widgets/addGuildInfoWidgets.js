import colouring from './colouring';
import contactColour from './contactColour';
import contains from '../../common/contains';
import doHideBtn from './doHideBtn';
import doHideBuffSelected from './doHideBuffSelected';
import {getElementById} from '../../common/getElement';
import querySelectorArray from '../../common/querySelectorArray';

function guildColour(el) {
  contactColour(el, {
    l1: 'fshGreen',
    l2: 'fshWhite',
    l3: 'fshGrey'
  });
}

function makeLink(el) {
  el.innerHTML = '<a href="index.php?cmd=guild&subcmd=chat">Chat</a>';
}

function updateChatLink() {
  querySelectorArray('#pCR h4').filter(contains('Chat')).forEach(makeLink);
}

export default function addGuildInfoWidgets() {
  var guildMembrList = getElementById('minibox-guild-members-list');
  if (!guildMembrList) {return;} // list exists
  // hide guild info links
  doHideBtn(guildMembrList, 'guildSelector');
  doHideBuffSelected(guildMembrList, 'guild-buff-check-on', 'guild-quick-buff');
  // add coloring for offline time
  colouring(guildMembrList, guildColour);
  updateChatLink();
}
