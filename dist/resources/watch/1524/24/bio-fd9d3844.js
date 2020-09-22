import { y as getElementById, o as onclick, A as setInnerHtml } from './calfSystem-dea093d3.js';
import './numberIsNaN-00e0daaf.js';
import './round-0254204f.js';
import './roundToString-3df49014.js';
import { b as bioEvtHdl, r as renderBio } from './render-cb3bf4b8.js';
import './playerName-cba7e46d.js';
import './toLowerCase-2f55d839.js';

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
//# sourceMappingURL=bio-fd9d3844.js.map
