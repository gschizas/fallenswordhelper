import ajaxReturnCode from '../app/ajaxReturnCode';
import dostoreitems from '../app/guild/inventory/dostoreitems';
import errorDialog from '../app/errorDialog';

export default function storeItems(invIdAry) {
  return dostoreitems(invIdAry).pipe(errorDialog).pipe(ajaxReturnCode);
}
