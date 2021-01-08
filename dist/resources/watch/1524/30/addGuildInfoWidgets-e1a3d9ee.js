import { y as getElementById, A as setInnerHtml, v as guildSubcmdUrl, E as querySelectorArray, a4 as contains } from './calfSystem-d357ca6f.js';
import './fshOpen-3e1a5fea.js';
import './openQuickBuffByName-9578347f.js';
import './hideElement-f7381055.js';
import './getArrayByClassName-e9f21d77.js';
import './selfIdIs-f01bb311.js';
import { d as doHideBtn, a as doHideBuffSelected, c as colouring, b as contactColour } from './doHideBuffSelected-f74ce633.js';

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
//# sourceMappingURL=addGuildInfoWidgets-e1a3d9ee.js.map
