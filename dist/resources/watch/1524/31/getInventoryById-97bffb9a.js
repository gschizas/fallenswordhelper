import { g as getInventory } from './getInventory-a60c0b0e.js';

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
//# sourceMappingURL=getInventoryById-97bffb9a.js.map
