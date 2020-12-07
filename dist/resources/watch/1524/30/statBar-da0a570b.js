import { y as getElementById, i as insertElement, o as onclick, bD as profileUrl, aa as pointsUrl, aq as defSubcmd, bY as blacksmithUrl, bZ as dropItemsUrl, a9 as cmdUrl } from './calfSystem-d357ca6f.js';
import './insertElementBefore-1b96a575.js';
import { i as insertElementAfterBegin } from './insertElementAfterBegin-0f4ef756.js';
import { c as createAnchor } from './createAnchor-344291eb.js';

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
//# sourceMappingURL=statBar-da0a570b.js.map
