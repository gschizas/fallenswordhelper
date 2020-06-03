import { x as getElementById, i as insertElement, o as onclick, bM as profileUrl, aa as pointsUrl, aq as defSubcmd, c1 as blacksmithUrl, bD as dropItemsUrl, a9 as cmdUrl } from './calfSystem-940bc1b5.js';
import './insertElementBefore-4c8d2347.js';
import { i as insertElementAfterBegin } from './insertElementAfterBegin-67909c7f.js';
import { c as createAnchor } from './createAnchor-894aab1e.js';

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
//# sourceMappingURL=statBar-816d1637.js.map
