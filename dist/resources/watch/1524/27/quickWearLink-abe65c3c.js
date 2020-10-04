import { D as querySelector, aa as cmdUrl, i as insertElement, o as onclick, X as sendEvent, Y as jQueryDialog, ce as insertQuickWear } from './calfSystem-975d976a.js';
import { i as insertTextBeforeEnd } from './insertTextBeforeEnd-c2b3129f.js';
import { c as createSpan } from './createSpan-b2243d29.js';

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
//# sourceMappingURL=quickWearLink-abe65c3c.js.map
