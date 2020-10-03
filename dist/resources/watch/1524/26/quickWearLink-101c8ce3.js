import { D as querySelector, a9 as cmdUrl, i as insertElement, o as onclick, W as sendEvent, X as jQueryDialog, ce as insertQuickWear } from './calfSystem-c851a12c.js';
import { i as insertTextBeforeEnd } from './insertTextBeforeEnd-ac46dfe3.js';
import { c as createSpan } from './createSpan-b472d883.js';

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
//# sourceMappingURL=quickWearLink-101c8ce3.js.map
