import { s as cmdExport, c as calf } from './calfSystem-05ea3a63.js';
import { g as guildStore } from './guildStore-5a9cf220.js';

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
//# sourceMappingURL=getInventory-68e07575.js.map
