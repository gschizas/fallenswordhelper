import { y as getElementById, o as onclick, A as setInnerHtml } from './calfSystem-975d976a.js';
import './numberIsNaN-871eca26.js';
import './round-fe6c4da2.js';
import './roundToString-1f3d04fc.js';
import { b as bioEvtHdl, r as renderBio } from './render-88890f09.js';
import './playerName-20370288.js';
import './toLowerCase-33399b5a.js';

function doRender(bioCell) {
  const bioContents = renderBio(bioCell.innerHTML);
  if (bioContents) {
    setInnerHtml(bioContents, bioCell);
  }
}

function profileRenderBio() {
  const bioCell = getElementById('profile-bio');
  if (!bioCell) { return; }
  doRender(bioCell);
  onclick(bioCell, bioEvtHdl);
}

export default profileRenderBio;
//# sourceMappingURL=bio-57554b33.js.map
