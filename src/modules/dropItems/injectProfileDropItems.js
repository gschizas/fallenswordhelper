import injectMoveItems from './injectMoveItems';
import injectStoreItems from './injectStoreItems';

export default function injectProfileDropItems() {
  injectStoreItems();
  injectMoveItems();
}
