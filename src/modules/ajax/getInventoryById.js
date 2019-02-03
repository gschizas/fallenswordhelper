import getInventory from './getInventory';

function toObject(prev, curr) {
  if (curr.is_in_st) {prev.fshHasST = true;}
  prev[curr.inv_id] = curr;
  return prev;
}

function rekeyInventory(data) {
  data.items = data.items.reduce(toObject, {});
  return data;
}

export default function getInventoryById() {
  return getInventory().pipe(rekeyInventory);
}
