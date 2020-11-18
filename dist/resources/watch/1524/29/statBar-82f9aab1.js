import { y as getElementById, i as insertElement, o as onclick, bD as profileUrl, aa as pointsUrl, aq as defSubcmd, bY as blacksmithUrl, bZ as dropItemsUrl, a9 as cmdUrl } from './calfSystem-b31646eb.js';
import './insertElementBefore-7e0a7ce8.js';
import { i as insertElementAfterBegin } from './insertElementAfterBegin-722ddd8b.js';
import { c as createAnchor } from './createAnchor-60ea2b27.js';

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
//# sourceMappingURL=statBar-82f9aab1.js.map
