import { E as querySelectorArray, a5 as insertHtmlAfterBegin } from './calfSystem-b31646eb.js';

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

function buffLevelDisplay() {
  const buffImgs = querySelectorArray(buffSelector);
  buffImgs.forEach(injectLevel);
}

export default buffLevelDisplay;
//# sourceMappingURL=buffLevelDisplay-5c35233d.js.map
