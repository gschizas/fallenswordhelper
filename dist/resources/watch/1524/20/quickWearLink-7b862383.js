import { D as querySelector, a9 as cmdUrl, i as insertElement, o as onclick, W as sendEvent, X as jQueryDialog, cd as insertQuickWear } from './calfSystem-c0288c6c.js';
import { i as insertTextBeforeEnd } from './insertTextBeforeEnd-c36696a9.js';
import { c as createSpan } from './createSpan-09e8386b.js';

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
//# sourceMappingURL=quickWearLink-7b862383.js.map
