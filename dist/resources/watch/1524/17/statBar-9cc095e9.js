import { x as getElementById, i as insertElement, o as onclick, bL as profileUrl, aa as pointsUrl, aq as defSubcmd, c0 as blacksmithUrl, bC as dropItemsUrl, a9 as cmdUrl } from './calfSystem-f6498976.js';
import './insertElementBefore-c846c522.js';
import { i as insertElementAfterBegin } from './insertElementAfterBegin-af2558e9.js';
import { c as createAnchor } from './createAnchor-2a825ca8.js';

function preventHcs(evt) {
  evt.stopPropagation();
}

function statbarWrapper(href, id) {
  const character = getElementById(`statbar-${id}`);
  if (!character) { return; }
  const myWrapper = createAnchor({ href });
  const statWrapper = character.parentNode;
  insertElement(myWrapper, character);
  insertElementAfterBegin(statWrapper, myWrapper);
  onclick(myWrapper, preventHcs, true);
}

function statbar() {
  statbarWrapper(profileUrl, 'character');
  statbarWrapper(`${pointsUrl + defSubcmd}reserve`, 'stamina');
  statbarWrapper(blacksmithUrl, 'equipment');
  statbarWrapper(dropItemsUrl, 'inventory');
  statbarWrapper(pointsUrl, 'fsp');
  statbarWrapper(`${cmdUrl}bank`, 'gold');
}

export default statbar;
//# sourceMappingURL=statBar-9cc095e9.js.map
