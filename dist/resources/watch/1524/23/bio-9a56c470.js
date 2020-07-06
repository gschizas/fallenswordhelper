import { y as getElementById, o as onclick, A as setInnerHtml } from './calfSystem-2b1fed3f.js';
import './numberIsNaN-cb2409eb.js';
import './round-ef0af241.js';
import './roundToString-05064d9d.js';
import { b as bioEvtHdl, r as renderBio } from './render-965ec491.js';
import './playerName-12a90d68.js';
import './toLowerCase-dda30e6b.js';

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
//# sourceMappingURL=bio-9a56c470.js.map
