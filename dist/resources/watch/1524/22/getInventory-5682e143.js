import { c as calf } from './calfSystem-995e3482.js';
import { c as cmdExport } from './cmdExport-b739eae1.js';
import { g as guildStore } from './guildStore-76a27122.js';

function inventory() {
  return cmdExport({ subcmd: 'inventory' });
}

function getInventory() {
  if (calf.subcmd === 'guildinvmgr') {
    return guildStore();
  }
  return inventory();
}

export { getInventory as g };
//# sourceMappingURL=getInventory-5682e143.js.map
