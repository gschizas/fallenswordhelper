import getValue from '../../system/getValue';

function selfRender(isSelf) {
  return isSelf && getValue('renderSelfBio');
}

function otherRender(isSelf) {
  return !isSelf && getValue('renderOtherBios');
}

export default function shouldRender(isSelf) {
  return selfRender(isSelf) || otherRender(isSelf);
}
