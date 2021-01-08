import { y as getElementById, o as onclick, A as setInnerHtml } from './calfSystem-d357ca6f.js';
import './numberIsNaN-fa7d637d.js';
import './round-6850c0fc.js';
import './roundToString-16988956.js';
import { b as bioEvtHdl, r as renderBio } from './render-5703c1bc.js';
import './playerName-35237fe6.js';
import './toLowerCase-5e186769.js';

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
//# sourceMappingURL=bio-ed371a85.js.map
