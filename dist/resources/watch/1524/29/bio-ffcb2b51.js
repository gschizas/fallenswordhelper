import { y as getElementById, o as onclick, A as setInnerHtml } from './calfSystem-b31646eb.js';
import './numberIsNaN-d1ebf732.js';
import './round-d6369a4d.js';
import './roundToString-465b1d8c.js';
import { b as bioEvtHdl, r as renderBio } from './render-4f3c095a.js';
import './playerName-8a2d59df.js';
import './toLowerCase-0a22477f.js';

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
//# sourceMappingURL=bio-ffcb2b51.js.map
