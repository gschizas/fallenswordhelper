import { b as bioEvtHdl, r as renderBio } from './render-094eb48e.js';
import { y as getElementById, o as onclick, A as setInnerHtml } from './calfSystem-e64be67d.js';
import './roundToString-dbdb82cb.js';
import './numberIsNaN-fecd7e6d.js';
import './playerName-d6bc942c.js';
import './toLowerCase-ace931b6.js';

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
//# sourceMappingURL=bio-6fe2ed8a.js.map
