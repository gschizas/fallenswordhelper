import getInventory from './getInventory';

function rekeyInventory(data) {
  data.items = data.items.reduce(function(prev, curr) {
    if (curr.is_in_st) {prev.fshHasST = true;}
    prev[curr.inv_id] = curr;
    return prev;
  }, {});
  return data;
}

export default function getInventoryById() {
  return getInventory().pipe(rekeyInventory);
}
