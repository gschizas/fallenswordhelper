import { s as cmdExport, c as calf } from './calfSystem-43606e5e.js';
import { g as guildStore } from './guildStore-e95e6c41.js';

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
//# sourceMappingURL=getInventory-f9bcddb2.js.map
