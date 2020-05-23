import injectMoveItems from './injectMoveItems';
import injectStoreItems from './injectStoreItems';
import interceptDestroy from './interceptDestroy';

export default function injectProfileDropItems() {
  injectStoreItems();
  injectMoveItems();
  // eslint-disable-next-line no-unused-labels, no-labels
  betaLbl: { //  interceptDestroy
    interceptDestroy();
  }
}
