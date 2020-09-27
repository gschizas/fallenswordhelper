import { c as calf } from './calfSystem-0ffc234f.js';
import { c as cmdExport } from './cmdExport-1f8fe5a2.js';
import { g as guildStore } from './guildStore-114ae065.js';

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
//# sourceMappingURL=getInventory-eba2175d.js.map
