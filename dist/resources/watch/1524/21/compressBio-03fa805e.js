import { y as getElementById, k as on, s as partial, W as sendEvent } from './calfSystem-b0234231.js';
import { c as createInput } from './createInput-d7fbb3f3.js';
import { c as createLabel } from './createLabel-285e2971.js';
import { i as insertElementBefore } from './insertElementBefore-31b0f1b5.js';

var undefined$1 = undefined;

function injectToggle(bioCell) {
  const toggle = insertElementBefore(
    createInput({ id: 'fshCompressToggle', type: 'checkbox' }),
    bioCell,
  );
  on(toggle, 'change', partial(sendEvent, 'bio', 'toggle'));
}

function doCompression(bioCell) {
  bioCell.parentNode.classList.add('fshCompressor');
  injectToggle(bioCell);
  insertElementBefore(
    createLabel({ className: 'sendLink', htmlFor: 'fshCompressToggle' }),
    bioCell,
  );
}

function getFontSize(bioCell) {
  const computedStyle = getComputedStyle(bioCell);
  return parseInt(computedStyle.getPropertyValue('font-size'), 10);
}

function compressBio() {
  const bioCell = getElementById('profile-bio');
  if (!bioCell) { return; }
  if (bioCell.clientHeight / getFontSize(bioCell) > 10) {
    doCompression(bioCell);
  }
}

export default compressBio;
//# sourceMappingURL=compressBio-03fa805e.js.map
