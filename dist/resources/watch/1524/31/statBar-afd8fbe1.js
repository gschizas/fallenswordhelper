import { c as createAnchor } from './createAnchor-80cfa9fc.js';
import { y as getElementById, i as insertElement, o as onclick, bK as profileUrl, a8 as pointsUrl, av as defSubcmd, bT as blacksmithUrl, bU as dropItemsUrl, a7 as cmdUrl } from './calfSystem-91adbec8.js';
import { i as insertElementAfterBegin } from './insertElementAfterBegin-beaa69ff.js';
import './insertElementBefore-43970b1f.js';

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
//# sourceMappingURL=statBar-afd8fbe1.js.map
