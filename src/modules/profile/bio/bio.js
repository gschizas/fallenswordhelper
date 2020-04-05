import add from '../../support/task';
import bioEvtHdl from './bioEvtHdl';
import compressBio from './compressBio';
import { getElementById } from '../../common/getElement';
import getValue from '../../system/getValue';
import onclick from '../../common/onclick';
import testForRender from './testForRender';

export default function profileRenderBio(isSelf) {
  const bioCell = getElementById('profile-bio');
  if (!bioCell) { return; }
  testForRender(isSelf, bioCell);
  if (getValue('enableBioCompressor')) { add(3, compressBio, [bioCell]); }
  onclick(bioCell, bioEvtHdl);
}
