import { x as getElementById } from './calfSystem-03895320.js';
import './hideElement-17927f8d.js';
import './getArrayByClassName-49f2d047.js';
import { d as doHideBtn, a as doHideBuffSelected, c as colouring, b as contactColour } from './doHideBuffSelected-8d4b0c64.js';

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
  doHideBuffSelected(onlineAlliesList, 'ally-buff-check-on', 'ally-quick-buff');
  // add coloring for offline time
  colouring(onlineAlliesList, alliesColour);
}

export default addOnlineAlliesWidgets;
//# sourceMappingURL=addOnlineAlliesWidgets-ea4b56fb.js.map
