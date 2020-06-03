import { x as getElementById, i as insertElement, o as onclick, bM as profileUrl, aa as pointsUrl, aq as defSubcmd, c1 as blacksmithUrl, bD as dropItemsUrl, a9 as cmdUrl } from './calfSystem-03895320.js';
import './insertElementBefore-1bcd7f1d.js';
import { i as insertElementAfterBegin } from './insertElementAfterBegin-2a67008c.js';
import { c as createAnchor } from './createAnchor-9f9eab53.js';

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
//# sourceMappingURL=statBar-e829785d.js.map
