import injectMoveItems from './injectMoveItems';
import injectStoreItems from './injectStoreItems';
import interceptDestroy from './interceptDestroy';

export default function injectProfileDropItems() {
  injectStoreItems();
  injectMoveItems();
  interceptDestroy();
}
