import { s as cmdExport, c as calf } from './calfSystem-1499e8da.js';
import { g as guildStore } from './guildStore-36a09a93.js';

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
//# sourceMappingURL=getInventory-2a120ce9.js.map
