import colouring from './colouring';
import contactColour from './contactColour';
import doHideBtn from './doHideBtn';
import doHideBuffSelected from './doHideBuffSelected';
import {getElementById} from '../../common/getElement';

function alliesColour(el) {
  contactColour(el, {
    l1: 'fshDodgerBlue',
    l2: 'fshLightSkyBlue',
    l3: 'fshPowderBlue'
  });
}

export default function addOnlineAlliesWidgets() {
  var onlineAlliesList = getElementById('minibox-allies-list');
  if (!onlineAlliesList) {return;}
  doHideBtn(onlineAlliesList, 'allySelector');
  doHideBuffSelected(onlineAlliesList, 'ally-buff-check-on', 'ally-quick-buff');
  // add coloring for offline time
  colouring(onlineAlliesList, alliesColour);
}
