import { D as querySelector, a7 as cmdUrl, i as insertElement, o as onclick, W as sendEvent, X as jQueryDialog, cc as insertQuickWear } from './calfSystem-91adbec8.js';
import { c as createSpan } from './createSpan-0e3d85b1.js';
import { i as insertTextBeforeEnd } from './insertTextBeforeEnd-2bde9ad6.js';

function openQwDialog() {
  sendEvent('profile', 'insertQuickWear');
  jQueryDialog(insertQuickWear);
}

function quickWearLink() {
  // quick wear manager link
  const node = querySelector(`#profileRightColumn a[href="${cmdUrl
  }profile&subcmd=togglesection&section_id=2"]`);
  if (!node) { return; }
  const wrap = createSpan({ innerHTML: '&nbsp;[' });
  const qw = createSpan({ className: 'sendLink', innerHTML: 'Quick&nbsp;Wear' });
  insertElement(wrap, qw);
  insertTextBeforeEnd(wrap, ']');
  insertElement(node.parentNode, wrap);
  onclick(qw, openQwDialog);
}

export default quickWearLink;
//# sourceMappingURL=quickWearLink-9b0a9bd1.js.map
