import insertHtmlAfterBegin from '../common/insertHtmlAfterBegin';
import querySelectorArray from '../common/querySelectorArray';

const buffSelector = '#profileRightColumn img[src*="/skills/"]';

function injectLevel(i) {
  const matches = /Level: (\d+)/.exec(i.dataset.tipped);
  if (!matches) { return; }
  const lvl = matches[1];
  let target = i.nextElementSibling;
  if (!i.nextElementSibling) {
    target = i.parentNode.nextElementSibling;
  }
  insertHtmlAfterBegin(target, `<b>(${lvl})</b><br>`);
}

export default function buffLevelDisplay() {
  const buffImgs = querySelectorArray(buffSelector);
  buffImgs.forEach(injectLevel);
}
