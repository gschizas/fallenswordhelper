import { D as querySelector, a9 as cmdUrl, i as insertElement, o as onclick, W as sendEvent, X as jQueryDialog, ce as insertQuickWear } from './calfSystem-2b1fed3f.js';
import { i as insertTextBeforeEnd } from './insertTextBeforeEnd-ae6e5084.js';
import { c as createSpan } from './createSpan-4d97880e.js';

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
//# sourceMappingURL=quickWearLink-7f6b693e.js.map
