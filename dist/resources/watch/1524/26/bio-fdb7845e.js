import { y as getElementById, o as onclick, A as setInnerHtml } from './calfSystem-c851a12c.js';
import './numberIsNaN-a6bcb044.js';
import './round-24bc52d1.js';
import './roundToString-b5c0e5f9.js';
import { b as bioEvtHdl, r as renderBio } from './render-510824f0.js';
import './playerName-c2417987.js';
import './toLowerCase-b21b7cc8.js';

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
//# sourceMappingURL=bio-fdb7845e.js.map
