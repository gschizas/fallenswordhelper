import { y as getElementById } from './calfSystem-b31646eb.js';
import './fshOpen-71b2b356.js';
import './openQuickBuffByName-7f76ac0b.js';
import './hideElement-a8c1e8d6.js';
import './getArrayByClassName-dd316086.js';
import './selfIdIs-47e9b106.js';
import { d as doHideBtn, a as doHideBuffSelected, c as colouring, b as contactColour } from './doHideBuffSelected-7ba5ad16.js';

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
//# sourceMappingURL=addOnlineAlliesWidgets-e402cad4.js.map
