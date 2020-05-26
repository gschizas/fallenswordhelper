import { D as getValue, ak as querySelectorAll, br as lastActivityRE, z as setInnerHtml, i as insertElement, f as on, r as partial, T as sendEvent, b as createDiv } from './calfSystem-b469667c.js';
import { c as createInput } from './createInput-b6bf3e26.js';
import { o as onlineDot } from './onlineDot-52aa275b.js';
import { b as batch } from './batch-0e988765.js';
import { c as createLabel } from './createLabel-60e60ad1.js';

function changeOnlineDot(contactLink) {
  const lastActivity = lastActivityRE.exec(contactLink.dataset.tipped);
  setInnerHtml(onlineDot({
    min: lastActivity[3],
    hour: lastActivity[2],
    day: lastActivity[1],
  }), contactLink.parentNode.previousElementSibling);
}

function colouredDots() {
  if (!getValue('enhanceOnlineDots')) { return; }
  batch([
    5,
    3,
    querySelectorAll('#pCC a[data-tipped*="Last Activity"]'),
    0,
    changeOnlineDot,
  ]);
}

var undefined$1 = undefined;

function injectToggle(fshCompressor) {
  const toggle = insertElement(fshCompressor,
    createInput({ id: 'fshCompressToggle', type: 'checkbox' }));
  on(toggle, 'change', partial(sendEvent, 'bio', 'toggle'));
}

function hideBlock(bioCell, fshCompressor) {
  const fshCompress = insertElement(fshCompressor,
    createDiv({ className: 'fshCompress' }));
  setInnerHtml(bioCell.innerHTML, fshCompress);
  setInnerHtml('', bioCell);
}

function doCompression(bioCell) {
  const fshCompressor = createDiv({ className: 'fshCompressor' });
  injectToggle(fshCompressor);
  insertElement(fshCompressor,
    createLabel({ className: 'sendLink', htmlFor: 'fshCompressToggle' }));
  hideBlock(bioCell, fshCompressor);
  insertElement(bioCell, fshCompressor);
}

function getFontSize(bioCell) {
  const computedStyle = getComputedStyle(bioCell);
  return parseInt(computedStyle.getPropertyValue('font-size'), 10);
}

function compressBio(bioCell) {
  if (bioCell.clientHeight / getFontSize(bioCell) > 10) {
    doCompression(bioCell);
  }
}

export { colouredDots as a, compressBio as c };
//# sourceMappingURL=compressBio-7b3b79a2.js.map
