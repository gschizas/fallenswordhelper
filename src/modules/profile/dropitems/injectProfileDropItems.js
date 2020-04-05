import calf from '../../support/calf';
import injectMoveItems from './injectMoveItems';
import injectStoreItems from './injectStoreItems';

export default function injectProfileDropItems() {
  injectStoreItems();
  if (calf.subcmd === 'dropitems') { injectMoveItems(); }
}
