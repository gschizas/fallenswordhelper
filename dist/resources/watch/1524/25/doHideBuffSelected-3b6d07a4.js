import { M as arrayFrom, s as partial, c as calf, ab as querySelectorAll, I as getElementsByClassName, y as getElementById } from './calfSystem-0ffc234f.js';
import { h as hideElement } from './hideElement-c8e0696f.js';
import { g as getArrayByClassName } from './getArrayByClassName-de3b8bf4.js';

function colouring(parent, colourFn) {
  getArrayByClassName('player-name', parent).forEach(colourFn);
}

function contactColour(el, obj) {
  const onMouseOver = el.dataset.tipped;
  const lastActivityMinutes = /Last Activity:<\/td><td>(\d+) mins/.exec(onMouseOver)[1];
  if (lastActivityMinutes < 2) {
    el.classList.add(obj.l1);
  } else if (lastActivityMinutes < 5) {
    el.classList.add(obj.l2);
  } else {
    el.classList.add(obj.l3);
  }
}

function hideNodeList(nodeList) {
  arrayFrom(nodeList).forEach(hideElement);
}

const hideBtn = [
  [
    'hideGuildInfoTrade',
    '#guild-minibox-action-trade',
    '#online-allies-action-trade',
  ],
  [
    'hideGuildInfoSecureTrade',
    '#guild-minibox-action-secure-trade',
    '#online-allies-action-secure-trade',
  ],
  [
    'hideGuildInfoBuff',
    '#guild-minibox-action-quickbuff',
    '#online-allies-action-quickbuff',
  ],
  [
    'hideGuildInfoMessage',
    '#guild-minibox-action-send-message',
    '#online-allies-action-send-message',
  ],
];

function hideType(context, selector, el) {
  if (calf[el[0]]) {
    hideNodeList(querySelectorAll(el[selector], context));
  }
}

function doHideBtn(context, selector) {
  hideBtn.forEach(partial(hideType, context, selector));
}

function doHideBuffSelected(parent, checkOn, quickBuff) {
  if (calf.hideBuffSelected) {
    hideNodeList(getElementsByClassName(checkOn, parent));
    hideElement(getElementById(quickBuff));
  }
}

export { doHideBuffSelected as a, contactColour as b, colouring as c, doHideBtn as d };
//# sourceMappingURL=doHideBuffSelected-3b6d07a4.js.map
