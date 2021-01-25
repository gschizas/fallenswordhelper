import { d as doHideBtn, a as doHideBuffSelected, c as colouring, b as contactColour } from './doHideBuffSelected-664cbd19.js';
import { y as getElementById, A as setInnerHtml, v as guildSubcmdUrl, E as querySelectorArray, ay as contains } from './calfSystem-e64be67d.js';
import './getArrayByClassName-fd5e66af.js';
import './hideElement-7c48eb54.js';
import './openQuickBuffByName-4959f4e5.js';
import './fshOpen-56a6fafa.js';
import './selfIdIs-c682a3a7.js';

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
//# sourceMappingURL=addGuildInfoWidgets-081affc1.js.map
