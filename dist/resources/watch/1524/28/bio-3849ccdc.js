import { y as getElementById, o as onclick, A as setInnerHtml } from './calfSystem-21d16a0e.js';
import './numberIsNaN-91041dcf.js';
import './round-9f8a3650.js';
import './roundToString-5955d47b.js';
import { b as bioEvtHdl, r as renderBio } from './render-10f273ca.js';
import './playerName-e1b17bb3.js';
import './toLowerCase-27ea448e.js';

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
//# sourceMappingURL=bio-3849ccdc.js.map
