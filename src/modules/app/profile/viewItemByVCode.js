import callApp from '../callApp';

export default function viewItemByVCode(itemId, invId, vcode) {
  return callApp({
    cmd: 'fetchitem',
    item_id: itemId,
    inv_id: invId,
    v: vcode,
    t: 2
  });
}
