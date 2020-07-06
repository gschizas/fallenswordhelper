import arrayFrom from '../../../common/arrayFrom';
import closestTr from '../../../common/closestTr';
import entries from '../../../common/entries';
import fromEntries from '../../../common/fromEntries';
import getCheckboxes from './getCheckboxes';
import getInv from './getInv';
import getTextTrim from '../../../common/getTextTrim';

let itemsCache;

function updateName(checkboxes, item) {
  if (item.item_id !== 13699) { return item.item_name; }
  const thisItem = arrayFrom(checkboxes).find((cb) => cb.value === String(item.inv_id));
  if (!thisItem) { return item.item_name; }
  return getTextTrim(thisItem.parentNode.parentNode.children[2]);
}

async function updateNamesForComposedPots(checkboxes) {
  const inv = await getInv();
  if (!inv || !inv.items) { return {}; }
  return fromEntries(entries(inv.items).map(([key, obj]) => [key, {
    ...obj,
    item_name: updateName(checkboxes, obj),
  }]));
}

async function getItemsFromInventory(checkboxes) {
  if (!itemsCache) {
    itemsCache = await updateNamesForComposedPots(checkboxes);
  }
  return itemsCache;
}

export default async function getItems() {
  const checkboxes = getCheckboxes();
  if (!checkboxes) { return []; }
  const items = await getItemsFromInventory(checkboxes);
  return arrayFrom(checkboxes)
    .map((cb) => [
      closestTr(cb).cells[2],
      items[cb.value],
    ])
    .filter(([, invItem]) => invItem);
}
