import { y as getElementById, o as onclick, A as setInnerHtml } from './calfSystem-995e3482.js';
import './numberIsNaN-4e564176.js';
import './round-1ea4ca21.js';
import './roundToString-6e389246.js';
import { b as bioEvtHdl, r as renderBio } from './render-371490c9.js';
import './playerName-f1d5dedf.js';
import './toLowerCase-02326a77.js';

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
//# sourceMappingURL=bio-ef027128.js.map
