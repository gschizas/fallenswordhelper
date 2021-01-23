import { d as doHideBtn, a as doHideBuffSelected, c as colouring, b as contactColour } from './doHideBuffSelected-e7f78ea3.js';
import { y as getElementById, A as setInnerHtml, v as guildSubcmdUrl, E as querySelectorArray, ax as contains } from './calfSystem-91adbec8.js';
import './getArrayByClassName-2ad645e6.js';
import './hideElement-d4551277.js';
import './openQuickBuffByName-0ac7bd3b.js';
import './fshOpen-bec182a3.js';
import './selfIdIs-0ee4d4ec.js';

function guildColour(el) {
  contactColour(el, {
    l1: 'fshGreen',
    l2: 'fshWhite',
    l3: 'fshGrey',
  });
}

function makeLink(el) {
  setInnerHtml(`<a href="${guildSubcmdUrl}chat">Chat</a>`, el);
}

function updateChatLink() {
  querySelectorArray('#pCR h4').filter(contains('Chat')).forEach(makeLink);
}

function addGuildInfoWidgets() {
  const guildMembrList = getElementById('minibox-guild-members-list');
  if (!guildMembrList) { return; } // list exists
  // hide guild info links
  doHideBtn(guildMembrList, 1);
  doHideBuffSelected(guildMembrList, 'guild');
  // add coloring for offline time
  colouring(guildMembrList, guildColour);
  updateChatLink();
}

export default addGuildInfoWidgets;
//# sourceMappingURL=addGuildInfoWidgets-dca56530.js.map
