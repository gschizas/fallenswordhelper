import asyncPThree from '../../common/asyncPThree';
import getCheckboxes from '../../guild/inventory/storeitems/getCheckboxes';
import injectMoveItems from './injectMoveItems';
import injectStoreItems from '../../guild/inventory/storeitems/injectStoreItems';
import interceptDestroy from './interceptDestroy';
import jQueryNotPresent from '../../common/jQueryNotPresent';

const p3Functions = [
  injectMoveItems,
  injectStoreItems,
  interceptDestroy,
];

export default function injectProfileDropItems() {
  if (jQueryNotPresent() || !getCheckboxes()) { return; }
  asyncPThree(p3Functions);
}
