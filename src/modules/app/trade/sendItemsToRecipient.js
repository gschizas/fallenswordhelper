import getValue from '../../system/getValue';
import senditems from './senditems';

export default function sendItemsToRecipient(invIdAry) {
  return senditems(getValue('itemRecipient'), invIdAry);
}
