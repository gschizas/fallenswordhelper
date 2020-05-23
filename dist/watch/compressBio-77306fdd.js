import { G as getValue, aA as querySelectorAll, bP as lastActivityRE, C as setInnerHtml, i as insertElement, l as on, u as partial, a2 as sendEvent, e as createDiv } from './calfSystem-98d7118c.js';
import { c as createInput } from './createInput-26acdf01.js';
import { o as onlineDot } from './onlineDot-a5fff75d.js';
import { b as batch } from './batch-e0680c2f.js';
import { c as createLabel } from './createLabel-1310b8e2.js';

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
//# sourceMappingURL=compressBio-77306fdd.js.map
