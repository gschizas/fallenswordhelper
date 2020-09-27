import { y as getElementById, i as insertElement, o as onclick, bH as profileUrl, aa as pointsUrl, aq as defSubcmd, bZ as blacksmithUrl, b_ as dropItemsUrl, a9 as cmdUrl } from './calfSystem-0ffc234f.js';
import './insertElementBefore-286ff14c.js';
import { i as insertElementAfterBegin } from './insertElementAfterBegin-accb357c.js';
import { c as createAnchor } from './createAnchor-ce16f6c6.js';

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
//# sourceMappingURL=statBar-476930e3.js.map
