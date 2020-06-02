import { x as getElementById, i as insertElement, o as onclick, bM as profileUrl, aa as pointsUrl, aq as defSubcmd, c1 as blacksmithUrl, bD as dropItemsUrl, a9 as cmdUrl } from './calfSystem-6e4b53e3.js';
import './insertElementBefore-6a4c4d6a.js';
import { i as insertElementAfterBegin } from './insertElementAfterBegin-b543ce37.js';
import { c as createAnchor } from './createAnchor-8588e540.js';

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
//# sourceMappingURL=statBar-bfc688ac.js.map
