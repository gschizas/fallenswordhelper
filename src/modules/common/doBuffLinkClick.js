import getTextTrim from './getTextTrim';
import hasClass from './hasClass';
import openQuickBuffByName from './openQuickBuffByName';

const isBuffLink = (target) => hasClass('fshBl', target)
  && target.previousElementSibling;

export default function doBuffLinkClick(e) {
  if (isBuffLink(e.target)) {
    openQuickBuffByName(getTextTrim(e.target.previousElementSibling));
  }
}
