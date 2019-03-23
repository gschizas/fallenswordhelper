import add from '../../support/task';
import bioEvtHdl from './bioEvtHdl';
import compressBio from './compressBio';
import {getElementById} from '../../common/getElement';
import getValue from '../../system/getValue';
import on from '../../common/on';
import testForRender from './testForRender';

export default function profileRenderBio(self) {
  var bioCell = getElementById('profile-bio');
  if (!bioCell) {return;}
  testForRender(self, bioCell);
  if (getValue('enableBioCompressor')) {add(3, compressBio, [bioCell]);}
  on(bioCell, 'click', bioEvtHdl);
}
