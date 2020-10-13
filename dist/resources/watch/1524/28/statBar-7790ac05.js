import { y as getElementById, i as insertElement, o as onclick, bD as profileUrl, aa as pointsUrl, aq as defSubcmd, bY as blacksmithUrl, bZ as dropItemsUrl, a9 as cmdUrl } from './calfSystem-21d16a0e.js';
import './insertElementBefore-eada6f05.js';
import { i as insertElementAfterBegin } from './insertElementAfterBegin-6a4e1b31.js';
import { c as createAnchor } from './createAnchor-43405440.js';

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
//# sourceMappingURL=statBar-7790ac05.js.map
