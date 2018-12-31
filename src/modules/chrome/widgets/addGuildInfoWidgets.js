import colouring from './colouring';
import contactColour from './contactColour';
import doHideBtn from './doHideBtn';
import doHideBuffSelected from './doHideBuffSelected';
import {getElementById} from '../../common/getElement';

function guildColour(el) {
  contactColour(el, {
    l1: 'fshGreen',
    l2: 'fshWhite',
    l3: 'fshGrey'
  });
}

function updateChatLink() {
  Array.prototype.forEach.call(
    document.querySelectorAll('#pCR h4'),
    function(el) {
      if (el.textContent !== 'Chat') {return;}
      el.innerHTML = '<a href="index.php?cmd=guild&subcmd=chat">' +
        el.textContent + '</a>';
    }
  );
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
