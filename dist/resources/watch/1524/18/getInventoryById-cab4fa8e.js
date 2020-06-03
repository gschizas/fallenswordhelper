import { g as getInventory } from './getInventory-22d89aeb.js';

function toObject(acc, curr) {
  if (curr.is_in_st) { acc.fshHasST = true; }
  acc[curr.inv_id] = curr;
  return acc;
}

function rekeyInventory(data) {
  return {
    items: data.items.reduce(toObject, {}),
    folders: data.folders,
  };
}

function getInventoryById() {
  return getInventory().then(rekeyInventory);
}

export { getInventoryById as g };
//# sourceMappingURL=getInventoryById-cab4fa8e.js.map
