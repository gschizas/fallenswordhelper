import { y as getElementById, i as insertElement, o as onclick, bG as profileUrl, aa as pointsUrl, aq as defSubcmd, bY as blacksmithUrl, bZ as dropItemsUrl, a9 as cmdUrl } from './calfSystem-c0288c6c.js';
import './insertElementBefore-44fa3ff2.js';
import { i as insertElementAfterBegin } from './insertElementAfterBegin-43672060.js';
import { c as createAnchor } from './createAnchor-4af6db01.js';

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
//# sourceMappingURL=statBar-102752f6.js.map
