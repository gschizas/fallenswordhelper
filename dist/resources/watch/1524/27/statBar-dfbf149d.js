import { y as getElementById, i as insertElement, o as onclick, bE as profileUrl, ab as pointsUrl, ar as defSubcmd, bZ as blacksmithUrl, b_ as dropItemsUrl, aa as cmdUrl } from './calfSystem-975d976a.js';
import './insertElementBefore-543d9ef0.js';
import { i as insertElementAfterBegin } from './insertElementAfterBegin-7e62fb9a.js';
import { c as createAnchor } from './createAnchor-adf4d391.js';

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
//# sourceMappingURL=statBar-dfbf149d.js.map
