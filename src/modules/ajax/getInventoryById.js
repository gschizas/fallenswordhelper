import getInventory from './getInventory';

function toObject(prev, curr) {
  if (curr.is_in_st) { prev.fshHasST = true; }
  prev[curr.inv_id] = curr;
  return prev;
}

function rekeyInventory(data) {
  return {
    items: data.items.reduce(toObject, {}),
    folders: data.folders,
  };
}

export default function getInventoryById() {
  return getInventory().then(rekeyInventory);
}
