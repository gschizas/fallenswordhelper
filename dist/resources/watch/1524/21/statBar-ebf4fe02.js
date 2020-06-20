import { y as getElementById, i as insertElement, o as onclick, bH as profileUrl, aa as pointsUrl, aq as defSubcmd, bZ as blacksmithUrl, b_ as dropItemsUrl, a9 as cmdUrl } from './calfSystem-b0234231.js';
import './insertElementBefore-31b0f1b5.js';
import { i as insertElementAfterBegin } from './insertElementAfterBegin-faecf4d7.js';
import { c as createAnchor } from './createAnchor-9af67e2e.js';

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
//# sourceMappingURL=statBar-ebf4fe02.js.map
