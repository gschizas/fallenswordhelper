import {entries} from '../common/entries';
import getInventory from './getInventory';
import playerId from '../common/playerId';

function toObject(prev, curr) {
  if (curr.is_in_st) {prev.fshHasST = true;}
  prev[curr.inv_id] = curr;
  return prev;
}

function rekeyInventory(data) {
  // console.log(JSON.parse(JSON.stringify(data)));
  // data.items = data.items.reduce(toObject, {});
  const thisItems = data.items.reduce(toObject, {});
  if ([563116, 1963510].includes(playerId())) {
    console.log(data.items.length, entries(thisItems).length); // eslint-disable-line no-console
  }
  return {
    items: thisItems,
    folders: data.folders
  };
}

export default function getInventoryById() {
  return getInventory().then(rekeyInventory);
}
