import { y as getElementById, i as insertElement, o as onclick, bE as profileUrl, aa as pointsUrl, aq as defSubcmd, bZ as blacksmithUrl, b_ as dropItemsUrl, a9 as cmdUrl } from './calfSystem-c851a12c.js';
import './insertElementBefore-47c09359.js';
import { i as insertElementAfterBegin } from './insertElementAfterBegin-a04443c1.js';
import { c as createAnchor } from './createAnchor-d41c209f.js';

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
//# sourceMappingURL=statBar-d93205a8.js.map
