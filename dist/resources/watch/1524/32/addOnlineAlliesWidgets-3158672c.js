import { d as doHideBtn, a as doHideBuffSelected, c as colouring, b as contactColour } from './doHideBuffSelected-664cbd19.js';
import { y as getElementById } from './calfSystem-e64be67d.js';
import './getArrayByClassName-fd5e66af.js';
import './hideElement-7c48eb54.js';
import './openQuickBuffByName-4959f4e5.js';
import './fshOpen-56a6fafa.js';
import './selfIdIs-c682a3a7.js';

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
//# sourceMappingURL=addOnlineAlliesWidgets-3158672c.js.map
