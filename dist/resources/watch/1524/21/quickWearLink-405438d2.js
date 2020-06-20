import { D as querySelector, a9 as cmdUrl, i as insertElement, o as onclick, W as sendEvent, X as jQueryDialog, ce as insertQuickWear } from './calfSystem-b0234231.js';
import { i as insertTextBeforeEnd } from './insertTextBeforeEnd-f4c097db.js';
import { c as createSpan } from './createSpan-18abe509.js';

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
//# sourceMappingURL=quickWearLink-405438d2.js.map
