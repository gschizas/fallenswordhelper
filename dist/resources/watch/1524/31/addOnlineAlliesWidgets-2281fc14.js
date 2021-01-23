import { d as doHideBtn, a as doHideBuffSelected, c as colouring, b as contactColour } from './doHideBuffSelected-e7f78ea3.js';
import { y as getElementById } from './calfSystem-91adbec8.js';
import './getArrayByClassName-2ad645e6.js';
import './hideElement-d4551277.js';
import './openQuickBuffByName-0ac7bd3b.js';
import './fshOpen-bec182a3.js';
import './selfIdIs-0ee4d4ec.js';

function alliesColour(el) {
  contactColour(el, {
    l1: 'fshDodgerBlue',
    l2: 'fshLightSkyBlue',
    l3: 'fshPowderBlue',
  });
}

function addOnlineAlliesWidgets() {
  const onlineAlliesList = getElementById('minibox-allies-list');
  if (!onlineAlliesList) { return; }
  doHideBtn(onlineAlliesList, 2);
  doHideBuffSelected(onlineAlliesList, 'ally');
  // add coloring for offline time
  colouring(onlineAlliesList, alliesColour);
}

export default addOnlineAlliesWidgets;
//# sourceMappingURL=addOnlineAlliesWidgets-2281fc14.js.map
