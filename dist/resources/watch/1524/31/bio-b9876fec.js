import { b as bioEvtHdl, r as renderBio } from './render-9b21bfe5.js';
import { y as getElementById, o as onclick, A as setInnerHtml } from './calfSystem-91adbec8.js';
import './roundToString-9dec41f7.js';
import './numberIsNaN-53300e34.js';
import './playerName-13e38788.js';
import './toLowerCase-51740687.js';

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
//# sourceMappingURL=bio-b9876fec.js.map
