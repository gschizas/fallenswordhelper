import { y as getElementById, o as onclick, A as setInnerHtml } from './calfSystem-0ffc234f.js';
import './numberIsNaN-929de7af.js';
import './round-fcc0b278.js';
import './roundToString-57efc303.js';
import { b as bioEvtHdl, r as renderBio } from './render-9bae820d.js';
import './playerName-a4720b96.js';
import './toLowerCase-c42114e1.js';

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
//# sourceMappingURL=bio-e479c274.js.map
