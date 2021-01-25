import { D as querySelector, a8 as cmdUrl, i as insertElement, o as onclick, X as sendEvent, Y as jQueryDialog, ce as insertQuickWear } from './calfSystem-e64be67d.js';
import { c as createSpan } from './createSpan-e4d30c37.js';
import { i as insertTextBeforeEnd } from './insertTextBeforeEnd-82384fa0.js';

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
//# sourceMappingURL=quickWearLink-de2ce07e.js.map
