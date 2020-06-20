import { y as getElementById, o as onclick, A as setInnerHtml } from './calfSystem-b0234231.js';
import './numberIsNaN-ce079190.js';
import './round-6bf7579a.js';
import './roundToString-bcf02566.js';
import { b as bioEvtHdl, r as renderBio } from './render-095d8f10.js';
import './playerName-251bfc8f.js';
import './toLowerCase-2a33d54b.js';

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
//# sourceMappingURL=bio-fd1b1e5e.js.map
