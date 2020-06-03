import getTextTrim from './getTextTrim';
import openQuickBuffByName from './openQuickBuffByName';

const isBuffLink = (target) => target.classList.contains('fshBl')
  && target.previousElementSibling;

export default function doBuffLinkClick(e) {
  if (isBuffLink(e.target)) {
    openQuickBuffByName(getTextTrim(e.target.previousElementSibling));
  }
}
