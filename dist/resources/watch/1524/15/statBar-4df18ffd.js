import { x as getElementById, i as insertElement, o as onclick, bT as profileUrl, aU as pointsUrl, af as defSubcmd, c2 as blacksmithUrl, bJ as dropItemsUrl, aT as cmdUrl } from './calfSystem-b469667c.js';
import './insertElementBefore-26cea2a0.js';
import { i as insertElementAfterBegin } from './insertElementAfterBegin-f1cecd09.js';
import { c as createAnchor } from './createAnchor-25837fd3.js';

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
//# sourceMappingURL=statBar-4df18ffd.js.map
