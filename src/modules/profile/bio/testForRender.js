import getValue from '../../system/getValue';
import renderBio from './render';
import setInnerHtml from '../../dom/setInnerHtml';

function doRender(bioCell) {
  let bioContents = bioCell.innerHTML;
  bioContents = renderBio(bioContents);
  if (bioContents) {
    setInnerHtml(bioContents, bioCell);
  }
}

function selfRender(isSelf) {
  return isSelf && getValue('renderSelfBio');
}

function otherRender(isSelf) {
  return !isSelf && getValue('renderOtherBios');
}

function shouldRender(isSelf) {
  return selfRender(isSelf) || otherRender(isSelf);
}

export default function testForRender(isSelf, bioCell) {
  if (shouldRender(isSelf)) {
    doRender(bioCell);
  }
}
