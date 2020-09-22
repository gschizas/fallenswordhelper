import { c as calf } from './calfSystem-dea093d3.js';
import { c as cmdExport } from './cmdExport-2be3c3da.js';
import { g as guildStore } from './guildStore-d76ccf39.js';

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
//# sourceMappingURL=getInventory-7e53f2c7.js.map
