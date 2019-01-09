import getValue from '../../system/getValue';
import renderBio from './render';

function doRender(bioCell) {
  var bioContents = bioCell.innerHTML;
  bioContents = renderBio(bioContents);
  if (bioContents) {
    bioCell.innerHTML = bioContents;
  }
}

function selfRender(self) {
  return self && getValue('renderSelfBio');
}

function otherRender(self) {
  return !self && getValue('renderOtherBios');
}

function shouldRender(self) {
  return selfRender(self) || otherRender(self);
}

export default function testForRender(self, bioCell) {
  if (shouldRender(self)) {
    doRender(bioCell);
  }
}
