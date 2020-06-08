import { y as getElementById, o as onclick, A as setInnerHtml } from './calfSystem-c0288c6c.js';
import './numberIsNaN-0a1aaf72.js';
import './round-278bde6e.js';
import './roundToString-a3cb4f78.js';
import { b as bioEvtHdl, r as renderBio } from './render-11d4e5fb.js';
import './playerName-544021b8.js';
import './toLowerCase-e5817205.js';

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
//# sourceMappingURL=bio-33a46bba.js.map
