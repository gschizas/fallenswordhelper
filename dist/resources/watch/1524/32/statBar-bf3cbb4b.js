import { c as createAnchor } from './createAnchor-77f17d94.js';
import { y as getElementById, i as insertElement, o as onclick, bL as profileUrl, a9 as pointsUrl, aw as defSubcmd, bU as blacksmithUrl, bV as dropItemsUrl, a8 as cmdUrl } from './calfSystem-e64be67d.js';
import { i as insertElementAfterBegin } from './insertElementAfterBegin-bc928e13.js';
import './insertElementBefore-aa28f497.js';

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
//# sourceMappingURL=statBar-bf3cbb4b.js.map
